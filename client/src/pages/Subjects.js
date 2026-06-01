import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

function Subjects() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#6366f1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const { data } = await api.get('/subjects');
      setSubjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/subjects', {
        name, description, color
      });
      setSubjects([...subjects, data]);
      setName('');
      setDescription('');
      setColor('#6366f1');
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/subjects/${id}`);
      setSubjects(subjects.filter(s => s._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">ZEN 🧘</h1>
        <span className="text-gray-600">Hello, {user?.name}!</span>
      </nav>

      <div className="max-w-4xl mx-auto mt-10 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">📚 My Subjects</h2>

        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Subject</h3>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleCreate}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Subject name"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-500"
                required
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (optional)"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 h-12 w-full cursor-pointer"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? 'Adding...' : '+ Add Subject'}
            </button>
          </form>
        </div>

        {subjects.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-xl">No subjects yet!</p>
            <p className="text-sm mt-2">Add your first subject above </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <div
                key={subject._id}
                className="bg-white p-6 rounded-xl shadow-sm border-t-4"
                style={{ borderColor: subject.color }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {subject.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {subject.description || 'No description'}
                </p>
                <button
                  onClick={() => handleDelete(subject._id)}
                  className="text-red-500 text-sm hover:text-red-700 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Subjects;