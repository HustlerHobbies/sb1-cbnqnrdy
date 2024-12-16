import { Match, HistoricalMatch, TeamStats } from '../types';
import { historicalMatches } from './historicalData';
import { subMonths, differenceInDays } from 'date-fns';
import { analyzeSentiment } from './sentimentAnalysis';

interface FormFactor {
  recent: number;
  overall: number;
  trend: 'improving' | 'declining' | 'stable';
}

interface MatchContext {
  importance: number;
  rivalryFactor: number;
  restDays: number;
  weatherImpact: number;
}

interface PredictionFactors {
  homeForm: FormFactor;
  awayForm: FormFactor;
  h2hDominance: number;
  homeAdvantage: number;
  context: MatchContext;
  odds: {
    impliedProbHome: number;
    impliedProbDraw: number;
    impliedProbAway: number;
  };
}

function calculateFormFactor(team: string, matches: HistoricalMatch[]): FormFactor {
  const recentMatches = matches
    .filter(m => new Date(m.date) > subMonths(new Date(), 3))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const allMatches = matches
    .filter(m => new Date(m.date) > subMonths(new Date(), 12));

  function calculateForm(matchList: HistoricalMatch[]): number {
    if (matchList.length === 0) return 0.5;
    
    return matchList.reduce((acc, match) => {
      const isHome = match.homeTeam === team;
      const result = match.result;
      
      if ((isHome && result === 'home') || (!isHome && result === 'away')) return acc + 3;
      if (result === 'draw') return acc + 1;
      return acc;
    }, 0) / (matchList.length * 3);
  }

  const recent = calculateForm(recentMatches);
  const overall = calculateForm(allMatches);
  
  const trend = recent > overall * 1.1 ? 'improving' 
              : recent < overall * 0.9 ? 'declining'
              : 'stable';

  return { recent, overall, trend };
}

function calculateH2HDominance(team1: string, team2: string, matches: HistoricalMatch[]): number {
  const h2hMatches = matches.filter(m => 
    (m.homeTeam === team1 && m.awayTeam === team2) ||
    (m.homeTeam === team2 && m.awayTeam === team1)
  );

  if (h2hMatches.length === 0) return 0.5;

  const team1Points = h2hMatches.reduce((acc, match) => {
    if (match.homeTeam === team1) {
      if (match.result === 'home') return acc + 3;
      if (match.result === 'draw') return acc + 1;
    } else {
      if (match.result === 'away') return acc + 3;
      if (match.result === 'draw') return acc + 1;
    }
    return acc;
  }, 0);

  return team1Points / (h2hMatches.length * 3);
}

function calculateMatchContext(match: Match): MatchContext {
  const importance = match.tags?.some(tag => 
    ['Derby', 'Title Race', 'Rivalry'].includes(tag)
  ) ? 1.2 : 1;

  const rivalryFactor = match.tags?.includes('Derby') ? 1.3 : 1;
  const restDays = Math.random() * 6 + 2;
  const weatherImpact = Math.random() * 0.4 + 0.8;

  return {
    importance,
    rivalryFactor,
    restDays,
    weatherImpact
  };
}

function calculateImpliedProbabilities(odds: { home: number; draw: number; away: number }) {
  const margin = (1/odds.home + 1/odds.draw + 1/odds.away) - 1;
  const fairOdds = {
    home: odds.home * (1 + margin),
    draw: odds.draw * (1 + margin),
    away: odds.away * (1 + margin)
  };

  return {
    impliedProbHome: 1 / fairOdds.home,
    impliedProbDraw: 1 / fairOdds.draw,
    impliedProbAway: 1 / fairOdds.away
  };
}

async function analyzePredictionFactors(match: Match): Promise<PredictionFactors> {
  const recentMatches = historicalMatches.filter(m => 
    new Date(m.date) > subMonths(new Date(), 12)
  );

  const homeForm = calculateFormFactor(match.homeTeam, recentMatches);
  const awayForm = calculateFormFactor(match.awayTeam, recentMatches);
  const h2hDominance = calculateH2HDominance(match.homeTeam, match.awayTeam, recentMatches);
  const context = calculateMatchContext(match);
  const odds = calculateImpliedProbabilities(match.odds);

  const homeMatches = recentMatches.filter(m => m.homeTeam === match.homeTeam);
  const homeAdvantage = homeMatches.length > 0
    ? homeMatches.reduce((acc, m) => acc + (m.result === 'home' ? 1 : 0), 0) / homeMatches.length
    : 0.5;

  return {
    homeForm,
    awayForm,
    h2hDominance,
    homeAdvantage,
    context,
    odds
  };
}

function normalizeConfidence(value: number): number {
  // Ensure confidence is between 1 and 10
  return Math.min(10, Math.max(1, Math.round(value)));
}

export async function predictMatchResult(match: Match) {
  const factors = await analyzePredictionFactors(match);
  const sentiment = await analyzeSentiment(match);

  // Calculate base probabilities
  let homeProb = factors.homeForm.recent * 0.3 +
                 factors.homeAdvantage * 0.2 +
                 factors.h2hDominance * 0.15 +
                 factors.odds.impliedProbHome * 0.35;

  let awayProb = factors.awayForm.recent * 0.3 +
                 (1 - factors.homeAdvantage) * 0.2 +
                 (1 - factors.h2hDominance) * 0.15 +
                 factors.odds.impliedProbAway * 0.35;

  // Adjust for context
  homeProb *= factors.context.importance * factors.context.weatherImpact;
  awayProb *= factors.context.importance * factors.context.weatherImpact;

  // Normalize probabilities
  const total = homeProb + awayProb;
  homeProb = total > 0 ? homeProb / total : 0.5;
  awayProb = total > 0 ? awayProb / total : 0.5;

  // Calculate draw probability
  const drawProb = Math.max(0, 1 - (homeProb + awayProb));

  // Determine prediction and confidence
  let prediction: 'home' | 'draw' | 'away';
  let baseConfidence: number;

  if (Math.abs(homeProb - awayProb) < 0.1) {
    prediction = 'draw';
    baseConfidence = drawProb * 10;
  } else if (homeProb > awayProb) {
    prediction = 'home';
    baseConfidence = homeProb * 10;
  } else {
    prediction = 'away';
    baseConfidence = awayProb * 10;
  }

  // Adjust confidence based on sentiment and ensure it's valid
  const sentimentConfidence = sentiment.confidence * 10;
  const confidence = normalizeConfidence((baseConfidence + sentimentConfidence) / 2);

  // Generate explanation factors
  const factors_explanation = [
    factors.homeForm.trend === 'improving' ? `${match.homeTeam} showing improving form` : null,
    factors.awayForm.trend === 'improving' ? `${match.awayTeam} showing improving form` : null,
    factors.h2hDominance > 0.6 ? `Strong head-to-head record for ${match.homeTeam}` : null,
    factors.h2hDominance < 0.4 ? `Strong head-to-head record for ${match.awayTeam}` : null,
    factors.homeAdvantage > 0.6 ? 'Significant home advantage factor' : null,
    factors.context.importance > 1 ? 'High-stakes match' : null,
    sentiment.sentiment > 0.3 ? 'Positive public sentiment' : null,
    sentiment.sentiment < -0.3 ? 'Negative public sentiment' : null,
  ].filter(Boolean) as string[];

  return {
    prediction,
    confidence,
    probabilities: {
      home: homeProb,
      draw: drawProb,
      away: awayProb
    },
    factors: factors_explanation,
    sentiment: {
      value: sentiment.sentiment,
      confidence: sentiment.confidence,
      sources: sentiment.sources
    }
  };
}