import React, { useState } from "react";

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const calculateBMI = () => {
    if (!weight || !height) {
      setMessage("♡ Please enter your weight and height ♡");
      setBmi(null);
      setCategory("");
      return;
    }

    const meters = Number(height) / 100;
    const result = Number(weight) / (meters * meters);

    const roundedBMI = result.toFixed(2);
    setBmi(roundedBMI);

    if (result < 18.5) {
      setCategory("Underweight");
      setMessage("♡ Take care of yourself and nourish your body ♡");
    } else if (result < 25) {
      setCategory("Normal weight");
      setMessage("♡ Keep taking care of your lovely self ♡");
    } else if (result < 30) {
      setCategory("Overweight");
      setMessage("♡ Little habits can make a difference ♡");
    } else {
      setCategory("Obesity");
      setMessage("♡ Your health deserves some extra love ♡");
    }
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setCategory("");
    setMessage("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.decorTop}>🎀 ♡ ✦ ♡ 🎀</div>

      <div style={styles.card}>
        <div style={styles.sparkle}>✦</div>

        <p style={styles.subtitle}>♡ YOUR LITTLE HEALTH CHECK ♡</p>

        <h1 style={styles.title}>BMI Calculator</h1>

        <p style={styles.description}>
          Enter your details below and let the tiny calculator do the math ♡
        </p>

        <div style={styles.inputGroup}>
          <label style={styles.label}>♡ Weight</label>

          <div style={styles.inputWrapper}>
            <span style={styles.icon}>⚖️</span>

            <input
              type="number"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              style={styles.input}
            />

            <span style={styles.unit}>kg</span>
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>♡ Height</label>

          <div style={styles.inputWrapper}>
            <span style={styles.icon}>📏</span>

            <input
              type="number"
              placeholder="Enter height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              style={styles.input}
            />

            <span style={styles.unit}>cm</span>
          </div>
        </div>

        <button onClick={calculateBMI} style={styles.button}>
          Calculate My BMI ♡
        </button>

        <button onClick={reset} style={styles.resetButton}>
          Reset ✦
        </button>

        {bmi && (
          <div style={styles.resultBox}>
            <p style={styles.resultTitle}>♡ YOUR RESULT ♡</p>

            <div style={styles.bmiCircle}>
              <span style={styles.bmiLabel}>BMI</span>
              <span style={styles.bmiNumber}>{bmi}</span>
            </div>

            <h2 style={styles.category}>{category}</h2>

            <p style={styles.message}>{message}</p>
          </div>
        )}

        {!bmi && message && (
          <p style={styles.error}>{message}</p>
        )}

        <div style={styles.infoBox}>
          <p style={styles.infoTitle}>🎀 BMI Ranges</p>

          <p style={styles.infoText}>
            Underweight: Below 18.5
          </p>

          <p style={styles.infoText}>
            Normal: 18.5 – 24.9
          </p>

          <p style={styles.infoText}>
            Overweight: 25 – 29.9
          </p>

          <p style={styles.infoText}>
            Obesity: 30 or above
          </p>
        </div>

        <p style={styles.footer}>
          made with ♡ & tiny calculations
        </p>
      </div>

      <div style={styles.decorBottom}>♡ ✦ 🎀 ✦ ♡</div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #ffe6f2, #fff0f7, #fce4ec)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Trebuchet MS', Arial, sans-serif",
    padding: "30px 15px",
    boxSizing: "border-box"
  },

  decorTop: {
    fontSize: "25px",
    marginBottom: "12px",
    color: "#d94f87",
    letterSpacing: "5px"
  },

  decorBottom: {
    fontSize: "22px",
    marginTop: "15px",
    color: "#d94f87",
    letterSpacing: "4px"
  },

  card: {
    width: "100%",
    maxWidth: "450px",
    background: "rgba(255, 255, 255, 0.88)",
    borderRadius: "30px",
    padding: "35px",
    boxSizing: "border-box",
    textAlign: "center",
    boxShadow: "0 15px 40px rgba(210, 80, 130, 0.18)",
    border: "2px solid #ffd1e3",
    position: "relative"
  },

  sparkle: {
    position: "absolute",
    top: "18px",
    right: "25px",
    fontSize: "22px",
    color: "#e889ae"
  },

  subtitle: {
    fontSize: "12px",
    color: "#c95b87",
    fontWeight: "bold",
    letterSpacing: "2px",
    marginBottom: "8px"
  },

  title: {
    margin: "5px 0",
    fontSize: "34px",
    color: "#c44578",
    fontWeight: "bold"
  },

  description: {
    color: "#8f6677",
    fontSize: "14px",
    lineHeight: "1.6",
    marginBottom: "25px"
  },

  inputGroup: {
    textAlign: "left",
    marginBottom: "17px"
  },

  label: {
    display: "block",
    color: "#b94d7c",
    fontWeight: "bold",
    fontSize: "14px",
    marginBottom: "7px"
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    background: "#fff7fb",
    border: "2px solid #f5bfd5",
    borderRadius: "17px",
    padding: "4px 12px",
    transition: "0.2s"
  },

  icon: {
    fontSize: "17px",
    marginRight: "8px"
  },

  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    padding: "12px 5px",
    fontSize: "15px",
    color: "#704052",
    fontFamily: "inherit"
  },

  unit: {
    color: "#c45a84",
    fontWeight: "bold",
    fontSize: "13px"
  },

  button: {
    width: "100%",
    border: "none",
    borderRadius: "18px",
    padding: "14px",
    marginTop: "8px",
    background: "linear-gradient(135deg, #f38ab4, #d95d8c)",
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    fontFamily: "inherit",
    cursor: "pointer",
    boxShadow: "0 7px 15px rgba(217, 93, 140, 0.25)"
  },

  resetButton: {
    border: "none",
    background: "transparent",
    color: "#bd6385",
    marginTop: "12px",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "13px",
    textDecoration: "underline"
  },

  resultBox: {
    marginTop: "25px",
    padding: "22px",
    background: "linear-gradient(145deg, #fff0f7, #ffe5f0)",
    borderRadius: "24px",
    border: "2px dashed #efa8c5"
  },

  resultTitle: {
    margin: "0 0 15px",
    color: "#c34e7d",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "2px"
  },

  bmiCircle: {
    width: "125px",
    height: "125px",
    margin: "0 auto",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f58db6, #e16c9a)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    boxShadow: "0 8px 20px rgba(215, 91, 137, 0.25)"
  },

  bmiLabel: {
    fontSize: "13px",
    fontWeight: "bold",
    letterSpacing: "1px"
  },

  bmiNumber: {
    fontSize: "32px",
    fontWeight: "bold",
    marginTop: "2px"
  },

  category: {
    color: "#bd4f7d",
    margin: "15px 0 5px",
    fontSize: "22px"
  },

  message: {
    color: "#805769",
    fontSize: "13px",
    lineHeight: "1.5",
    margin: "5px 0"
  },

  error: {
    color: "#c34f78",
    background: "#fff0f5",
    padding: "10px",
    borderRadius: "12px",
    fontSize: "13px",
    marginTop: "18px"
  },

  infoBox: {
    marginTop: "25px",
    padding: "15px",
    background: "#fff8fb",
    borderRadius: "18px",
    border: "1px solid #f5cede"
  },

  infoTitle: {
    color: "#bd527e",
    fontWeight: "bold",
    fontSize: "14px",
    margin: "0 0 10px"
  },

  infoText: {
    color: "#866271",
    fontSize: "12px",
    margin: "5px"
  },

  footer: {
    color: "#c27a98",
    fontSize: "11px",
    marginTop: "22px",
    letterSpacing: "1px"
  }
};

export default App;