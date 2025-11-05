import type { AIProvider, UserProfile, CourseRecommendation, LearningPath } from '../types';

export class MockAIProvider implements AIProvider {
  name = 'Mock AI Provider';

  async getRecommendations(user: UserProfile, allCourses: any[]): Promise<CourseRecommendation[]> {
    const recommendations: CourseRecommendation[] = [];

    for (const course of allCourses) {
      let score = 0.5;

      if (user.interests.some((interest) => course.category?.toLowerCase().includes(interest.toLowerCase()))) {
        score += 0.3;
      }

      if (course.level === user.skillLevel) {
        score += 0.2;
      }

      if (!user.completedCourses.includes(course.id)) {
        score += 0.1;
      } else {
        score -= 0.5;
      }

      recommendations.push({
        courseId: course.id,
        score,
        reason: this.generateReason(course, user),
      });
    }

    return recommendations.sort((a, b) => b.score - a.score).slice(0, 6);
  }

  private generateReason(course: any, user: UserProfile): string {
    const reasons: string[] = [];

    if (user.interests.some((interest) => course.category?.toLowerCase().includes(interest.toLowerCase()))) {
      reasons.push('Matches your interests');
    }

    if (course.level === user.skillLevel) {
      reasons.push('Perfect for your skill level');
    }

    if (!user.completedCourses.includes(course.id)) {
      reasons.push('New content for you');
    }

    return reasons.length > 0 ? reasons.join(', ') : 'Popular course';
  }

  async generateLearningPath(interests: string[], targetSkills: string[]): Promise<LearningPath> {
    const pathId = Math.random().toString(36).substring(7);

    return {
      id: pathId,
      title: `${interests[0] || 'Tech'} Learning Path`,
      description: `A curated path to master ${targetSkills.join(', ')}`,
      courses: [], 
      estimatedHours: Math.floor(Math.random() * 100) + 50,
      skills: targetSkills,
    };
  }

  adjustDifficulty(userPerformance: any): 'easier' | 'same' | 'harder' {
    const { accuracy = 0.7, timeSpent = 100, struggles = 0 } = userPerformance;

    if (accuracy < 0.6 || struggles > 3) {
      return 'easier';
    }

    if (accuracy > 0.85 && timeSpent < 80) {
      return 'harder';
    }

    return 'same';
  }
}
