import { SportPredictionModel, Match, SportSpecificStats } from '../../types/sports';

export const tennisModel: SportPredictionModel = {
  sport: 'tennis',
  
  calculateWinProbability: (match: Match, stats: SportSpecificStats) => {
    if (!stats.tennis) return 0.5;

    const {
      aces,
      doubleFaults,
      firstServePercentage,
      breakPointsConverted
    } = stats.tennis;

    // Tennis-specific probability calculation
    const servingEfficiency = (aces - doubleFaults) / 20;
    const serveAccuracy = firstServePercentage / 100;
    const breakPointEfficiency = breakPointsConverted / 100;

    return (servingEfficiency * 0.3 +
            serveAccuracy * 0.4 +
            breakPointEfficiency * 0.3);
  },

  getRelevantFactors: (match: Match) => {
    return [
      'Serving performance',
      'Return game efficiency',
      'Recent tournament results'
    ];
  },

  getSportSpecificConfidence: (match: Match) => {
    // Tennis-specific confidence calculation
    return 8; // Placeholder implementation
  }
};