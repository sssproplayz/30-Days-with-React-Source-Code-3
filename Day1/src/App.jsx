import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={styles.icon}>✦</div>

        <h1 style={styles.title}>Counter</h1>

        <p style={styles.subtitle}>
          A simple React counter
        </p>

        <div style={styles.numberBox}>
          <span style={styles.number}>{count}</span>
        </div>

        <div style={styles.buttons}>

          <button
            style={styles.minusButton}
            onClick={decrease}
          >
            −
          </button>

          <button
            style={styles.resetButton}
            onClick={reset}
          >
            Reset
          </button>

          <button
            style={styles.plusButton}
            onClick={increase}
          >
            +
          </button>

        </div>

        <div style={styles.status}>
          {count === 0
            ? "Ready to count"
            : count > 0
            ? "Count is increasing 🚀"
            : "Count is decreasing 🌙"}
        </div>

        <div style={styles.footer}>
          Built with React ⚛️
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #0f172a, #312e81, #7c3aed)",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    boxSizing: "border-box"
  },

  card: {
    width: "380px",
    padding: "45px 35px",
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.12)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "25px",
    boxShadow: "0 25px 60px rgba(0, 0, 0, 0.35)",
    backdropFilter: "blur(15px)",
    color: "white"
  },

  icon: {
    width: "65px",
    height: "65px",
    margin: "0 auto 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #a78bfa, #ec4899)",
    fontSize: "32px",
    boxShadow: "0 8px 25px rgba(236, 72, 153, 0.4)"
  },

  title: {
    margin: "5px 0",
    fontSize: "42px",
    fontWeight: "700",
    letterSpacing: "1px"
  },

  subtitle: {
    marginTop: "8px",
    marginBottom: "30px",
    color: "#d1d5db",
    fontSize: "15px"
  },

  numberBox: {
    width: "180px",
    height: "140px",
    margin: "0 auto 30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    background: "rgba(0, 0, 0, 0.25)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxShadow: "inset 0 0 30px rgba(0, 0, 0, 0.2)"
  },

  number: {
    fontSize: "70px",
    fontWeight: "bold",
    color: "#ffffff"
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px"
  },

  minusButton: {
    width: "55px",
    height: "55px",
    border: "none",
    borderRadius: "15px",
    background: "#ef4444",
    color: "white",
    fontSize: "30px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 6px 15px rgba(239, 68, 68, 0.35)"
  },

  resetButton: {
    height: "55px",
    padding: "0 25px",
    border: "none",
    borderRadius: "15px",
    background: "#f3f4f6",
    color: "#1f2937",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  plusButton: {
    width: "55px",
    height: "55px",
    border: "none",
    borderRadius: "15px",
    background: "#22c55e",
    color: "white",
    fontSize: "30px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 6px 15px rgba(34, 197, 94, 0.35)"
  },

  status: {
    marginTop: "28px",
    padding: "12px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.08)",
    color: "#e5e7eb",
    fontSize: "14px"
  },

  footer: {
    marginTop: "25px",
    color: "#a5b4fc",
    fontSize: "13px"
  }
};

export default App;