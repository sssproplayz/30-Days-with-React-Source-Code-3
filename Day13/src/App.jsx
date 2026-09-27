import React, { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setTime((prev) => prev + 10);
    }, 10);

    return () => clearInterval(timer);
  }, [running]);

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
  };

  const addLap = () => {
    if (!running) return;

    setLaps((prev) => [
      ...prev,
      {
        number: prev.length + 1,
        time: formatTime(time)
      }
    ]);
  };

  const reset = () => {
    setTime(0);
    setRunning(false);
    setLaps([]);
  };

  return (
    <div style={styles.page}>
      {/* Floating decorations */}
      <div style={styles.decorTop}>
        🎀 ♡ ✦ ♡ 🎀
      </div>

      <div style={styles.card}>
        <div style={styles.sparkle}>✦</div>
        <div style={styles.sparkle2}>♡</div>

        <p style={styles.miniTitle}>
          ♡ TIME TO SHINE ♡
        </p>

        <h1 style={styles.title}>
          Stopwatch
        </h1>

        <p style={styles.subtitle}>
          ✧ every second deserves a little sparkle ✧
        </p>

        {/* Timer */}
        <div style={styles.timerContainer}>
          <div style={styles.timer}>
            {formatTime(time)}
          </div>

          <div style={styles.timerLabel}>
            MIN : SEC . MS
          </div>
        </div>

        {/* Status */}
        <div
          style={{
            ...styles.status,
            ...(running ? styles.runningStatus : styles.pausedStatus)
          }}
        >
          <span style={styles.statusDot}>
            ●
          </span>

          {running ? "STOPWATCH IS RUNNING ♡" : "READY WHEN YOU ARE 🎀"}
        </div>

        {/* Main buttons */}
        <div style={styles.buttonGrid}>
          <button
            onClick={() => setRunning(true)}
            style={{
              ...styles.button,
              ...styles.startButton
            }}
          >
            ▶ Start
          </button>

          <button
            onClick={() => setRunning(false)}
            style={{
              ...styles.button,
              ...styles.pauseButton
            }}
          >
            ⏸ Pause
          </button>

          <button
            onClick={addLap}
            style={{
              ...styles.button,
              ...styles.lapButton
            }}
          >
            ♡ Lap
          </button>

          <button
            onClick={reset}
            style={{
              ...styles.button,
              ...styles.resetButton
            }}
          >
            ↻ Reset
          </button>
        </div>

        {/* Lap section */}
        <div style={styles.lapSection}>
          <div style={styles.lapHeader}>
            <span>🎀 LAPS</span>

            <span style={styles.lapCount}>
              {laps.length}
            </span>
          </div>

          {laps.length === 0 ? (
            <div style={styles.emptyLaps}>
              <div style={styles.emptyEmoji}>
                ♡
              </div>

              <p>No laps yet</p>

              <small>
                Start the stopwatch and press Lap ✦
              </small>
            </div>
          ) : (
            <div style={styles.lapList}>
              {laps
                .slice()
                .reverse()
                .map((lap) => (
                  <div
                    key={lap.number}
                    style={styles.lapItem}
                  >
                    <span>
                      ♡ Lap {lap.number}
                    </span>

                    <strong>
                      {lap.time}
                    </strong>
                  </div>
                ))}
            </div>
          )}
        </div>

        <p style={styles.footer}>
          made with ♡, sparkles & questionable time management
        </p>
      </div>

      <div style={styles.decorBottom}>
        ♡ ✦ 🎀 ✦ ♡
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #ffddea, #fff1f7, #fbd7e8, #ffeaf3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 15px",
    boxSizing: "border-box",
    fontFamily: "'Trebuchet MS', Arial, sans-serif"
  },

  decorTop: {
    fontSize: "27px",
    color: "#d94f87",
    letterSpacing: "6px",
    marginBottom: "13px",
    textShadow: "0 3px 10px rgba(210, 70, 125, 0.15)"
  },

  decorBottom: {
    fontSize: "24px",
    color: "#d94f87",
    letterSpacing: "5px",
    marginTop: "15px"
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    background: "rgba(255, 255, 255, 0.92)",
    border: "3px solid #ffd0e1",
    borderRadius: "35px",
    padding: "35px",
    boxSizing: "border-box",
    textAlign: "center",
    boxShadow:
      "0 20px 50px rgba(205, 75, 130, 0.2)",
    position: "relative",
    overflow: "hidden"
  },

  sparkle: {
    position: "absolute",
    top: "18px",
    right: "28px",
    color: "#e879a6",
    fontSize: "25px"
  },

  sparkle2: {
    position: "absolute",
    top: "50px",
    left: "25px",
    color: "#f1a5c3",
    fontSize: "18px"
  },

  miniTitle: {
    color: "#c4507d",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "3px",
    margin: "0 0 8px"
  },

  title: {
    color: "#c53f75",
    fontSize: "38px",
    margin: "4px 0",
    fontWeight: "bold"
  },

  subtitle: {
    color: "#966779",
    fontSize: "13px",
    margin: "8px 0 28px"
  },

  timerContainer: {
    background:
      "linear-gradient(145deg, #fff1f7, #ffe0ed)",
    border: "2px dashed #efa4c3",
    borderRadius: "28px",
    padding: "25px 15px",
    boxShadow:
      "inset 0 2px 10px rgba(210, 80, 130, 0.08)"
  },

  timer: {
    color: "#bd3f73",
    fontSize: "47px",
    fontWeight: "bold",
    letterSpacing: "2px",
    fontFamily: "'Courier New', monospace",
    textShadow: "0 3px 8px rgba(190, 60, 110, 0.12)"
  },

  timerLabel: {
    color: "#c57b98",
    fontSize: "9px",
    letterSpacing: "3px",
    marginTop: "7px"
  },

  status: {
    display: "inline-block",
    marginTop: "15px",
    padding: "8px 15px",
    borderRadius: "20px",
    fontSize: "10px",
    fontWeight: "bold",
    letterSpacing: "1px"
  },

  runningStatus: {
    background: "#ffe0ed",
    color: "#bd4777"
  },

  pausedStatus: {
    background: "#fff1f7",
    color: "#a66b80"
  },

  statusDot: {
    fontSize: "8px",
    marginRight: "5px"
  },

  buttonGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "22px"
  },

  button: {
    border: "none",
    borderRadius: "17px",
    padding: "13px 8px",
    fontFamily: "inherit",
    fontSize: "13px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.2s",
    boxShadow:
      "0 5px 12px rgba(200, 80, 130, 0.12)"
  },

  startButton: {
    background:
      "linear-gradient(135deg, #f38bb5, #d95d8c)",
    color: "white"
  },

  pauseButton: {
    background: "#ffe4ef",
    color: "#bb4f7b"
  },

  lapButton: {
    background: "#fff0f6",
    color: "#c05480",
    border: "2px solid #f3bfd4"
  },

  resetButton: {
    background: "#f8d1e1",
    color: "#aa4c73"
  },

  lapSection: {
    marginTop: "25px",
    background: "#fff8fb",
    border: "2px solid #f5d1df",
    borderRadius: "23px",
    padding: "17px"
  },

  lapHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#b84c78",
    fontWeight: "bold",
    fontSize: "12px",
    letterSpacing: "1px",
    marginBottom: "12px"
  },

  lapCount: {
    background: "#f5c3d7",
    color: "#a8436d",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  emptyLaps: {
    background: "#fff0f6",
    borderRadius: "17px",
    padding: "20px 10px",
    color: "#b97891"
  },

  emptyEmoji: {
    fontSize: "25px",
    color: "#e08aad"
  },

  lapList: {
    maxHeight: "190px",
    overflowY: "auto"
  },

  lapItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 12px",
    marginBottom: "7px",
    borderRadius: "13px",
    background: "#fff0f6",
    color: "#8c5a6d",
    fontSize: "12px"
  },

  footer: {
    color: "#c17a98",
    fontSize: "10px",
    marginTop: "23px",
    letterSpacing: "1px"
  }
};

export default App;