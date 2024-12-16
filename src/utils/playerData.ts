import { PlayerStats, TeamPlayerStats } from '../types/player';

// Mock player database
export const players: Record<string, PlayerStats[]> = {
  'Arsenal': [
    {
      id: 'saka',
      name: 'Bukayo Saka',
      team: 'Arsenal',
      position: 'FWD',
      form: 8.5,
      fitness: 95,
      goals: 12,
      assists: 8,
      minutesPlayed: 2150,
      yellowCards: 2,
      redCards: 0,
      xG: 10.2,
      xA: 7.8,
      passAccuracy: 84,
      keyPasses: 45
    },
    // Add more players...
  ],
  'Manchester City': [
    {
      id: 'haaland',
      name: 'Erling Haaland',
      team: 'Manchester City',
      position: 'FWD',
      form: 9.0,
      fitness: 98,
      goals: 18,
      assists: 5,
      minutesPlayed: 1980,
      yellowCards: 1,
      redCards: 0,
      xG: 16.5,
      xA: 4.2,
      passAccuracy: 78,
      keyPasses: 25
    },
    // Add more players...
  ],
  // Add more teams...
};

export function getTeamPlayerStats(team: string): TeamPlayerStats {
  const teamPlayers = players[team] || [];
  
  const averageForm = teamPlayers.reduce((sum, player) => sum + player.form, 0) / 
    (teamPlayers.length || 1);
  
  const fitnessIndex = teamPlayers.reduce((sum, player) => sum + player.fitness, 0) / 
    (teamPlayers.length || 1);
  
  const keyPlayers = teamPlayers.filter(p => p.form >= 8.0);
  const keyPlayersAvailable = keyPlayers.some(p => p.fitness >= 90);

  return {
    team,
    players: teamPlayers,
    averageForm,
    fitnessIndex,
    keyPlayersAvailable,
    formation: '4-3-3' // In a real app, this would be dynamic
  };
}

export function getPlayerHeadToHead(
  team1Players: PlayerStats[],
  team2Players: PlayerStats[]
): number {
  // Calculate relative strength based on player stats
  const team1Strength = calculateTeamStrength(team1Players);
  const team2Strength = calculateTeamStrength(team2Players);
  
  // Return normalized ratio between 0 and 1
  return team1Strength / (team1Strength + team2Strength);
}

function calculateTeamStrength(players: PlayerStats[]): number {
  return players.reduce((strength, player) => {
    const positionMultiplier = {
      GK: 1.0,
      DEF: 1.0,
      MID: 1.1,
      FWD: 1.2
    }[player.position];

    return strength + (
      player.form * 
      (player.fitness / 100) * 
      positionMultiplier * 
      (1 + (player.goals * 0.1 + player.assists * 0.05))
    );
  }, 0);
}

export function analyzePlayerMatchups(
  homeTeam: string,
  awayTeam: string
): {
  homeAdvantage: number;
  attackingThreat: number;
  defensiveSolidity: number;
} {
  const homeStats = getTeamPlayerStats(homeTeam);
  const awayStats = getTeamPlayerStats(awayTeam);

  const homeAttackers = homeStats.players.filter(p => p.position === 'FWD');
  const homeDefenders = homeStats.players.filter(p => p.position === 'DEF');
  const awayAttackers = awayStats.players.filter(p => p.position === 'FWD');
  const awayDefenders = awayStats.players.filter(p => p.position === 'DEF');

  const homeAttackingStrength = calculateTeamStrength(homeAttackers);
  const homeDefensiveStrength = calculateTeamStrength(homeDefenders);
  const awayAttackingStrength = calculateTeamStrength(awayAttackers);
  const awayDefensiveStrength = calculateTeamStrength(awayDefenders);

  return {
    homeAdvantage: homeStats.averageForm / (homeStats.averageForm + awayStats.averageForm),
    attackingThreat: homeAttackingStrength / (homeAttackingStrength + awayDefensiveStrength),
    defensiveSolidity: homeDefensiveStrength / (homeDefensiveStrength + awayAttackingStrength)
  };
}