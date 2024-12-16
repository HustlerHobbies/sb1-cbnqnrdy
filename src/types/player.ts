export interface PlayerStats {
  id: string;
  name: string;
  team: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  form: number; // 0-10 rating based on recent performances
  fitness: number; // 0-100%
  goals: number;
  assists: number;
  cleanSheets: number;
  minutesPlayed: number;
  yellowCards: number;
  redCards: number;
  xG?: number; // Expected goals
  xA?: number; // Expected assists
  passAccuracy?: number;
  keyPasses?: number;
  interceptions?: number;
  tackles?: number;
  saves?: number; // For goalkeepers
  historicalPerformance?: {
    vsOpponent: number; // Rating against specific opponent
    inCompetition: number; // Rating in current competition
  };
}

export interface TeamPlayerStats {
  team: string;
  players: PlayerStats[];
  averageForm: number;
  fitnessIndex: number;
  keyPlayersAvailable: boolean;
  formation: string;
}