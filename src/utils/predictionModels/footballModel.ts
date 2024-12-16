import { SportPredictionModel, Match, SportSpecificStats } from '../../types/sports';
import { analyzeSentiment } from '../sentimentAnalysis';
import { getTeamPlayerStats } from '../playerData';

export const footballModel: SportPredictionModel = {
  sport: 'football',
  
  calculateWinProbability: (match: Match, stats: SportSpecificStats) => {
    if (!stats.football) return 0.5;

    const {
      possession,
      shots,
      shotsOnTarget,
      corners,
      fouls
    } = stats.football;

    // Complex probability calculation based on football-specific stats
    const possessionFactor = possession / 100;
    const shotAccuracy = shotsOnTarget / (shots || 1);
    const setPlayThreat = corners * 0.05;
    const disciplineFactor = Math.max(0, 1 - (fouls * 0.02));

    return (possessionFactor * 0.3 +
            shotAccuracy * 0.3 +
            setPlayThreat * 0.2 +
            disciplineFactor * 0.2);
  },

  getRelevantFactors: (match: Match) => {
    const homeStats = getTeamPlayerStats(match.homeTeam);
    const awayStats = getTeamPlayerStats(match.awayTeam);

    return [
      homeStats.keyPlayersAvailable ? `${match.homeTeam}'s key players are fit` : null,
      awayStats.keyPlayersAvailable ? `${match.awayTeam}'s key players are fit` : null,
      homeStats.averageForm > 7.5 ? `Strong recent form for ${match.homeTeam}` : null,
      awayStats.averageForm > 7.5 ? `Strong recent form for ${match.awayTeam}` : null
    ].filter(Boolean) as string[];
  },

  getSportSpecificConfidence: async (match: Match) => {
    const sentiment = await analyzeSentiment(match);
    const homeStats = getTeamPlayerStats(match.homeTeam);
    const awayStats = getTeamPlayerStats(match.awayTeam);

    const formConfidence = (homeStats.averageForm + awayStats.averageForm) / 2;
    const sentimentConfidence = sentiment.confidence * 10;

    return Math.round((formConfidence + sentimentConfidence) / 2);
  }
};