export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  date: string;
  sport: SportType;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  prediction?: 'home' | 'draw' | 'away';
  confidence?: number;
  tags?: string[];
  stake?: number;
}

export interface PredictionStats {
  total: number;
  correct: number;
  accuracy: number;
  streak: number;
  bestStreak: number;
}

export interface League {
  id: string;
  name: string;
  country: string;
  logo: string;
}

export interface HistoricalMatch extends Match {
  result: 'home' | 'draw' | 'away';
  score?: {
    home: number;
    away: number;
  };
}

export interface TeamStats {
  team: string;
  homeWins: number;
  homeLosses: number;
  homeDraws: number;
  awayWins: number;
  awayLosses: number;
  awayDraws: number;
  goalsScored: number;
  goalsConceded: number;
}

export interface HeadToHead {
  matches: HistoricalMatch[];
  stats: {
    team1Wins: number;
    team2Wins: number;
    draws: number;
  };
}

export interface UserBalance {
  available: number;
  pending: number;
  currency: string;
}

export type SortOption = 'date' | 'league' | 'odds';

export type { SportType } from './sports';