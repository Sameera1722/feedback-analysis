import { useEffect, useState } from "react";
import axios from "axios";

function FeedbackList() {
  const [feedback, setFeedback] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/feedback");
      setFeedback(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/feedback/${index}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Feedback List</h3>

      {feedback.length === 0 ? (
        <p>No feedback yet</p>
      ) : (
        feedback.map((item, index) => (
          <div
            key={index}
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "10px"
            }}
          >
            <p><b>Text:</b> {item.text}</p>
            <p><b>Sentiment:</b> {item.sentiment}</p>
            <p><b>Suggestion:</b> {item.suggestion}</p>
            <p><b>Rating:</b> {item.rating}</p>

            <button onClick={() => handleDelete(index)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default FeedbackList;