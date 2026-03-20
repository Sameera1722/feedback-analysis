import { useState } from "react";
import { getAnalytics } from "../services/api";

function Analytics() {
  const [data, setData] = useState(null);

  const loadAnalytics = async () => {
    try {
      const res = await getAnalytics();
      setData(res); // ✅ no .data
    } catch (err) {
      console.error(err);
      alert("Failed to load analytics");
    }
  };

  return (
    <div>
      <br />
      <button onClick={loadAnalytics}>Load Analytics</button>

      {data && (
        <div>
          <h2>Analytics</h2>
          <p>Positive: {data.positive}</p>
          <p>Negative: {data.negative}</p>
          <p>Neutral: {data.neutral}</p>
        </div>
      )}
    </div>
  );
}

export default Analytics;

