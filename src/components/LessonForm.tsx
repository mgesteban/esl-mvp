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
    <form onSubmit={handleSubmit} className="card">
      <div className="flex justify-between mb-6">
        <h2>Generate New Lesson</h2>
        <span className="text-light">All fields required</span>
      </div>
      
      <div className="space-y-6">
        <div>
          <label>Level</label>
          <select
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value as LessonLevel })}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label>Topic</label>
          <input
            type="text"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            placeholder="e.g., Daily Routines, Travel, Food and Cooking"
            required
          />
        </div>

        <div>
          <label>Duration (minutes)</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            min="30"
            max="120"
            step="15"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
          style={{ width: '100%' }}
        >
          {isLoading ? 'Generating Lesson...' : 'Generate Lesson'}
        </button>
      </div>
    </form>
  );
}
