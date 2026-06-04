import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/api';

function QuizPage() {
  const { id } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const { data } = await api.get(`/quizzes/single/${id}`);
      setQuiz(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        Loading Quiz...
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="p-10">
        Quiz not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">

      <h1 className="text-3xl font-bold mb-8">
        {quiz.title}
      </h1>

      <div className="space-y-6">

        {quiz.questions.map((question, index) => (
          <div
            key={question._id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h2 className="font-semibold text-lg mb-4">
              Question {index + 1}
            </h2>

            <p className="mb-4">
              {question.question}
            </p>

            <div className="space-y-2">
              {question.options.map((option, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-3"
                >
                  {option}
                </div>
              ))}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default QuizPage;