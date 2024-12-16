import React from 'react';
import { Trophy, Flame, Target, Award } from 'lucide-react';
import { PredictionStats } from '../types';

interface StatsProps {
  stats: PredictionStats;
}

export function Stats({ stats }: StatsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="text-yellow-500" size={24} />
        <h2 className="text-xl font-bold">Your Predictions</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Target className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-sm text-gray-500">Total Predictions</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Award className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{stats.correct}</div>
            <div className="text-sm text-gray-500">Correct</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Accuracy</span>
              <span className="text-lg font-bold text-blue-600">{stats.accuracy}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2"
                style={{ width: `${stats.accuracy}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 bg-orange-50 p-4 rounded-lg text-center">
              <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-800">{stats.streak}</div>
              <div className="text-xs text-gray-500">Current Streak</div>
            </div>
            <div className="flex-1 bg-purple-50 p-4 rounded-lg text-center">
              <Trophy className="w-5 h-5 text-purple-500 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-800">{stats.bestStreak}</div>
              <div className="text-xs text-gray-500">Best Streak</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}