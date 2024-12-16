import React from 'react';
import { Sport, SportType } from '../types/sports';
import { getSportIcon } from '../utils/sportsData';

interface SportSelectorProps {
  sports: Sport[];
  selectedSport: SportType | null;
  onSportSelect: (sport: SportType | null) => void;
}

export function SportSelector({ sports, selectedSport, onSportSelect }: SportSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="font-semibold mb-3">Select Sport</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <button
          onClick={() => onSportSelect(null)}
          className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
            selectedSport === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <span className="text-sm font-medium">All Sports</span>
        </button>
        {sports.map((sport) => {
          const Icon = getSportIcon(sport.id);
          return (
            <button
              key={sport.id}
              onClick={() => onSportSelect(sport.id)}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                selectedSport === sport.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Icon size={24} className="mb-2" />
              <span className="text-sm font-medium">{sport.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}