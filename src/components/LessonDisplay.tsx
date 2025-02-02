import { GeneratedLesson } from '../types/lesson';

interface LessonDisplayProps {
  lesson: GeneratedLesson;
  onSave: () => void;
}

export function LessonDisplay({ lesson, onSave }: LessonDisplayProps) {
  return (
    <div className="card space-y-8">
      <div className="flex justify-between items-center border-b border-primary-100 pb-6">
        <h2 className="text-2xl font-bold text-primary-900 flex items-center gap-2">
          <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Generated Lesson Plan
        </h2>
        <button
          onClick={onSave}
          className="btn-primary flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save Lesson
        </button>
      </div>

      {/* Reading Section */}
      <section className="section-card bg-primary-50 border-primary-100">
        <h3 className="text-xl font-semibold text-primary-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Reading Passage
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">{lesson.reading.passage}</p>
        </div>
      </section>

      {/* Questions Section */}
      <section className="section-card bg-purple-50 border-purple-100">
        <h3 className="text-xl font-semibold text-purple-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Comprehension Questions
        </h3>
        <ol className="list-decimal list-inside space-y-3">
          {lesson.reading.questions.map((question, index) => (
            <li key={index} className="text-gray-700 pl-2">{question}</li>
          ))}
        </ol>
      </section>

      {/* Vocabulary Section */}
      <section className="section-card bg-green-50 border-green-100">
        <h3 className="text-xl font-semibold text-green-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Vocabulary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {lesson.reading.vocabulary.map((word, index) => (
            <div key={index} className="bg-white p-3 rounded-lg shadow-sm border border-green-100">
              <span className="text-gray-700">{word}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Activities Section */}
      <section className="section-card bg-yellow-50 border-yellow-100">
        <h3 className="text-xl font-semibold text-yellow-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Activities
        </h3>
        <div className="space-y-3">
          {lesson.activities.instructions.map((activity, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-yellow-100">
              <p className="text-gray-700">
                <span className="font-medium text-yellow-800">Activity {index + 1}:</span> {activity}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Teacher Notes Section */}
      <section className="section-card bg-red-50 border-red-100">
        <h3 className="text-xl font-semibold text-red-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Teacher Notes
        </h3>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100 space-y-4">
          <div>
            <h4 className="font-medium text-red-900 mb-2">Objectives:</h4>
            <ul className="list-disc list-inside space-y-1">
              {lesson.teacherNotes.objectives.map((objective, index) => (
                <li key={index} className="text-gray-700">{objective}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-red-900 mb-2">Timing:</h4>
            <p className="text-gray-700">Total Duration: {lesson.teacherNotes.timing.total} minutes</p>
          </div>
        </div>
      </section>

      {/* Print Button */}
      <div className="print:hidden flex justify-end">
        <button
          onClick={() => window.print()}
          className="btn-secondary"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Lesson
        </button>
      </div>
    </div>
  );
}
