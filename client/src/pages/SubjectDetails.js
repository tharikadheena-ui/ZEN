import { useParams, useNavigate } from 'react-router-dom';

function SubjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">
        Subject Details
      </h1>

      <p className="mt-4">
        Subject ID: {id}
      </p>

      <button
        onClick={() => navigate(`/subjects/${id}/create-quiz`)}
        className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg"
      >
        + Create Quiz
      </button>
    </div>
  );
}

export default SubjectDetails;

