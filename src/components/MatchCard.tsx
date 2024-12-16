import React, { useState, useEffect } from 'react';
import { Calendar, Timer, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { Match, UserBalance } from '../types';
import { ConfidenceSlider } from './ConfidenceSlider';
import { StakeInput } from './StakeInput';
import { PotentialReturn } from './PotentialReturn';
import { HistoricalAnalysis } from './HistoricalAnalysis';
import { SentimentIndicator } from './SentimentIndicator';
import { AIPredictionCard } from './AIPredictionCard';
import { getHeadToHead, calculateTeamStats } from '../utils/teamStats';
import { historicalMatches } from '../utils/historicalData';
import { telegramService } from '../services/telegramService';
import { predictionService } from '../services/predictionService';

interface MatchCardProps {
  match: Match;
  balance: UserBalance;
  onPredictionSelect: (matchId: string, prediction: 'home' | 'draw' | 'away', confidence: number, stake: number) => void;
}

export function MatchCard({ match, balance, onPredictionSelect }: MatchCardProps) {
  const [confidence, setConfidence] = useState<number>(5);
  const [stake, setStake] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [selectedPrediction, setSelectedPrediction] = useState<'home' | 'draw' | 'away' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const matchDate = new Date(match.date);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const pred = await predictionService.getPrediction(match);
        setPrediction(pred);
        if (pred) {
          await telegramService.sendPrediction(match, pred.prediction, pred.confidence);
          setSelectedPrediction(pred.prediction);
          setConfidence(pred.confidence || 5);
        }
      } catch (error) {
        console.error('Error fetching prediction:', error);
        setError('Failed to load prediction. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrediction();
  }, [match]);

  const handleConfidenceChange = (newConfidence: number) => {
    setConfidence(newConfidence);
    if (selectedPrediction && stake > 0) {
      onPredictionSelect(match.id, selectedPrediction, newConfidence, stake);
    }
  };

  const handlePredictionClick = (type: 'home' | 'draw' | 'away') => {
    setSelectedPrediction(type);
    if (stake > 0) {
      onPredictionSelect(match.id, type, confidence, stake);
    }
  };

  const handleStakeChange = (newStake: number) => {
    setStake(newStake);
    if (selectedPrediction) {
      onPredictionSelect(match.id, selectedPrediction, confidence, newStake);
    }
  };

  const selectedOdds = selectedPrediction ? match.odds[selectedPrediction] : null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">
              {format(matchDate, 'MMM d, yyyy HH:mm')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Timer size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">
              {match.league}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <h3 className="font-semibold mb-2">{match.homeTeam}</h3>
            <button
              onClick={() => handlePredictionClick('home')}
              className={`w-full py-2 px-4 rounded-lg transition-colors ${
                selectedPrediction === 'home'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {match.odds.home.toFixed(2)}
            </button>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">Draw</h3>
            <button
              onClick={() => handlePredictionClick('draw')}
              className={`w-full py-2 px-4 rounded-lg transition-colors ${
                selectedPrediction === 'draw'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {match.odds.draw.toFixed(2)}
            </button>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">{match.awayTeam}</h3>
            <button
              onClick={() => handlePredictionClick('away')}
              className={`w-full py-2 px-4 rounded-lg transition-colors ${
                selectedPrediction === 'away'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {match.odds.away.toFixed(2)}
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Analyzing match data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-600">{error}</div>
        ) : prediction && (
          <>
            <div className="space-y-4">
              <AIPredictionCard
                prediction={prediction}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
              />
              
              <SentimentIndicator
                sentiment={prediction.sentiment.value}
                confidence={prediction.sentiment.confidence}
                sources={prediction.sentiment.sources}
              />
            </div>

            {selectedPrediction && (
              <div className="mt-6">
                <ConfidenceSlider
                  value={confidence}
                  onChange={handleConfidenceChange}
                />
                <StakeInput
                  value={stake}
                  onChange={handleStakeChange}
                  maxStake={balance.available}
                  currency={balance.currency}
                />
                {stake > 0 && selectedOdds && (
                  <PotentialReturn
                    stake={stake}
                    odds={selectedOdds}
                    currency={balance.currency}
                  />
                )}
              </div>
            )}
          </>
        )}

        <button
          onClick={() => setShowAnalysis(!showAnalysis)}
          className="flex items-center gap-2 text-blue-600 mt-4 text-sm font-medium"
        >
          {showAnalysis ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {showAnalysis ? 'Hide Analysis' : 'Show Analysis'}
        </button>
      </div>

      {showAnalysis && (
        <div className="border-t border-gray-100 p-6">
          <HistoricalAnalysis
            h2h={getHeadToHead(match.homeTeam, match.awayTeam)}
            homeStats={calculateTeamStats(match.homeTeam, historicalMatches)}
            awayStats={calculateTeamStats(match.awayTeam, historicalMatches)}
          />
        </div>
      )}
    </div>
  );
}