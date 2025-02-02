import { useState } from 'react';
import { OpenAIService } from './services/openai';
import { StorageService } from './services/storage';
import { LessonForm } from './components/LessonForm';
import { LessonDisplay } from './components/LessonDisplay';
import { SavedLessons } from './components/SavedLessons';
import { GeneratedLesson, LessonPrompt, SavedLesson } from './types/lesson';

// Initialize services
const storage = new StorageService();
const openai = new OpenAIService(import.meta.env.VITE_OPENAI_API_KEY);

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLesson, setCurrentLesson] = useState<GeneratedLesson | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<LessonPrompt | null>(null);
  const [savedLessons, setSavedLessons] = useState<SavedLesson[]>(storage.getLessons());

  const handleGenerateLesson = async (prompt: LessonPrompt) => {
    setIsLoading(true);
    setError(null);
    setCurrentPrompt(prompt);

    try {
      const lesson = await openai.generateLesson(prompt);
      setCurrentLesson(lesson);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate lesson');
      setCurrentLesson(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveLesson = () => {
    if (currentLesson && currentPrompt) {
      const savedLesson = storage.saveLesson(currentLesson, currentPrompt);
      setSavedLessons(storage.getLessons());
      setError('Lesson saved successfully!');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleLoadLesson = (lesson: SavedLesson) => {
    setCurrentLesson(lesson);
    setCurrentPrompt(lesson.prompt);
    setError(null);
  };

  const handleDeleteLesson = (id: string) => {
    storage.deleteLesson(id);
    setSavedLessons(storage.getLessons());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary-900 mb-3 font-serif">
            ESL Lesson Planner
          </h1>
          <p className="text-lg text-primary-700">
            Generate professional ESL lesson plans with AI assistance
          </p>
        </header>

        {error && (
          <div
            className={`max-w-2xl mx-auto mb-8 p-4 rounded-lg shadow-sm border ${
              error.includes('success')
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-red-50 text-red-700 border-red-200'
            } flex items-center justify-between`}
          >
            <div className="flex items-center gap-2">
              <svg
                className={`w-5 h-5 ${
                  error.includes('success') ? 'text-green-500' : 'text-red-500'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {error.includes('success') ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                )}
              </svg>
              <span className="font-medium">{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            <LessonForm onSubmit={handleGenerateLesson} isLoading={isLoading} />
            
            <div className="mt-8">
              <SavedLessons
                lessons={savedLessons}
                onLoad={handleLoadLesson}
                onDelete={handleDeleteLesson}
              />
            </div>
          </div>

          <div className="lg:sticky lg:top-8">
            {currentLesson && (
              <LessonDisplay
                lesson={currentLesson}
                onSave={handleSaveLesson}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
