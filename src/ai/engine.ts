import { MockAIProvider } from './providers/MockProvider';
import type { AIProvider, UserProfile } from './types';

const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'mock';

function getProvider(): AIProvider {
  switch (AI_PROVIDER) {
    case 'openai':
      return new MockAIProvider();
    case 'vertex':
      return new MockAIProvider();
    default:
      return new MockAIProvider();
  }
}

export const aiEngine = getProvider();

export async function getRecommendedCourses(user: UserProfile, allCourses: any[]) {
  return await aiEngine.getRecommendations(user, allCourses);
}

export async function generateLearningPath(interests: string[], targetSkills: string[]) {
  return await aiEngine.generateLearningPath(interests, targetSkills);
}

export function adjustDifficulty(userPerformance: any) {
  return aiEngine.adjustDifficulty(userPerformance);
}
