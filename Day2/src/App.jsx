import React, { useState } from "react";

function App() {
  const [number, setNumber] = useState(0);

  const generateNumber = () => {
    setNumber(Math.floor(Math.random() * 100) + 1);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={styles.sparkle}>✦</div>

        <p style={styles.subtitle}>♡ A LITTLE NUMBER MAGIC ♡</p>

        <h1 style={styles.title}>
          Random Number
          <br />
          Generator 🎀
        </h1>

        <p style={styles.description}>
          Feeling lucky? Generate a number between 1 and 100!
        </p>

        <div style={styles.numberBox}>
          <span style={styles.number}>{number}</span>
        </div>

        <button
          style={styles.button}
          onClick={generateNumber}
        >
          Generate Number ♡
        </button>

        <p style={styles.footer}>
          made with ♡ & a little randomness
        </p>

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
      "linear-gradient(135deg, #ffe6f2, #fff5fa, #ffd6e8)",
    fontFamily: "'Trebuchet MS', Arial, sans-serif",
    padding: "20px",
    boxSizing: "border-box"
  },

  card: {
    width: "420px",
    padding: "45px 35px",
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.8)",
    border: "3px solid #f7a8c8",
    borderRadius: "30px",
    boxShadow:
      "0 15px 35px rgba(214, 105, 151, 0.2)",
    position: "relative",
    boxSizing: "border-box"
  },

  sparkle: {
    fontSize: "28px",
    color: "#e889b0",
    marginBottom: "5px"
  },

  subtitle: {
    fontSize: "12px",
    letterSpacing: "3px",
    color: "#c65d8b",
    fontWeight: "bold",
    marginBottom: "12px"
  },

  title: {
    color: "#b83268",
    fontSize: "38px",
    lineHeight: "1.15",
    margin: "10px 0 15px",
    fontFamily: "Georgia, serif",
    fontWeight: "bold"
  },

  description: {
    color: "#8f6275",
    fontSize: "15px",
    lineHeight: "1.5",
    margin: "0 auto 25px",
    maxWidth: "300px"
  },

  numberBox: {
    width: "170px",
    height: "170px",
    margin: "0 auto 28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(145deg, #fff0f7, #ffd4e7)",
    border: "4px solid #f19abc",
    borderRadius: "50%",
    boxShadow:
      "inset 0 0 20px rgba(255, 255, 255, 0.9), 0 8px 20px rgba(214, 105, 151, 0.15)"
  },

  number: {
    fontSize: "65px",
    fontWeight: "bold",
    color: "#c83f76",
    fontFamily: "Georgia, serif"
  },

  button: {
    border: "none",
    borderRadius: "30px",
    padding: "14px 30px",
    fontSize: "17px",
    fontWeight: "bold",
    color: "white",
    background:
      "linear-gradient(135deg, #e889b0, #c94f82)",
    cursor: "pointer",
    boxShadow:
      "0 7px 15px rgba(201, 79, 130, 0.3)",
    transition: "transform 0.2s"
  },

  footer: {
    marginTop: "25px",
    marginBottom: "0",
    fontSize: "12px",
    color: "#c27a98",
    fontStyle: "italic"
  }
};

export default App;