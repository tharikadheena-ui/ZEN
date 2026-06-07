import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/api';

function QuizPage() {
  const { id } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

 useEffect(() => {
  fetchQuiz();
}, []);

const handleSubmit = () => {
  let correct = 0;

  quiz.questions.forEach((question, index) => {
    if (selectedAnswers[index] === question.answer) {
      correct++;
    }
  });

  setScore(correct);
};

  const fetchQuiz = async () => {
    try {
      const { data } = await api.get(`/quizzes/single/${id}`);
      console.log(data);
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
              <button
                key={i}
                onClick={() =>
                  setSelectedAnswers({
                    ...selectedAnswers,
                    [index]: option
                  })
                }
                className={`w-full text-left border rounded-lg p-3 transition ${
                  selectedAnswers[index] === option
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

        </div>
      ))}
      <button
  onClick={handleSubmit}
  className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
>
  Submit Quiz ✅
</button>
{score !== null && (
  <div className="mt-6 bg-white p-6 rounded-xl shadow">
    <h2 className="text-2xl font-bold">
      Score: {score} / {quiz.questions.length}
    </h2>
  </div>
)}


    </div>

  </div>
);
    
  
}

export default QuizPage;