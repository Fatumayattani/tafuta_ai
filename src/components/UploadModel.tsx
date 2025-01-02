import React, { useState } from 'react';
import { uploadToIPFS } from '../services/ipfsService';

interface UploadModelProps {
  onUpload: (modelData: {
    name: string;
    description: string;
    price: string;
    ipfsHash: string;
  }) => Promise<void>;
}

export function UploadModel({ onUpload }: UploadModelProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      setUploading(true);
      const ipfsHash = await uploadToIPFS(file);
      await onUpload({ name, description, price, ipfsHash });
      
      // Reset form
      setName('');
      setDescription('');
      setPrice('');
      setFile(null);
    } catch (error) {
      console.error('Error uploading model:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Model Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Price (ETH)
        </label>
        <input
          type="number"
          step="0.001"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Model File
        </label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-1 block w-full"
          required
        />
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {uploading ? 'Uploading...' : 'Upload Model'}
      </button>
    </form>
  );
}