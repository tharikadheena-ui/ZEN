import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">ZEN 🧘</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Hello, {user?.name}!</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto mt-10 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to ZEN! 🎉
        </h2>
        <p className="text-gray-500 mb-8">
          Your AI-powered learning journey starts here.
        </p>

      <div onClick={() => navigate('/subjects')}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition">
             <h3 className="text-lg font-semibold text-gray-800 mb-2">📚 Subjects</h3>
             <p className="text-gray-500 text-sm">Manage your subjects and topics</p>
      </div>  
         <div
          onClick={() => navigate('/analytics')}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition"
>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
           📊 Analytics
          </h3>
            <p className="text-gray-500 text-sm">
               Track your performance over time
               </p>
          </div>
         <div onClick={() => navigate("/ai-insights")}
         className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition"
>        <h3 className="text-lg font-semibold text-gray-800 mb-2">
         🤖 AI Insights
         </h3>
             <p className="text-gray-500 text-sm">
              Get personalized recommendations
             </p>
            </div>
  
          </div>
        </div>
  
  );
}

export default Dashboard;