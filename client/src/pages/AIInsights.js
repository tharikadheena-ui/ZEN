import React, { useEffect, useState } from "react";
import axios from "axios";

function AIInsights() {

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {

    const fetchInsights = async () => {

      try {

        const user =
          JSON.parse(localStorage.getItem("user"));

        const res = await axios.get(
          `http://localhost:5000/api/analytics/${user._id}`
        );

        setAnalytics(res.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchInsights();

  }, []);

  if (!analytics) {
    return <h2>🤖 Analyzing your performance...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>

      <h1>🤖 AI Insights</h1>

      <h2>
        🏆 Level:
        {analytics.insights.level}
      </h2>

      <p>
        {analytics.insights.summary}
      </p>

      <p>
        💡 {analytics.insights.recommendation}
      </p>

      <p>
        🚀 {analytics.insights.motivation}
      </p>

    </div>
  );
}

export default AIInsights;