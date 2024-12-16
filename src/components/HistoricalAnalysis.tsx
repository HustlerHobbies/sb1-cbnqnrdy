import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { HistoricalMatch, HeadToHead, TeamStats } from '../types';
import { format } from 'date-fns';

interface HistoricalAnalysisProps {
  h2h: HeadToHead;
  homeStats: TeamStats;
  awayStats: TeamStats;
}

export function HistoricalAnalysis({ h2h, homeStats, awayStats }: HistoricalAnalysisProps) {
  const formattedMatches = h2h.matches.map(match => ({
    date: format(new Date(match.date), 'MMM d, yyyy'),
    homeScore: match.score?.home || 0,
    awayScore: match.score?.away || 0,
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Historical Analysis</h3>
      
      <div className="mb-6">
        <h4 className="text-md font-medium mb-2">Head-to-Head Record</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-xl font-bold text-blue-600">{h2h.stats.team1Wins}</div>
            <div className="text-sm text-gray-600">Home Wins</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xl font-bold text-gray-600">{h2h.stats.draws}</div>
            <div className="text-sm text-gray-600">Draws</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-xl font-bold text-green-600">{h2h.stats.team2Wins}</div>
            <div className="text-sm text-gray-600">Away Wins</div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-md font-medium mb-4">Recent Form</h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Home Team Form</span>
              <span>{Math.round((homeStats.homeWins / (homeStats.homeWins + homeStats.homeLosses + homeStats.homeDraws)) * 100)}% Win Rate</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: `${(homeStats.homeWins / (homeStats.homeWins + homeStats.homeLosses + homeStats.homeDraws)) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Away Team Form</span>
              <span>{Math.round((awayStats.awayWins / (awayStats.awayWins + awayStats.awayLosses + awayStats.awayDraws)) * 100)}% Win Rate</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-green-600 rounded-full"
                style={{ width: `${(awayStats.awayWins / (awayStats.awayWins + awayStats.awayLosses + awayStats.awayDraws)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-4">Historical Matchups</h4>
        <div className="w-full h-64">
          <LineChart
            width={500}
            height={200}
            data={formattedMatches}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="homeScore" stroke="#3B82F6" name="Home Goals" />
            <Line type="monotone" dataKey="awayScore" stroke="#10B981" name="Away Goals" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}