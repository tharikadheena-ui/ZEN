import { useParams } from 'react-router-dom';

function QuizPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">
        Quiz Page
      </h1>

      <p className="mt-4">
        Quiz ID: {id}
      </p>
    </div>
  );
}

export default QuizPage;