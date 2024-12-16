import React from 'react';
import { Wallet, TrendingUp, Clock } from 'lucide-react';
import { UserBalance } from '../types';

interface BalanceCardProps {
  balance: UserBalance;
  onDeposit: () => void;
}

export function BalanceCard({ balance, onDeposit }: BalanceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Wallet className="text-blue-600" size={24} />
        <h2 className="text-xl font-bold">Your Balance</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">Available</span>
          </div>
          <div className="text-2xl font-bold">
            {balance.currency}{balance.available.toFixed(2)}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <Clock size={16} />
            <span className="text-sm font-medium">Pending</span>
          </div>
          <div className="text-2xl font-bold text-gray-700">
            {balance.currency}{balance.pending.toFixed(2)}
          </div>
        </div>
      </div>

      <button
        onClick={onDeposit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Deposit Funds
      </button>
    </div>
  );
}