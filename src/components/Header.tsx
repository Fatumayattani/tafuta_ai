import React from 'react';

interface HeaderProps {
  account: string;
  onConnect: () => void;
}

export function Header({ account, onConnect }: HeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            AI Model Marketplace
          </h1>
          {!account ? (
            <button
              onClick={onConnect}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Connect Wallet
            </button>
          ) : (
            <p className="text-gray-600">
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}