import { HistoricalMatch } from '../types';

export const historicalMatches: HistoricalMatch[] = [
  // Arsenal vs Manchester City
  {
    id: 'hist-1',
    homeTeam: 'Arsenal',
    awayTeam: 'Manchester City',
    league: 'Premier League',
    date: '2024-02-25T19:45:00',
    odds: { home: 2.60, draw: 3.30, away: 2.70 },
    result: 'home',
    score: { home: 2, away: 1 }
  },
  {
    id: 'hist-2',
    homeTeam: 'Arsenal',
    awayTeam: 'Manchester City',
    league: 'Premier League',
    date: '2023-10-08T16:30:00',
    odds: { home: 2.80, draw: 3.40, away: 2.50 },
    result: 'away',
    score: { home: 0, away: 1 }
  },
  // Real Madrid vs Barcelona
  {
    id: 'hist-3',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    league: 'La Liga',
    date: '2024-01-14T20:00:00',
    odds: { home: 2.20, draw: 3.40, away: 3.10 },
    result: 'home',
    score: { home: 3, away: 1 }
  },
  {
    id: 'hist-4',
    homeTeam: 'Barcelona',
    awayTeam: 'Real Madrid',
    league: 'La Liga',
    date: '2023-10-28T15:15:00',
    odds: { home: 2.30, draw: 3.30, away: 2.90 },
    result: 'draw',
    score: { home: 1, away: 1 }
  },
  // Bayern Munich vs Dortmund
  {
    id: 'hist-5',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Dortmund',
    league: 'Bundesliga',
    date: '2024-02-10T17:30:00',
    odds: { home: 1.80, draw: 3.70, away: 4.00 },
    result: 'home',
    score: { home: 4, away: 2 }
  },
  {
    id: 'hist-6',
    homeTeam: 'Dortmund',
    awayTeam: 'Bayern Munich',
    league: 'Bundesliga',
    date: '2023-11-04T17:30:00',
    odds: { home: 3.20, draw: 3.60, away: 2.10 },
    result: 'away',
    score: { home: 0, away: 3 }
  },
  // Additional historical matches for new fixtures
  {
    id: 'hist-7',
    homeTeam: 'Liverpool',
    awayTeam: 'Manchester United',
    league: 'Premier League',
    date: '2024-02-03T17:30:00',
    odds: { home: 1.95, draw: 3.50, away: 3.70 },
    result: 'home',
    score: { home: 2, away: 0 }
  },
  {
    id: 'hist-8',
    homeTeam: 'AC Milan',
    awayTeam: 'Inter Milan',
    league: 'Serie A',
    date: '2024-02-17T19:45:00',
    odds: { home: 2.60, draw: 3.30, away: 2.60 },
    result: 'draw',
    score: { home: 1, away: 1 }
  },
  {
    id: 'hist-9',
    homeTeam: 'PSG',
    awayTeam: 'Marseille',
    league: 'Ligue 1',
    date: '2024-02-24T20:00:00',
    odds: { home: 1.70, draw: 3.80, away: 4.50 },
    result: 'home',
    score: { home: 3, away: 0 }
  },
  {
    id: 'hist-10',
    homeTeam: 'Juventus',
    awayTeam: 'Napoli',
    league: 'Serie A',
    date: '2024-03-03T19:45:00',
    odds: { home: 2.15, draw: 3.30, away: 3.20 },
    result: 'away',
    score: { home: 1, away: 2 }
  }
];