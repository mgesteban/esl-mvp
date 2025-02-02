import { GeneratedLesson } from '../types/lesson';

interface LessonDisplayProps {
  lesson: GeneratedLesson;
  onSave: () => void;
}

export function LessonDisplay({ lesson, onSave }: LessonDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Generated Lesson Plan
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Review and save your generated lesson plan
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onSave}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium shadow-sm transition-colors"
          >
            Save Lesson
          </button>
          <button
            onClick={() => window.print()}
            className="bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium border border-gray-200 shadow-sm transition-colors print:hidden"
          >
            Print
          </button>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Reading Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-base font-semibold text-gray-900">Reading Passage</h3>
          </div>
          <div className="p-6">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{lesson.reading.passage}</p>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-base font-semibold text-gray-900">Comprehension Questions</h3>
          </div>
          <div className="p-6">
            <ol className="list-decimal list-inside space-y-3">
              {lesson.reading.questions.map((question, index) => (
                <li key={index} className="text-gray-700 pl-2">{question}</li>
              ))}
            </ol>
          </div>
        </div>

        {/* Vocabulary Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-base font-semibold text-gray-900">Vocabulary</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {lesson.reading.vocabulary.map((word, index) => (
                <div key={index} className="bg-gray-50 px-4 py-3 rounded-md border border-gray-200">
                  <span className="text-gray-700">{word}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activities Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-base font-semibold text-gray-900">Activities</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {lesson.activities.instructions.map((activity, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <p className="text-gray-700">
                    <span className="font-medium">Activity {index + 1}:</span> {activity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Teacher Notes Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-base font-semibold text-gray-900">Teacher Notes</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Objectives:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {lesson.teacherNotes.objectives.map((objective, index) => (
                    <li key={index} className="text-gray-700">{objective}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Timing:</h4>
                <p className="text-gray-700">Total Duration: {lesson.teacherNotes.timing.total} minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
