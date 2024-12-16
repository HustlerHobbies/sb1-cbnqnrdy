import React from 'react';
import { Filter } from 'lucide-react';
import { League } from '../types';

interface LeagueFilterProps {
  leagues: League[];
  selectedLeague: string | null;
  onLeagueSelect: (leagueId: string | null) => void;
}

export function LeagueFilter({ leagues, selectedLeague, onLeagueSelect }: LeagueFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Filter size={18} className="text-blue-600" />
        <h3 className="font-semibold">Filter by League</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onLeagueSelect(null)}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedLeague === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          All Leagues
        </button>
        {leagues.map((league) => (
          <button
            key={league.id}
            onClick={() => onLeagueSelect(league.id)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedLeague === league.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {league.name}
          </button>
        ))}
      </div>
    </div>
  );
}