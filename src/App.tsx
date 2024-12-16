import React, { useState } from 'react';
import { Trophy, ArrowUpDown } from 'lucide-react';
import { Match, PredictionStats, SortOption, UserBalance } from './types';
import { upcomingMatches, leagues } from './utils/mockData';
import { sports } from './utils/sportsData';
import { MatchCard } from './components/MatchCard';
import { Stats } from './components/Stats';
import { LeagueFilter } from './components/LeagueFilter';
import { BalanceCard } from './components/BalanceCard';
import { VirtualBalanceModal } from './components/VirtualBalanceModal';
import { TelegramConnect } from './components/TelegramConnect';
import { SportSelector } from './components/SportSelector';
import { SportType } from './types/sports';
import { Toaster } from 'react-hot-toast';

function App() {
  const [selectedSport, setSelectedSport] = useState<SportType | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [balance, setBalance] = useState<UserBalance>({
    available: 1000,
    pending: 0,
    currency: '$'
  });
  const [stats, setStats] = useState<PredictionStats>({
    total: 0,
    correct: 0,
    accuracy: 0,
    streak: 0,
    bestStreak: 0
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="text-blue-600" size={24} />
              <h1 className="text-xl font-bold">BetPredictor</h1>
            </div>
            <button
              onClick={() => setSortBy(prev => 
                prev === 'date' ? 'odds' : prev === 'odds' ? 'league' : 'date'
              )}
              className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <ArrowUpDown size={16} />
              <span className="text-sm font-medium">Sort by {sortBy}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SportSelector
              sports={sports}
              selectedSport={selectedSport}
              onSportSelect={setSelectedSport}
            />
            <LeagueFilter
              leagues={leagues}
              selectedLeague={selectedLeague}
              onLeagueSelect={setSelectedLeague}
            />
            <div className="space-y-4">
              {upcomingMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  balance={balance}
                  onPredictionSelect={(matchId, prediction, confidence, stake) => {
                    // Handle prediction selection
                  }}
                />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <BalanceCard
              balance={balance}
              onDeposit={() => setIsBalanceModalOpen(true)}
            />
            <Stats stats={stats} />
            <TelegramConnect />
          </div>
        </div>
      </main>

      <VirtualBalanceModal
        isOpen={isBalanceModalOpen}
        onClose={() => setIsBalanceModalOpen(false)}
        onSubmit={(amount) => {
          setBalance(prev => ({
            ...prev,
            available: amount
          }));
        }}
        currency={balance.currency}
      />
    </div>
  );
}

export default App;