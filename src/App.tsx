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
    <div>
      <header className="fixed w-full top-0 z-10 bg-white border-b">
        <div className="container">
          <div className="flex items-center justify-between" style={{ height: '4rem' }}>
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">ESL AI Mentor Lab</h1>
              <span className="badge">AI-Powered</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container" style={{ paddingTop: '6rem', paddingBottom: '3rem' }}>
        {error && (
          <div className={`card mb-6 ${error.includes('success') ? 'bg-success' : 'bg-error'}`} style={{ maxWidth: '42rem', margin: '0 auto' }}>
            <span>{error}</span>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <LessonForm onSubmit={handleGenerateLesson} isLoading={isLoading} />
            
            <div className="mt-8">
              <SavedLessons
                lessons={savedLessons}
                onLoad={handleLoadLesson}
                onDelete={handleDeleteLesson}
              />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {currentLesson && (
              <LessonDisplay
                lesson={currentLesson}
                onSave={handleSaveLesson}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
