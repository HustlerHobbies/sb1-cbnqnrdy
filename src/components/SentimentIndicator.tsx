import React from 'react';
import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';

interface SentimentIndicatorProps {
  sentiment: number;
  confidence: number;
  sources: string[];
}

export function SentimentIndicator({ sentiment, confidence, sources }: SentimentIndicatorProps) {
  const getSentimentColor = () => {
    if (sentiment > 0.3) return 'text-green-600';
    if (sentiment < -0.3) return 'text-red-600';
    return 'text-yellow-600';
  };

  const getSentimentIcon = () => {
    if (sentiment > 0.3) return <TrendingUp className={getSentimentColor()} />;
    if (sentiment < -0.3) return <TrendingDown className={getSentimentColor()} />;
    return <Minus className={getSentimentColor()} />;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {getSentimentIcon()}
          <h4 className="font-medium">Public Sentiment</h4>
        </div>
        <div className="flex items-center gap-1">
          <AlertCircle size={14} className="text-gray-400" />
          <span className="text-sm text-gray-500">
            {Math.round(confidence * 100)}% confidence
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${sentiment > 0 ? 'bg-green-500' : 'bg-red-500'}`}
            style={{
              width: `${Math.abs(sentiment * 100)}%`,
              marginLeft: sentiment < 0 ? 'auto' : '0'
            }}
          />
        </div>

        <div className="text-sm text-gray-600">
          Based on {sources.length} sources:
          <div className="mt-1 flex flex-wrap gap-1">
            {sources.map((source, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs"
              >
                {source}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}