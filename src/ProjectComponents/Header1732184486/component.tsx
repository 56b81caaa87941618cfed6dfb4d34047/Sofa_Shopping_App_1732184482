
import React from 'react';
import * as ethers from 'ethers';

const CounterComponent: React.FC = () => {
  const [count, setCount] = React.useState<number | null>(null);
  const [message, setMessage] = React.useState<string>('');
  const [isConnected, setIsConnected] = React.useState<boolean>(false);

  const contractAddress = '0xa7698A3832EbDeCA686e1e0B4fe2a444d3061008';
  const chainId = 11155111; // Sepolia testnet

  const abi = [
    "function incrementCount() public",
    "function decrementCount() public",
    "function getCount() public view returns (uint256)"
  ];

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        
        if (network.chainId !== chainId) {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: ethers.utils.hexValue(chainId) }],
          });
        }
        
        setIsConnected(true);
        getCount();
      } catch (error) {
        setMessage('Failed to connect wallet: ' + (error as Error).message);
      }
    } else {
      setMessage('Please install MetaMask!');
    }
  };

  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, abi, signer);
  };

  const getCount = async () => {
    if (!isConnected) {
      await connectWallet();
    }
    try {
      const contract = getContract();
      const currentCount = await contract.getCount();
      setCount(currentCount.toNumber());
    } catch (error) {
      setMessage('Error getting count: ' + (error as Error).message);
    }
  };

  const incrementCount = async () => {
    if (!isConnected) {
      await connectWallet();
    }
    try {
      const contract = getContract();
      const tx = await contract.incrementCount();
      setMessage('Transaction sent. Waiting for confirmation...');
      await tx.wait();
      getCount();
      setMessage('Count incremented successfully!');
    } catch (error) {
      setMessage('Error incrementing count: ' + (error as Error).message);
    }
  };

  const decrementCount = async () => {
    if (!isConnected) {
      await connectWallet();
    }
    try {
      const contract = getContract();
      const tx = await contract.decrementCount();
      setMessage('Transaction sent. Waiting for confirmation...');
      await tx.wait();
      getCount();
      setMessage('Count decremented successfully!');
    } catch (error) {
      setMessage('Error decrementing count: ' + (error as Error).message);
    }
  };

  React.useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">SofaSelect</div>
          <img src={`https://raw.githubusercontent.com/56b81caaa87941618cfed6dfb4d34047/Sofa_Shopping_App_1732184482/${window.MI_PROJECT_GIT_REF || 'main'}/src/assets/images/3dc7906198c341298ff7b6f6517221eb.jpeg`} alt="Header Image" className="h-8 w-auto" />
        </div>
      </header>

      <main className="flex-grow container mx-auto mt-8 p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Table Count</h2>
          <p className="text-xl mb-4">Current Count: {count !== null ? count : 'Loading...'}</p>
          <div className="flex space-x-4 mb-4">
            <button onClick={incrementCount} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Increment
            </button>
            <button onClick={decrementCount} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Decrement
            </button>
          </div>
          {message && <p className="text-sm text-gray-600">{message}</p>}
        </div>
      </main>
    </div>
  );
};

export { CounterComponent as component };
