
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IZKPayClient {
    function sxtCallback(
        DataTypes.QueryResult calldata queryResult,
        bytes calldata callbackData,
        DataTypes.ZKVerification zkVerficiation
    ) external;

    function sxtErrorCallback(
        DataTypes.ZKpayError calldata error,
        bytes calldata callbackData
    ) external;
}

interface IZKPay {
    function queryWithNative(DataTypes.QueryData memory queryData) external payable returns (bytes32);
    function cancelQueryPayment(bytes32 queryHash) external;
}

library DataTypes {
    enum QueryType { SQL }
    enum ZKVerification { External }

    struct QueryParameter {
        string name;
        string value;
    }

    struct QueryData {
        bytes query;
        QueryType queryType;
        QueryParameter[] queryParameters;
        uint64 timeout;
        address callbackClientContractAddress;
        uint256 callbackGasLimit;
        bytes callbackData;
        ZKVerification zkVerficiation;
    }

    struct QueryResult {
        bytes32 queryHash;
        Column[] columns;
    }

    struct Column {
        string name;
        bytes[] values;
    }

    struct ZKpayError {
        uint8 code;
        string message;
    }
}

contract AirdropClient is IZKPayClient {
    using SafeERC20 for IERC20;

    event LogError(uint8 errorCode, string errorMessage);
    event AirdropExecuted(uint256 recipientCount);

    address public _owner;
    address public _zkpay;
    IERC20 public immutable _token;
    uint256 public constant AIRDROP_AMOUNT = 150 * 10 ** 18; // 150 tokens with 18 decimals
    bool public _airdropExecuted;
    bytes32 public _queryHash;

    constructor() {
        _owner = msg.sender;
        _zkpay = address(0x1234567890123456789012345678901234567890); // Placeholder address
        _token = IERC20(address(0x0987654321098765432109876543210987654321)); // Placeholder address
        _airdropExecuted = false;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Caller is not the owner");
        _;
    }

    modifier onlyZKPay() {
        require(msg.sender == _zkpay, "Caller is not _zkpay");
        _;
    }

    modifier onlyOnce() {
        require(!_airdropExecuted, "Airdrop has already been executed");
        _;
        _airdropExecuted = true;
    }

    function queryZKPay() external payable onlyOwner {
        DataTypes.QueryParameter[] memory queryParams;

        DataTypes.QueryData memory queryData = DataTypes.QueryData({
            query: abi.encode(
                "SELECT FROM_ADDRESS, COUNT(*) AS TRANSACTION_COUNT FROM ETHEREUM.TRANSACTIONS WHERE TO_ADDRESS = '0xae7ab96520de3a18e5e111b5eaab095312d7fe84' AND FROM_ADDRESS != '0x0000000000000000000000000000000000000000' GROUP BY FROM_ADDRESS ORDER BY TRANSACTION_COUNT DESC LIMIT 400;"
            ),
            queryType: DataTypes.QueryType.SQL,
            queryParameters: queryParams,
            timeout: uint64(block.timestamp + 30 minutes),
            callbackClientContractAddress: address(this),
            callbackGasLimit: 400_000,
            callbackData: "",
            zkVerficiation: DataTypes.ZKVerification.External
        });

        _queryHash = IZKPay(_zkpay).queryWithNative{ value: msg.value }(queryData);
    }

    function sxtCallback(
        DataTypes.QueryResult calldata queryResult,
        bytes calldata callbackData,
        DataTypes.ZKVerification zkVerficiation
    )
        external
        override
        onlyZKPay
        onlyOnce
    {
        require(_queryHash != bytes32(0), "Invalid query hash");
        require(queryResult.queryHash == _queryHash, "Query hash does not match");

        uint256 recipientCount = 0;
        for (uint256 i = 0; i < queryResult.columns[0].values.length; i++) {
            address recipient = abi.decode(queryResult.columns[0].values[i], (address));
            _token.safeTransfer(recipient, AIRDROP_AMOUNT);
            recipientCount++;
        }

        emit AirdropExecuted(recipientCount);
    }

    function sxtErrorCallback(
        DataTypes.ZKpayError calldata error,
        bytes calldata callbackData
    )
        external
        override
        onlyZKPay
    {
        emit LogError(error.code, error.message);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success,) = _owner.call{ value: balance }("");
        require(success, "Failed to send Ether");
    }

    function cancelQuery(bytes32 queryHash) external onlyOwner {
        IZKPay(_zkpay).cancelQueryPayment(queryHash);
    }

    receive() external payable {}
}
