import React from 'react';
import { TrendingUp } from 'lucide-react';

interface PotentialReturnProps {
  stake: number;
  odds: number;
  currency: string;
}

export function PotentialReturn({ stake, odds, currency }: PotentialReturnProps) {
  const potentialReturn = stake * odds;
  const profit = potentialReturn - stake;

  return (
    <div className="mt-4 p-4 bg-green-50 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp size={16} className="text-green-600" />
        <h4 className="font-medium text-green-800">Potential Returns</h4>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-green-600">Total Return</div>
          <div className="text-xl font-bold text-green-700">
            {currency}{potentialReturn.toFixed(2)}
          </div>
        </div>
        <div>
          <div className="text-sm text-green-600">Profit</div>
          <div className="text-xl font-bold text-green-700">
            {currency}{profit.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}