import { SavedLesson } from '../types/lesson';

interface SavedLessonsProps {
  lessons: SavedLesson[];
  onLoad: (lesson: SavedLesson) => void;
  onDelete: (id: string) => void;
}

export function SavedLessons({ lessons, onLoad, onDelete }: SavedLessonsProps) {
  if (lessons.length === 0) {
    return (
      <div className="card text-center py-12">
        <svg className="w-16 h-16 text-primary-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <p className="text-primary-900 font-medium">No saved lessons yet</p>
        <p className="text-primary-600 text-sm mt-1">Generated lessons will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-primary-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          Saved Lessons
        </h2>
        <span className="text-sm text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full font-medium">
          {lessons.length} lesson{lessons.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid gap-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="group card hover:border-primary-200 hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-medium text-primary-900 group-hover:text-primary-700 transition-colors">
                  {lesson.prompt.topic}
                </h3>
                <div className="flex gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {lesson.prompt.level}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {lesson.prompt.duration} mins
                  </span>
                </div>
                <p className="text-sm text-primary-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(lesson.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onLoad(lesson)}
                  className="text-primary-600 hover:text-primary-800 hover:bg-primary-50 p-2 rounded-lg transition-colors"
                  title="Load lesson"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(lesson.id)}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  title="Delete lesson"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 line-clamp-2 group-hover:text-gray-900 transition-colors">
                {lesson.reading.passage.substring(0, 150)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
