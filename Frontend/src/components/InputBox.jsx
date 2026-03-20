import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function InputBox({ setAnalytics, nextStep }) { // ✅ added nextStep
  const [text, setText] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async () => {
    try {
      // 🔥 Send feedback
      await axios.post("http://127.0.0.1:8000/predict", {
        text,
        suggestion,
        rating
      });

      // 🔥 Get analytics
      const res = await axios.get("http://127.0.0.1:8000/analytics");
      setAnalytics(res.data);

      // 🔥 MOVE TO NEXT PAGE (IMPORTANT)
      nextStep();

      // Clear inputs
      setText("");
      setSuggestion("");
      setRating(0);

    } catch (err) {
      console.error(err);
      alert("Backend error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.card}
    >
      <h3>Give Feedback</h3>

      <textarea
        rows="4"
        placeholder="Enter feedback..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.input}
      />

      <textarea
        rows="2"
        placeholder="Suggestion (optional)..."
        value={suggestion}
        onChange={(e) => setSuggestion(e.target.value)}
        style={styles.input}
      />

      <input
        type="number"
        placeholder="Rating (1-5)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        style={styles.input}
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleSubmit}
        style={styles.button}
      >
        Analyze →
      </motion.button>
    </motion.div>
  );
}

const styles = {
  card: {
    padding: "20px",
    margin: "20px auto",
    width: "400px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    color: "white"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "none",
    outline: "none"
  },
  button: {
    padding: "10px",
    width: "100%",
    borderRadius: "8px",
    background: "#ff7eb3",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};

export default InputBox;