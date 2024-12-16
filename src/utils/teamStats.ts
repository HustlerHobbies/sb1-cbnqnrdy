import { HistoricalMatch, TeamStats } from '../types';
import { historicalMatches } from './historicalData';

export function calculateTeamStats(team: string, matches: HistoricalMatch[]): TeamStats {
  const teamMatches = matches.filter(
    match => match.homeTeam === team || match.awayTeam === team
  );

  const stats: TeamStats = {
    team,
    homeWins: 0,
    homeLosses: 0,
    homeDraws: 0,
    awayWins: 0,
    awayLosses: 0,
    awayDraws: 0,
    goalsScored: 0,
    goalsConceded: 0
  };

  teamMatches.forEach(match => {
    const isHome = match.homeTeam === team;
    const score = match.score || { home: 0, away: 0 };

    if (isHome) {
      stats.goalsScored += score.home;
      stats.goalsConceded += score.away;
      if (match.result === 'home') stats.homeWins++;
      else if (match.result === 'away') stats.homeLosses++;
      else stats.homeDraws++;
    } else {
      stats.goalsScored += score.away;
      stats.goalsConceded += score.home;
      if (match.result === 'away') stats.awayWins++;
      else if (match.result === 'home') stats.awayLosses++;
      else stats.awayDraws++;
    }
  });

  return stats;
}

export function getHeadToHead(team1: string, team2: string): {
  matches: HistoricalMatch[];
  stats: { team1Wins: number; team2Wins: number; draws: number };
} {
  const h2hMatches = historicalMatches.filter(
    match =>
      (match.homeTeam === team1 && match.awayTeam === team2) ||
      (match.homeTeam === team2 && match.awayTeam === team1)
  );

  const stats = h2hMatches.reduce(
    (acc, match) => {
      if (match.result === 'draw') {
        acc.draws++;
      } else if (
        (match.homeTeam === team1 && match.result === 'home') ||
        (match.awayTeam === team1 && match.result === 'away')
      ) {
        acc.team1Wins++;
      } else {
        acc.team2Wins++;
      }
      return acc;
    },
    { team1Wins: 0, team2Wins: 0, draws: 0 }
  );

  return {
    matches: h2hMatches,
    stats
  };
}