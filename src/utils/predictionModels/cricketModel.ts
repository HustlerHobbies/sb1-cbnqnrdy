import { SportPredictionModel, Match, SportSpecificStats } from '../../types/sports';

export const cricketModel: SportPredictionModel = {
  sport: 'cricket',
  
  calculateWinProbability: (match: Match, stats: SportSpecificStats) => {
    if (!stats.cricket) return 0.5;

    const {
      battingAverage,
      bowlingAverage,
      strikeRate,
      economyRate
    } = stats.cricket;

    // Cricket-specific probability calculation
    const battingStrength = battingAverage / 50;
    const bowlingStrength = (1 / bowlingAverage) * 25;
    const scoringRate = strikeRate / 100;
    const bowlingEconomy = (1 / economyRate) * 6;

    return (battingStrength * 0.3 +
            bowlingStrength * 0.3 +
            scoringRate * 0.2 +
            bowlingEconomy * 0.2);
  },

  getRelevantFactors: (match: Match) => {
    return [
      'Batting form analysis',
      'Bowling performance metrics',
      'Pitch conditions',
      'Weather impact'
    ];
  },

  getSportSpecificConfidence: (match: Match) => {
    // Cricket-specific confidence calculation
    return 7; // Placeholder implementation
  }
};