import React from 'react';
import { Brain, TrendingUp, BarChart3, Zap } from 'lucide-react';

interface AIPredictionCardProps {
  prediction: {
    prediction: 'home' | 'draw' | 'away';
    confidence: number;
    probabilities: {
      home: number;
      draw: number;
      away: number;
    };
    factors: string[];
  };
  homeTeam: string;
  awayTeam: string;
}

export function AIPredictionCard({ prediction, homeTeam, awayTeam }: AIPredictionCardProps) {
  const getPredictionText = () => {
    switch (prediction.prediction) {
      case 'home':
        return `${homeTeam} to win`;
      case 'draw':
        return 'Draw';
      case 'away':
        return `${awayTeam} to win`;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    const safeConfidence = isNaN(confidence) || confidence < 1 ? 5 : Math.min(10, Math.max(1, confidence));
    if (safeConfidence >= 7) return 'text-green-600';
    if (safeConfidence >= 4) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Ensure confidence is a valid number between 1-10
  const safeConfidence = isNaN(prediction.confidence) || prediction.confidence < 1 
    ? 5 
    : Math.min(10, Math.max(1, Math.round(prediction.confidence)));

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="text-purple-600" size={20} />
        <h3 className="font-semibold text-gray-800">AI Prediction</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-purple-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={16} className="text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Prediction</span>
          </div>
          <div className="text-lg font-bold text-purple-700">{getPredictionText()}</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Confidence</span>
          </div>
          <div className={`text-lg font-bold ${getConfidenceColor(safeConfidence)}`}>
            {safeConfidence}/10
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 size={16} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Win Probabilities</span>
        </div>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>{homeTeam}</span>
              <span>{Math.round((prediction.probabilities.home || 0) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2"
                style={{ width: `${(prediction.probabilities.home || 0) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Draw</span>
              <span>{Math.round((prediction.probabilities.draw || 0) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gray-600 rounded-full h-2"
                style={{ width: `${(prediction.probabilities.draw || 0) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>{awayTeam}</span>
              <span>{Math.round((prediction.probabilities.away || 0) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 rounded-full h-2"
                style={{ width: `${(prediction.probabilities.away || 0) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {prediction.factors.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Key Factors</h4>
          <div className="space-y-1">
            {prediction.factors.map((factor, index) => (
              <div
                key={index}
                className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded"
              >
                • {factor}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}