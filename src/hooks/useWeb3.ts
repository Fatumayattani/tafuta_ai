import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { MARKETPLACE_ABI } from '../contracts/MarketplaceABI';

const MARKETPLACE_ADDRESS = '0x...'; // Contract address would go here

export function useWeb3() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          MARKETPLACE_ADDRESS,
          MARKETPLACE_ABI,
          signer
        );
        
        setProvider(provider);
        setSigner(signer);
        setContract(contract);
        setAccount(await signer.getAddress());
      }
    };

    init();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setAccount(await signer.getAddress());
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    }
  };

  return { provider, signer, contract, account, connectWallet };
}