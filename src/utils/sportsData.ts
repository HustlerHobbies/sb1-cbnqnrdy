import { Sport, SportType } from '../types/sports';
import { 
  Activity,
  CircleDot,
  Trophy,
  Flag,
  Target,
  Swords,
  Bike,
  Dumbbell,
  Dribbble,
  CircleDashed
} from 'lucide-react';

export const sports: Sport[] = [
  {
    id: 'football',
    name: 'Football',
    icon: 'Dribbble',
    categories: [
      {
        id: 'premier-league',
        name: 'Premier League',
        country: 'England',
        type: 'league',
        sport: 'football'
      },
      {
        id: 'la-liga',
        name: 'La Liga',
        country: 'Spain',
        type: 'league',
        sport: 'football'
      },
      {
        id: 'bundesliga',
        name: 'Bundesliga',
        country: 'Germany',
        type: 'league',
        sport: 'football'
      },
      {
        id: 'serie-a',
        name: 'Serie A',
        country: 'Italy',
        type: 'league',
        sport: 'football'
      }
    ]
  },
  {
    id: 'basketball',
    name: 'Basketball',
    icon: 'CircleDot',
    categories: [
      {
        id: 'nba',
        name: 'NBA',
        country: 'USA',
        type: 'league',
        sport: 'basketball'
      },
      {
        id: 'euroleague',
        name: 'EuroLeague',
        type: 'league',
        sport: 'basketball'
      },
      {
        id: 'ncaa',
        name: 'NCAA',
        country: 'USA',
        type: 'league',
        sport: 'basketball'
      }
    ]
  },
  {
    id: 'tennis',
    name: 'Tennis',
    icon: 'CircleDashed',
    categories: [
      {
        id: 'grand-slams',
        name: 'Grand Slams',
        type: 'tournament',
        sport: 'tennis'
      },
      {
        id: 'atp-tour',
        name: 'ATP Tour',
        type: 'tournament',
        sport: 'tennis'
      },
      {
        id: 'wta-tour',
        name: 'WTA Tour',
        type: 'tournament',
        sport: 'tennis'
      }
    ]
  },
  {
    id: 'cricket',
    name: 'Cricket',
    icon: 'Trophy',
    categories: [
      {
        id: 'ipl',
        name: 'Indian Premier League',
        country: 'India',
        type: 'league',
        sport: 'cricket'
      },
      {
        id: 'big-bash',
        name: 'Big Bash League',
        country: 'Australia',
        type: 'league',
        sport: 'cricket'
      },
      {
        id: 'world-cup',
        name: 'World Cup',
        type: 'tournament',
        sport: 'cricket'
      }
    ]
  },
  {
    id: 'baseball',
    name: 'Baseball',
    icon: 'Activity',
    categories: [
      {
        id: 'mlb',
        name: 'MLB',
        country: 'USA',
        type: 'league',
        sport: 'baseball'
      },
      {
        id: 'npb',
        name: 'Nippon League',
        country: 'Japan',
        type: 'league',
        sport: 'baseball'
      }
    ]
  },
  {
    id: 'f1',
    name: 'Formula 1',
    icon: 'Flag',
    categories: [
      {
        id: 'f1-world-championship',
        name: 'F1 World Championship',
        type: 'tournament',
        sport: 'f1'
      },
      {
        id: 'f1-sprint',
        name: 'Sprint Races',
        type: 'tournament',
        sport: 'f1'
      }
    ]
  },
  {
    id: 'golf',
    name: 'Golf',
    icon: 'Target',
    categories: [
      {
        id: 'pga-tour',
        name: 'PGA Tour',
        country: 'USA',
        type: 'tournament',
        sport: 'golf'
      },
      {
        id: 'european-tour',
        name: 'European Tour',
        type: 'tournament',
        sport: 'golf'
      },
      {
        id: 'majors',
        name: 'Major Championships',
        type: 'tournament',
        sport: 'golf'
      }
    ]
  },
  {
    id: 'boxing',
    name: 'Boxing',
    icon: 'Swords',
    categories: [
      {
        id: 'heavyweight',
        name: 'Heavyweight',
        type: 'tournament',
        sport: 'boxing'
      },
      {
        id: 'middleweight',
        name: 'Middleweight',
        type: 'tournament',
        sport: 'boxing'
      },
      {
        id: 'lightweight',
        name: 'Lightweight',
        type: 'tournament',
        sport: 'boxing'
      }
    ]
  },
  {
    id: 'cycling',
    name: 'Cycling',
    icon: 'Bike',
    categories: [
      {
        id: 'tour-de-france',
        name: 'Tour de France',
        country: 'France',
        type: 'tournament',
        sport: 'cycling'
      },
      {
        id: 'giro',
        name: 'Giro d\'Italia',
        country: 'Italy',
        type: 'tournament',
        sport: 'cycling'
      },
      {
        id: 'vuelta',
        name: 'La Vuelta',
        country: 'Spain',
        type: 'tournament',
        sport: 'cycling'
      }
    ]
  },
  {
    id: 'mma',
    name: 'MMA',
    icon: 'Dumbbell',
    categories: [
      {
        id: 'ufc',
        name: 'UFC',
        type: 'league',
        sport: 'mma'
      },
      {
        id: 'bellator',
        name: 'Bellator',
        type: 'league',
        sport: 'mma'
      },
      {
        id: 'one-championship',
        name: 'ONE Championship',
        type: 'league',
        sport: 'mma'
      }
    ]
  }
];

export function getSportIcon(sportId: SportType) {
  switch (sportId) {
    case 'football':
      return Dribbble;
    case 'basketball':
      return CircleDot;
    case 'tennis':
      return CircleDashed;
    case 'cricket':
      return Trophy;
    case 'baseball':
      return Activity;
    case 'f1':
      return Flag;
    case 'golf':
      return Target;
    case 'boxing':
      return Swords;
    case 'cycling':
      return Bike;
    case 'mma':
      return Dumbbell;
    default:
      return Activity;
  }
}