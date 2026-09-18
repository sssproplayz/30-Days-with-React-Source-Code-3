import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Cute decoration */}
        <div style={styles.decorations}>
          🎀 ✦ ♡ ✦ 🎀
        </div>

        {/* Small heading */}
        <p style={styles.subtitle}>
          ♡ WRITE YOUR HEART OUT ♡
        </p>

        {/* Main heading */}
        <h1 style={styles.title}>
          Character
          <br />
          Counter 💌
        </h1>

        <p style={styles.description}>
          Start typing below and watch your character count grow!
        </p>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something cute..."
          style={styles.textarea}
        />

        {/* Character count */}
        <div style={styles.countBox}>
          <span style={styles.countNumber}>{text.length}</span>
          <span style={styles.countText}>
            {text.length === 1 ? "character" : "characters"}
          </span>
        </div>

        {/* Footer */}
        <p style={styles.footer}>
          made with ♡ & lots of typing
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
      "linear-gradient(135deg, #ffe4f0, #fff7fb, #ffd7e8)",
    fontFamily: "'Trebuchet MS', Arial, sans-serif",
    padding: "20px",
    boxSizing: "border-box"
  },

  card: {
    width: "480px",
    padding: "45px 40px",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    border: "3px solid #f2a8c5",
    borderRadius: "32px",
    boxShadow:
      "0 18px 40px rgba(193, 89, 132, 0.2)",
    boxSizing: "border-box"
  },

  decorations: {
    fontSize: "24px",
    color: "#d46b95",
    marginBottom: "10px"
  },

  subtitle: {
    margin: "0 0 10px",
    fontSize: "12px",
    letterSpacing: "3px",
    color: "#b35b7d",
    fontWeight: "bold"
  },

  title: {
    margin: "5px 0 15px",
    fontFamily: "Georgia, serif",
    fontSize: "40px",
    lineHeight: "1.1",
    color: "#743c55"
  },

  description: {
    margin: "0 auto 25px",
    maxWidth: "340px",
    color: "#8c6878",
    fontSize: "15px",
    lineHeight: "1.5"
  },

  textarea: {
    width: "100%",
    height: "170px",
    padding: "18px",
    boxSizing: "border-box",
    resize: "none",
    border: "2px solid #edb3c9",
    borderRadius: "22px",
    backgroundColor: "#fff8fb",
    color: "#693f52",
    fontFamily: "'Trebuchet MS', Arial, sans-serif",
    fontSize: "17px",
    lineHeight: "1.5",
    outline: "none",
    boxShadow:
      "inset 0 3px 10px rgba(190, 100, 140, 0.08)"
  },

  countBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    gap: "8px",
    margin: "25px auto 0",
    padding: "15px 25px",
    width: "fit-content",
    backgroundColor: "#fff0f6",
    border: "2px solid #f2bfd2",
    borderRadius: "25px"
  },

  countNumber: {
    fontFamily: "Georgia, serif",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#c4517c"
  },

  countText: {
    fontSize: "15px",
    color: "#9c687d",
    fontWeight: "bold"
  },

  footer: {
    margin: "25px 0 0",
    fontSize: "12px",
    color: "#b27b91",
    fontStyle: "italic"
  }
};

export default App;