import { SportPredictionModel, SportType, Match, SportSpecificStats } from '../../types/sports';
import { footballModel } from './footballModel';
import { basketballModel } from './basketballModel';
import { tennisModel } from './tennisModel';
import { cricketModel } from './cricketModel';

const predictionModels: Record<SportType, SportPredictionModel> = {
  football: footballModel,
  basketball: basketballModel,
  tennis: tennisModel,
  cricket: cricketModel,
  baseball: {
    sport: 'baseball',
    calculateWinProbability: () => 0.5,
    getRelevantFactors: () => [],
    getSportSpecificConfidence: () => 5
  },
  hockey: {
    sport: 'hockey',
    calculateWinProbability: () => 0.5,
    getRelevantFactors: () => [],
    getSportSpecificConfidence: () => 5
  }
};

export function getPredictionModel(sport: SportType): SportPredictionModel {
  return predictionModels[sport];
}

export function predictMatch(match: Match, sport: SportType, stats: SportSpecificStats) {
  const model = getPredictionModel(sport);
  const winProbability = model.calculateWinProbability(match, stats);
  const factors = model.getRelevantFactors(match);
  const confidence = model.getSportSpecificConfidence(match);

  return {
    probability: winProbability,
    factors,
    confidence
  };
}