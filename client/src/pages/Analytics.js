import { useEffect, useState } from 'react';
import axios from 'axios';

function Analytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
       const user = JSON.parse(localStorage.getItem('user'));
       const userId = user?._id;
       console.log("User ID:", userId);
       console.log(userId);
       const res = await axios.get(
          `http://localhost:5000/api/results/analytics/${userId}`
        );
        console.log(res.data);
        setAnalytics(res.data);
      } catch (err) {
        console.error("Analytics Error:", err.response?.data || err.message);
      }
    };

    fetchAnalytics();
  }, []);

  if (!analytics) {
    return <div className="p-8">Loading analytics...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        📊 Analytics Dashboard
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <p>Total Quizzes: {analytics.totalQuizzes}</p>
        <p>Average Score: {analytics.averageScore}</p>
        <p>Accuracy: {analytics.accuracy}%</p>
      </div>
    </div>
  );
}

export default Analytics;