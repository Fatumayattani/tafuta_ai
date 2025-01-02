import React from 'react';
import { Header } from './components/Header';
import { ModelList } from './components/ModelList';
import { UploadModel } from './components/UploadModel';
import { useWeb3 } from './hooks/useWeb3';
import { useModels } from './hooks/useModels';

function App() {
  const { account, connectWallet } = useWeb3();
  const { models, handleUpload, handlePurchase, handleRent } = useModels();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header account={account} onConnect={connectWallet} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Upload New Model</h2>
            <UploadModel onUpload={handleUpload} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Available Models</h2>
            <ModelList
              models={models}
              onPurchase={handlePurchase}
              onRent={handleRent}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;