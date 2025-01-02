import React from 'react';
import { AIModel } from '../types/Model';

interface ModelCardProps {
  model: AIModel;
  onPurchase: (modelId: string) => void;
  onRent: (modelId: string) => void;
}

export function ModelCard({ model, onPurchase, onRent }: ModelCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={model.image} 
        alt={model.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
        <p className="text-gray-600 mb-4">{model.description}</p>
        <div className="flex justify-between items-center">
          <div>
            {model.isForSale && (
              <p className="text-lg font-medium">
                Price: {model.price} ETH
              </p>
            )}
            {model.isForRent && (
              <p className="text-sm text-gray-500">
                Rent: {model.rentPrice} ETH/{model.rentDuration} days
              </p>
            )}
          </div>
          <div className="space-x-2">
            {model.isForSale && (
              <button
                onClick={() => onPurchase(model.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Buy
              </button>
            )}
            {model.isForRent && (
              <button
                onClick={() => onRent(model.id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Rent
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}