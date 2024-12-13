
import React from 'react';
import { ethers } from 'ethers';

const contractAddress = '0xc96051EeC5d202Bc29504528A1d6Ea1ED9Fe1B4b';
const chainId = 17000;

const abi = [
  "function generateRandomNumber() public returns (uint256)",
  "function getUserHistory() public view returns (uint256[] memory)",
];

const RandomNumberGenerator: React.FC = () => {
  const [randomNumber, setRandomNumber] = React.useState<number | null>(null);
  const [userHistory, setUserHistory] = React.useState<number[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        setError("Please install MetaMask!");
        return null;
      }

      await ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(ethereum);
      const network = await provider.getNetwork();

      if (network.chainId !== chainId) {
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: ethers.utils.hexlify(chainId) }],
          });
        } catch (switchError: any) {
          setError("Failed to switch to the correct network.");
          return null;
        }
      }

      const signer = provider.getSigner();
      return new ethers.Contract(contractAddress, abi, signer);
    } catch (error) {
      setError("Failed to connect wallet.");
      return null;
    }
  };

  const generateRandomNumber = async () => {
    setError(null);
    const contract = await connectWallet();
    if (!contract) return;

    try {
      const tx = await contract.generateRandomNumber();
      await tx.wait();
      const randomNum = await contract.getUserHistory();
      setRandomNumber(randomNum[randomNum.length - 1].toNumber());
      getUserHistory();
    } catch (error) {
      setError("Failed to generate random number.");
    }
  };

  const getUserHistory = async () => {
    setError(null);
    const contract = await connectWallet();
    if (!contract) return;

    try {
      const history = await contract.getUserHistory();
      setUserHistory(history.map((num: ethers.BigNumber) => num.toNumber()));
    } catch (error) {
      setError("Failed to retrieve user history.");
    }
  };

  React.useEffect(() => {
    getUserHistory();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-5">
        <h1 className="text-2xl font-bold mb-4">Random Number Generator</h1>
        
        <button 
          onClick={generateRandomNumber}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Generate Random Number
        </button>

        {randomNumber !== null && (
          <p className="mb-4">Generated Number: {randomNumber}</p>
        )}

        <h2 className="text-xl font-semibold mb-2">Your Number History</h2>
        <ul className="list-disc list-inside">
          {userHistory.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>

        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}
      </div>
    </div>
  );
};

export { RandomNumberGenerator as component };
