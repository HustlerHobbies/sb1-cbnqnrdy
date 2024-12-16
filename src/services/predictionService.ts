import { Match } from '../types';
import { predictMatchResult } from '../utils/predictionAlgorithm';
import { analyzeSentiment } from '../utils/sentimentAnalysis';
import { analyzePlayerMatchups, getTeamPlayerStats } from '../utils/playerData';

class PredictionService {
  private cache: Map<string, any> = new Map();

  async getPrediction(match: Match) {
    try {
      // Check cache first
      const cacheKey = `${match.id}-${match.homeTeam}-${match.awayTeam}`;
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }

      // Get all required data in parallel
      const [
        matchResult,
        sentiment,
        playerMatchups,
        homeTeamStats,
        awayTeamStats
      ] = await Promise.all([
        predictMatchResult(match),
        analyzeSentiment(match),
        analyzePlayerMatchups(match.homeTeam, match.awayTeam),
        getTeamPlayerStats(match.homeTeam),
        getTeamPlayerStats(match.awayTeam)
      ]);

      // Combine all data
      const prediction = {
        ...matchResult,
        sentiment,
        playerAnalysis: {
          matchups: playerMatchups,
          homeTeam: homeTeamStats,
          awayTeam: awayTeamStats
        }
      };

      // Cache the result
      this.cache.set(cacheKey, prediction);
      return prediction;
    } catch (error) {
      console.error('Error generating prediction:', error);
      throw new Error('Failed to generate prediction');
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

export const predictionService = new PredictionService();