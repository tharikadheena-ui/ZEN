import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

function CreateQuiz() {
  const { id: subjectId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // temp question state
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');

  const addQuestion = () => {
    if (!question || options.some(opt => !opt) || !answer) return;

    const newQuestion = {
      question,
      options,
      answer
    };

    setQuestions([...questions, newQuestion]);

    // reset
    setQuestion('');
    setOptions(['', '', '', '']);
    setAnswer('');
  };

  const handleSubmit = async () => {
    if (!title || questions.length === 0) return;

    setLoading(true);

    try {
      await api.post('/quizzes', {
        title,
        subject: subjectId,
        questions
      });

      alert("Quiz created successfully 🚀");
      navigate(`/subjects/${subjectId}`);
    } catch (err) {
      console.error(err);
      alert("Error creating quiz 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-50">

      <h1 className="text-3xl font-bold mb-6">
        Create Quiz
      </h1>

      {/* Quiz Title */}
      <input
        className="border p-3 w-full mb-4 rounded"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Question */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        {options.map((opt, index) => (
          <input
            key={index}
            className="border p-2 w-full mb-2"
            placeholder={`Option ${index + 1}`}
            value={opt}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
          />
        ))}

        <input
          className="border p-2 w-full mb-2"
          placeholder="Correct Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <button
          onClick={addQuestion}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Question
        </button>
      </div>

      {/* Preview */}
      <div className="mb-4">
        <h2 className="font-bold mb-2">
          Questions Added: {questions.length}
        </h2>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-indigo-600 text-white px-6 py-3 rounded"
      >
        {loading ? "Saving..." : "Save Quiz"}
      </button>

    </div>
  );
}

export default CreateQuiz;