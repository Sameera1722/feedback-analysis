import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import InputBox from "./components/InputBox";
import Chart from "./components/Chart";

function App() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");

  const [analytics, setAnalytics] = useState({
    positive: 0,
    negative: 0,
    neutral: 0
  });

  // ✅ ADD THIS (IMPORTANT)
  const [feedbackList, setFeedbackList] = useState([]);

  // ✅ FETCH FEEDBACK
  const loadFeedback = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/feedback");
      setFeedbackList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ CALL WHEN PAGE 3
  useEffect(() => {
    if (step === 3) {
      loadFeedback();
    }
  }, [step]);

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <div style={styles.container}>
      <AnimatePresence mode="wait">

        {/* 🔹 PAGE 1 */}
        {step === 1 && (
          <motion.div
            key="page1"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={styles.card}
          >
            <h2>Enter Your Name</h2>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              style={styles.input}
            />

            <button
              onClick={() => {
                if (name.trim() === "") {
                  alert("Please enter your name");
                  return;
                }
                setStep(2);
              }}
              style={styles.button}
            >
              Next →
            </button>
          </motion.div>
        )}

        {/* 🔹 PAGE 2 */}
        {step === 2 && (
          <motion.div
            key="page2"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={styles.card}
          >
            <h2>Welcome {name} 👋</h2>

            <InputBox
              setAnalytics={setAnalytics}
              nextStep={() => setStep(3)}
            />
          </motion.div>
        )}

        {/* 🔹 PAGE 3 (FULL SCREEN LAYOUT) */}
        {step === 3 && (
          <motion.div
            key="page3"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Chart
              data={analytics}
              feedbackList={feedbackList}
              nextStep={() => setStep(4)}
            />
          </motion.div>
        )}

        {/* 🔹 PAGE 4 */}
        {step === 4 && (
          <motion.div
            key="page4"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={styles.card}
          >
            <h1>Thank You {name} .</h1>
            <p>Your feedback helps us improve!</p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e1b4b, #312e81)",
    fontFamily: "Poppins, sans-serif",
    color: "white"
  },
  card: {
    width: "420px",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "15px 0",
    borderRadius: "10px",
    border: "none",
    outline: "none"
  },
  button: {
    padding: "10px 20px",
    borderRadius: "10px",
    background: "#8b5cf6",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};

export default App;