import { Match, League } from '../types';
import { SportType } from '../types/sports';

export const leagues: League[] = [
  {
    id: 'premier-league',
    name: 'Premier League',
    country: 'England',
    logo: 'https://example.com/premier-league.png'
  },
  {
    id: 'la-liga',
    name: 'La Liga',
    country: 'Spain',
    logo: 'https://example.com/la-liga.png'
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    country: 'Germany',
    logo: 'https://example.com/bundesliga.png'
  },
  {
    id: 'serie-a',
    name: 'Serie A',
    country: 'Italy',
    logo: 'https://example.com/serie-a.png'
  },
  {
    id: 'ligue-1',
    name: 'Ligue 1',
    country: 'France',
    logo: 'https://example.com/ligue-1.png'
  }
];

export const upcomingMatches: Match[] = [
  {
    id: '1',
    homeTeam: 'Arsenal',
    awayTeam: 'Manchester City',
    league: 'Premier League',
    sport: 'football',
    date: '2024-03-25T19:45:00',
    odds: { home: 2.50, draw: 3.40, away: 2.80 },
    tags: ['Top Match', 'Title Race']
  },
  {
    id: '2',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    league: 'La Liga',
    sport: 'football',
    date: '2024-03-26T20:00:00',
    odds: { home: 2.10, draw: 3.50, away: 3.20 },
    tags: ['El Clásico', 'Derby']
  },
  {
    id: '3',
    homeTeam: 'Golden State Warriors',
    awayTeam: 'Los Angeles Lakers',
    league: 'NBA',
    sport: 'basketball',
    date: '2024-03-27T19:30:00',
    odds: { home: 1.75, draw: 50.0, away: 4.20 },
    tags: ['Western Conference', 'Rivalry']
  },
  {
    id: '4',
    homeTeam: 'Djokovic',
    awayTeam: 'Alcaraz',
    league: 'ATP Tour',
    sport: 'tennis',
    date: '2024-03-28T20:00:00',
    odds: { home: 1.90, draw: 50.0, away: 3.80 },
    tags: ['Grand Slam', 'Quarter Final']
  },
  {
    id: '5',
    homeTeam: 'Mumbai Indians',
    awayTeam: 'Chennai Super Kings',
    league: 'IPL',
    sport: 'cricket',
    date: '2024-03-29T19:45:00',
    odds: { home: 2.70, draw: 4.30, away: 2.50 },
    tags: ['IPL', 'Rivalry']
  },
  {
    id: '6',
    homeTeam: 'Red Bull Racing',
    awayTeam: 'Ferrari',
    league: 'F1 World Championship',
    sport: 'f1',
    date: '2024-03-30T20:00:00',
    odds: { home: 1.65, draw: 50.0, away: 4.80 },
    tags: ['Monaco GP', 'Championship Race']
  },
  {
    id: '7',
    homeTeam: 'McIlroy',
    awayTeam: 'Rahm',
    league: 'PGA Tour',
    sport: 'golf',
    date: '2024-03-31T19:45:00',
    odds: { home: 2.20, draw: 12.30, away: 3.10 },
    tags: ['Masters', 'Final Round']
  },
  {
    id: '8',
    homeTeam: 'Fury',
    awayTeam: 'Usyk',
    league: 'Heavyweight',
    sport: 'boxing',
    date: '2024-04-01T20:00:00',
    odds: { home: 1.95, draw: 15.40, away: 3.90 },
    tags: ['Title Fight', 'Unification']
  }
];