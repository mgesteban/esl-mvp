import { useState } from 'react';
import { LessonPrompt, LessonLevel } from '../types/lesson';

interface LessonFormProps {
  onSubmit: (prompt: LessonPrompt) => void;
  isLoading: boolean;
}

export function LessonForm({ onSubmit, isLoading }: LessonFormProps) {
  const [formData, setFormData] = useState<LessonPrompt>({
    level: 'intermediate',
    topic: '',
    duration: 60,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-6">
      <h2 className="text-2xl font-bold text-primary-900 flex items-center gap-2">
        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        Create ESL Lesson Plan
      </h2>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-primary-900">
          Level
        </label>
        <select
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: e.target.value as LessonLevel })}
          className="input-base"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-primary-900">
          Topic
        </label>
        <input
          type="text"
          value={formData.topic}
          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
          className="input-base"
          placeholder="e.g., Daily Routines, Travel, Food and Cooking"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-primary-900">
          Duration (minutes)
        </label>
        <input
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
          className="input-base"
          min="30"
          max="120"
          step="15"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Lesson...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Generate Lesson
          </>
        )}
      </button>
    </form>
  );
}
