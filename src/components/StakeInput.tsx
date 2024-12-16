import React from 'react';
import { DollarSign } from 'lucide-react';

interface StakeInputProps {
  value: number;
  onChange: (value: number) => void;
  maxStake: number;
  currency: string;
}

export function StakeInput({ value, onChange, maxStake, currency }: StakeInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(Number(e.target.value), maxStake);
    onChange(newValue);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
          <DollarSign size={16} className="text-blue-600" />
          Stake Amount
        </label>
        <span className="text-sm text-gray-500">
          Max: {currency}{maxStake.toFixed(2)}
        </span>
      </div>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          {currency}
        </span>
        <input
          type="number"
          min="0"
          max={maxStake}
          step="0.1"
          value={value}
          onChange={handleChange}
          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex justify-between mt-2">
        {[0.25, 0.5, 0.75, 1].map((fraction) => (
          <button
            key={fraction}
            onClick={() => onChange(maxStake * fraction)}
            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            {(fraction * 100)}%
          </button>
        ))}
      </div>
    </div>
  );
}