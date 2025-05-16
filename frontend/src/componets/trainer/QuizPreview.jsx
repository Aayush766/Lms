import React from 'react';
import { useParams } from 'react-router-dom';
import { getQuizDataBySessionId } from '../../utils/quizData'; // Assume you fetch from static or API
import { Link } from 'react-router-dom'; // Import Link for navigation

const QuizPreview = () => {
  const { sessionId } = useParams();
  const questions = getQuizDataBySessionId(sessionId);

  if (!questions || questions.length === 0) {
    return <p className="p-4 text-red-600">No quiz data found for this session.</p>;
  }

  return (
    <div className="relative max-w-4xl mx-auto px-6 py-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-purple-700 dark:text-purple-400">Quiz Preview</h2>
      {questions.map((q, index) => (
        <div key={q.id} className="mb-6">
          <p className="font-semibold">{index + 1}. {q.question}</p>
          {q.options.map((opt, idx) => (
            <p
              key={idx}
              className={`ml-4 ${q.answer === opt ? 'text-green-600 font-medium' : ''}`}
            >
              - {opt}
            </p>
          ))}
        </div>
      ))}

      {/* Edit Quiz Button */}
      <Link
        to={`/edit-quiz/${sessionId}`}  // Assuming there's an edit page for this session
        className="absolute bottom-6 right-6 px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Edit Quiz
      </Link>
    </div>
  );
};

export default QuizPreview;
