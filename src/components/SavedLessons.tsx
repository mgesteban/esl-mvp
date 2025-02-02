import { SavedLesson } from '../types/lesson';

interface SavedLessonsProps {
  lessons: SavedLesson[];
  onLoad: (lesson: SavedLesson) => void;
  onDelete: (id: string) => void;
}

export function SavedLessons({ lessons, onLoad, onDelete }: SavedLessonsProps) {
  if (lessons.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Saved Lessons</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-900 font-medium mb-1">No saved lessons yet</p>
          <p className="text-gray-500 text-sm">Generated lessons will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Saved Lessons</h2>
        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
          {lessons.length} lesson{lessons.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="group border border-gray-200 rounded-lg p-4 hover:border-indigo-200 hover:shadow-sm transition-all bg-white"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {lesson.prompt.topic}
                </h3>
                <div className="flex gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {lesson.prompt.level}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {lesson.prompt.duration} mins
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {new Date(lesson.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <div>
                  <button
                    onClick={() => onLoad(lesson)}
                    className="text-indigo-600 hover:text-indigo-800 px-3 py-1.5 mr-2 rounded-md hover:bg-indigo-50 font-medium text-sm"
                  >
                    Load
                  </button>
                  <button
                    onClick={() => onDelete(lesson.id)}
                    className="text-red-600 hover:text-red-800 px-3 py-1.5 rounded-md hover:bg-red-50 font-medium text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 line-clamp-2 group-hover:text-gray-900">
                {lesson.reading.passage.substring(0, 150)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
