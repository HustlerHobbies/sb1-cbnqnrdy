export type SportType = 
  | 'football' 
  | 'basketball' 
  | 'tennis' 
  | 'cricket' 
  | 'baseball'
  | 'f1'
  | 'golf'
  | 'boxing'
  | 'cycling'
  | 'mma';

export interface Sport {
  id: SportType;
  name: string;
  icon: string;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  country?: string;
  type: 'league' | 'tournament' | 'cup';
  sport: SportType;
  logo?: string;
}

export interface SportSpecificStats {
  football?: {
    possession: number;
    shots: number;
    shotsOnTarget: number;
    corners: number;
    fouls: number;
  };
  basketball?: {
    pointsPerGame: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
  };
  tennis?: {
    aces: number;
    doubleFaults: number;
    firstServePercentage: number;
    breakPointsConverted: number;
  };
  cricket?: {
    battingAverage: number;
    bowlingAverage: number;
    strikeRate: number;
    economyRate: number;
  };
  f1?: {
    qualifyingPosition: number;
    lastRacePosition: number;
    seasonPoints: number;
    trackHistory: number;
  };
  golf?: {
    strokesGained: number;
    drivingAccuracy: number;
    puttingAverage: number;
    greensInRegulation: number;
  };
  boxing?: {
    knockoutPercentage: number;
    winStreak: number;
    experienceYears: number;
    weightClassRecord: number;
  };
  cycling?: {
    climbingRank: number;
    sprintRank: number;
    endurance: number;
    teamSupport: number;
  };
  mma?: {
    strikeAccuracy: number;
    takedownDefense: number;
    submissionRate: number;
    winStreak: number;
  };
}

export interface SportPredictionModel {
  sport: SportType;
  calculateWinProbability: (match: Match, stats: SportSpecificStats) => number;
  getRelevantFactors: (match: Match) => string[];
  getSportSpecificConfidence: (match: Match) => number;
}