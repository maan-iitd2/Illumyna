export interface UserProfile {
  targetRole: string;
  currentLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  interests: string[];
  weeklyCommitmentHours: number;
  description: string;
  generatedPersona?: string;
}
