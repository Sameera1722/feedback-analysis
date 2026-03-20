import { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

import { Pie, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Chart({ data, feedbackList = [], nextStep }) {
  const [chartType, setChartType] = useState("pie");

  const total = data.positive + data.negative + data.neutral || 1;

  const chartData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        label: "Sentiment %",
        data: [
          ((data.positive / total) * 100).toFixed(1),
          ((data.negative / total) * 100).toFixed(1),
          ((data.neutral / total) * 100).toFixed(1)
        ],
        backgroundColor: ["#22c55e", "#ef4444", "#a1a1aa"]
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div style={styles.page}>
      
      {/* 🔥 TOP HEADING */}
      <h2 style={styles.heading}>Analysis</h2>

      {/* 🔥 MAIN CONTENT */}
      <div style={styles.container}>

        {/* LEFT - CHART */}
        <div style={styles.left}>
          <div style={styles.btnGroup}>
            <button onClick={() => setChartType("pie")} style={styles.btn}>Pie</button>
            <button onClick={() => setChartType("bar")} style={styles.btn}>Bar</button>
            <button onClick={() => setChartType("doughnut")} style={styles.btn}>Doughnut</button>
          </div>

          <div style={styles.chartBox}>
            {chartType === "pie" && <Pie data={chartData} options={chartOptions} />}
            {chartType === "bar" && <Bar data={chartData} options={chartOptions} />}
            {chartType === "doughnut" && <Doughnut data={chartData} options={chartOptions} />}
          </div>

          <div style={styles.stats}>
            <p>Positive: {data.positive}</p>
            <p>Negative: {data.negative}</p>
            <p>Neutral: {data.neutral}</p>
          </div>
        </div>

        {/* RIGHT - FEEDBACK LIST */}
        <div style={styles.right}>
          <h3>Feedback List</h3>

          {feedbackList.length === 0 && <p>No feedback yet</p>}

          {feedbackList.map((item, idx) => (
            <div key={idx} style={styles.feedbackItem}>
              <p><strong>Text:</strong> {item.text}</p>
              <p><strong>Sentiment:</strong> {item.sentiment}</p>
              <p><strong>Suggestion:</strong> {item.suggestion || "—"}</p>
              <p><strong>Rating:</strong> {item.rating}</p>

              <button style={styles.deleteBtn}>
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* 🔥 BOTTOM BUTTON */}
      <div style={styles.footer}>
        <button style={styles.nextBtn} onClick={nextStep}>
          Next →
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
    padding: "20px"
  },

  heading: {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "20px"
  },

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "30px",
    flexWrap: "wrap",
    flex: 1
  },

  left: {
    width: "350px",
    textAlign: "center",
    background: "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "15px"
  },

  right: {
    width: "350px",
    maxHeight: "400px",
    overflowY: "auto",
    background: "rgba(255,255,255,0.08)",
    padding: "15px",
    borderRadius: "15px"
  },

  chartBox: {
    width: "250px",
    height: "250px",
    margin: "20px auto"
  },

  btnGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px"
  },

  btn: {
    padding: "8px 14px",
    borderRadius: "20px",
    border: "none",
    background: "#6366f1",
    color: "white",
    cursor: "pointer",
    transition: "0.3s"
  },

  stats: {
    marginTop: "10px"
  },

  feedbackItem: {
    background: "rgba(0,0,0,0.3)",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px"
  },

  deleteBtn: {
    marginTop: "5px",
    background: "#ef4444",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer"
  },

  footer: {
    textAlign: "center",
    marginTop: "20px"
  },

  nextBtn: {
    padding: "12px 25px",
    borderRadius: "25px",
    border: "none",
    background: "#22c55e",
    color: "white",
    cursor: "pointer",
    fontSize: "16px"
  }
};

export default Chart;