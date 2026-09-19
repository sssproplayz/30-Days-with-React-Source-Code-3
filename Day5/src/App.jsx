import React, { useState } from "react";

function App() {
  const [celsius, setCelsius] = useState("");

  const fahrenheit =
    celsius === "" ? "" : (Number(celsius) * 9) / 5 + 32;

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <div style={styles.decorations}>
          🎀 ✦ ♡ ✦ 🎀
        </div>

        <h1 style={styles.title}>Temperature Converter</h1>

        <p style={styles.subtitle}>
          ♡ Convert Celsius to Fahrenheit ♡
        </p>

        <div style={styles.inputBox}>
          <span style={styles.label}>🌷 Celsius</span>

          <input
            type="number"
            value={celsius}
            onChange={(e) => setCelsius(e.target.value)}
            placeholder="Enter temperature..."
            style={styles.input}
          />
        </div>

        <div style={styles.resultBox}>
          <p style={styles.resultLabel}>Fahrenheit</p>

          <h2 style={styles.result}>
            {fahrenheit === "" ? "--" : fahrenheit.toFixed(2)}°F
          </h2>
        </div>

        <div style={styles.bottomDecor}>
          ♡ stay cool ♡
        </div>

      </div>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #ffe6f2, #ffd1e6, #fff0f7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px"
  },

  card: {
    width: "380px",
    padding: "40px 35px",
    background: "rgba(255, 255, 255, 0.75)",
    borderRadius: "30px",
    textAlign: "center",
    boxShadow: "0 15px 35px rgba(214, 100, 150, 0.25)",
    border: "3px solid #ffffff"
  },

  decorations: {
    fontSize: "24px",
    marginBottom: "15px"
  },

  title: {
    color: "#d94f91",
    fontSize: "30px",
    marginBottom: "8px"
  },

  subtitle: {
    color: "#a85c7c",
    fontSize: "14px",
    marginBottom: "30px"
  },

  inputBox: {
    background: "#fff4f9",
    padding: "18px",
    borderRadius: "20px",
    marginBottom: "20px",
    border: "2px solid #ffd1e5"
  },

  label: {
    display: "block",
    color: "#c65387",
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "15px"
  },

  input: {
    width: "90%",
    padding: "13px",
    fontSize: "17px",
    borderRadius: "15px",
    border: "2px solid #f3a9c9",
    outline: "none",
    textAlign: "center",
    color: "#9b4770",
    backgroundColor: "#ffffff"
  },

  resultBox: {
    background:
      "linear-gradient(135deg, #ffd6e8, #ffeaf3)",
    padding: "20px",
    borderRadius: "22px",
    marginTop: "10px",
    border: "2px solid #f7b6d2"
  },

  resultLabel: {
    color: "#b44f7c",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0 0 8px 0"
  },

  result: {
    color: "#d33f83",
    fontSize: "32px",
    margin: "0"
  },

  bottomDecor: {
    marginTop: "25px",
    color: "#c85c8a",
    fontSize: "14px",
    fontWeight: "bold"
  }
};

export default App;