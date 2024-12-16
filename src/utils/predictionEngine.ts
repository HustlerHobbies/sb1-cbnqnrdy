import { Match, HistoricalMatch, TeamStats } from '../types';
import { historicalMatches } from './historicalData';
import { subMonths } from 'date-fns';
import { analyzeSentiment } from './sentimentAnalysis';
import { analyzePlayerMatchups, getTeamPlayerStats } from './playerData';
import { calculateTeamStats, getHeadToHead } from './teamStats';

export { calculateTeamStats, getHeadToHead };

export async function predictMatch(match: Match) {
  const playerMatchups = analyzePlayerMatchups(match.homeTeam, match.awayTeam);
  const homeTeamStats = getTeamPlayerStats(match.homeTeam);
  const awayTeamStats = getTeamPlayerStats(match.awayTeam);

  // Get base prediction
  const basePrediction = await predictMatchResult(match);

  // Adjust probabilities based on player stats
  const playerFactor = 0.3; // Weight for player-based adjustments
  const adjustedProbabilities = {
    home: basePrediction.probabilities.home * (1 + playerFactor * (
      playerMatchups.homeAdvantage +
      playerMatchups.attackingThreat +
      (homeTeamStats.keyPlayersAvailable ? 0.1 : -0.1)
    )),
    away: basePrediction.probabilities.away * (1 + playerFactor * (
      (1 - playerMatchups.homeAdvantage) +
      (1 - playerMatchups.defensiveSolidity) +
      (awayTeamStats.keyPlayersAvailable ? 0.1 : -0.1)
    )),
    draw: basePrediction.probabilities.draw
  };

  // Normalize probabilities
  const total = adjustedProbabilities.home + adjustedProbabilities.away + adjustedProbabilities.draw;
  Object.keys(adjustedProbabilities).forEach(key => {
    adjustedProbabilities[key as keyof typeof adjustedProbabilities] /= total;
  });

  // Add player-specific factors to explanation
  const additionalFactors = [
    homeTeamStats.keyPlayersAvailable ? `${match.homeTeam}'s key players are fit` : null,
    awayTeamStats.keyPlayersAvailable ? `${match.awayTeam}'s key players are fit` : null,
    playerMatchups.attackingThreat > 0.6 ? `Strong attacking threat from ${match.homeTeam}` : null,
    playerMatchups.defensiveSolidity > 0.6 ? `Solid defensive setup for ${match.homeTeam}` : null,
    homeTeamStats.averageForm > 7.5 ? `Excellent team form for ${match.homeTeam}` : null,
    awayTeamStats.averageForm > 7.5 ? `Excellent team form for ${match.awayTeam}` : null
  ].filter(Boolean) as string[];

  return {
    ...basePrediction,
    probabilities: adjustedProbabilities,
    factors: [...basePrediction.factors, ...additionalFactors],
    playerAnalysis: {
      homeTeam: homeTeamStats,
      awayTeam: awayTeamStats,
      matchups: playerMatchups
    }
  };
}

// Rest of the existing predictMatchResult implementation...