export interface UserProfile {
  uid: string;
  interests: string[];
  progress: Record<string, CourseProgress>;
  completedCourses: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
}

export interface CourseProgress {
  completed: boolean;
  percent: number;
  lastViewedAt: Date;
}

export interface CourseRecommendation {
  courseId: string;
  score: number;
  reason: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: string[];
  estimatedHours: number;
  skills: string[];
}

export interface AIProvider {
  name: string;
  getRecommendations(user: UserProfile, allCourses: any[]): Promise<CourseRecommendation[]>;
  generateLearningPath(interests: string[], targetSkills: string[]): Promise<LearningPath>;
  adjustDifficulty(userPerformance: any): 'easier' | 'same' | 'harder';
}
