import { useState } from "react";

function Login({ setUser }) {
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (name.trim() !== "") {
      setUser(name);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>

        <input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          Enter
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)"
  },
  card: {
    padding: "30px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(10px)",
    textAlign: "center"
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    width: "200px",
    borderRadius: "8px",
    border: "none"
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

export default Login;