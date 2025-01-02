import React from 'react';
import { ModelCard } from './ModelCard';
import { AIModel } from '../types/Model';

interface ModelListProps {
  models: AIModel[];
  onPurchase: (modelId: string) => void;
  onRent: (modelId: string) => void;
}

export function ModelList({ models, onPurchase, onRent }: ModelListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {models.map((model) => (
        <ModelCard
          key={model.id}
          model={model}
          onPurchase={onPurchase}
          onRent={onRent}
        />
      ))}
    </div>
  );
}