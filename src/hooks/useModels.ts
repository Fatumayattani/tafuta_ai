import { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from './useWeb3';
import { dummyModels } from '../data/dummyModels';
import { AIModel } from '../types/Model';

export function useModels() {
  const { contract } = useWeb3();
  const [models, setModels] = useState<AIModel[]>(dummyModels);

  const handleUpload = async (modelData: any) => {
    if (!contract) return;
    
    try {
      const tx = await contract.listModel(
        modelData.name,
        modelData.description,
        ethers.parseEther(modelData.price),
        modelData.ipfsHash
      );
      await tx.wait();
      // Refresh models list
    } catch (error) {
      console.error('Error listing model:', error);
    }
  };

  const handlePurchase = async (modelId: string) => {
    if (!contract) return;
    
    try {
      const model = models.find(m => m.id === modelId);
      if (!model) return;
      
      const tx = await contract.purchaseModel(modelId, {
        value: ethers.parseEther(model.price)
      });
      await tx.wait();
      // Refresh models list
    } catch (error) {
      console.error('Error purchasing model:', error);
    }
  };

  const handleRent = async (modelId: string) => {
    // Implement rent functionality
  };

  return {
    models,
    handleUpload,
    handlePurchase,
    handleRent
  };
}