import { motion } from "framer-motion";

function Result({ result }) {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ marginTop: "20px" }}
    >
      <h2>Sentiment: {result}</h2>
    </motion.div>
  );
}

export default Result;