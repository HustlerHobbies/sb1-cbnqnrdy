import React from 'react';
import { Gauge } from 'lucide-react';

interface ConfidenceSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function ConfidenceSlider({ value, onChange }: ConfidenceSliderProps) {
  // Ensure value is a valid number between 1-10
  const safeValue = isNaN(value) || value < 1 ? 5 : Math.min(10, Math.max(1, Math.round(value)));

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Gauge size={16} className="text-blue-600" />
          <label className="text-sm font-medium text-gray-700">Confidence Level</label>
        </div>
        <span className="text-sm font-medium text-blue-600">{safeValue}/10</span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={safeValue}
        onChange={(e) => onChange(Math.round(Number(e.target.value)))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Low Confidence</span>
        <span>Medium</span>
        <span>High Confidence</span>
      </div>
    </div>
  );
}