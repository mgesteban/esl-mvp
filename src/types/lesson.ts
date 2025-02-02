export type LessonLevel = 'beginner' | 'intermediate' | 'advanced';

export interface LessonPrompt {
  level: LessonLevel;
  topic: string;
  duration: number;
}

export interface GeneratedLesson {
  reading: {
    passage: string;
    questions: string[];
    vocabulary: string[];
  };
  activities: {
    instructions: string[];
  };
  teacherNotes: {
    objectives: string[];
    timing: Record<string, number>;
  };
}

export interface SavedLesson extends GeneratedLesson {
  id: string;
  prompt: LessonPrompt;
  createdAt: string;
}
