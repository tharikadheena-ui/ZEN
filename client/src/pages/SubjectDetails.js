import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/api';

function SubjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
// eslint-disable-next-line react-hooks/exhaustive-deps 
  useEffect(() => {
    fetchQuizzes();
  }, []);
  const fetchQuizzes = async () => {
    try {
      const { data } = await api.get(`/quizzes/${id}`);
      setQuizzes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">

      <h1 className="text-3xl font-bold mb-4">
        Subject Details
      </h1>

      <p className="text-gray-500 mb-6">
        Subject ID: {id}
      </p>

      <button
        onClick={() => navigate(`/subjects/${id}/create-quiz`)}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg mb-10"
      >
        + Create Quiz
      </button>

      <h2 className="text-2xl font-semibold mb-6">
        📚 Available Quizzes
      </h2>

      {loading ? (
        <p>Loading quizzes...</p>
      ) : quizzes.length === 0 ? (
        <p className="text-gray-500">
          No quizzes yet.
        </p>
      ) : (
        <div className="grid gap-4">
          {quizzes.map((quiz) => (
  <div
    key={quiz._id}
    className="bg-white p-5 rounded-xl shadow"
  >
    <h3 className="text-xl font-semibold">
      {quiz.title}
    </h3>

    <p className="text-gray-500 mt-2">
      {quiz.questions.length} Questions
    </p>

    <button
      onClick={() => navigate(`/quiz/${quiz._id}`)}
      className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
    >
      Start Quiz 🚀
    </button>
  </div>
    ))}
        </div>
      )}

    </div>
  );
}

export default SubjectDetails;

