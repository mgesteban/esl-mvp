import { GeneratedLesson, LessonPrompt, SavedLesson } from '../types/lesson';

const STORAGE_KEY = 'esl_lessons';

export class StorageService {
  private getStoredLessons(): SavedLesson[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing stored lessons:', error);
      return [];
    }
  }

  private saveToStorage(lessons: SavedLesson[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lessons));
  }

  saveLesson(lesson: GeneratedLesson, prompt: LessonPrompt): SavedLesson {
    const lessons = this.getStoredLessons();
    
    const newLesson: SavedLesson = {
      id: crypto.randomUUID(),
      prompt,
      ...lesson,
      createdAt: new Date().toISOString()
    };

    lessons.push(newLesson);
    this.saveToStorage(lessons);
    
    return newLesson;
  }

  getLessons(): SavedLesson[] {
    return this.getStoredLessons();
  }

  getLesson(id: string): SavedLesson | undefined {
    return this.getStoredLessons().find(lesson => lesson.id === id);
  }

  deleteLesson(id: string): void {
    const lessons = this.getStoredLessons();
    const filtered = lessons.filter(lesson => lesson.id !== id);
    this.saveToStorage(filtered);
  }

  clearLessons(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
