import React, { useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    long: password.length >= 12,
  };

  const score = Object.values(checks).filter(Boolean).length;

  const getStrength = () => {
    if (!password) {
      return {
        text: "Enter password",
        emoji: "🔐",
        message: "Let's make something super secure! 💗",
      };
    }

    if (score <= 1) {
      return {
        text: "Very Weak",
        emoji: "😭",
        message: "This password needs serious help!",
      };
    }

    if (score === 2) {
      return {
        text: "Weak",
        emoji: "🥺",
        message: "A little more security, pretty please!",
      };
    }

    if (score === 3) {
      return {
        text: "Medium",
        emoji: "🙂",
        message: "Getting better! Keep going!",
      };
    }

    if (score === 4) {
      return {
        text: "Good",
        emoji: "💗",
        message: "Pretty decent password!",
      };
    }

    if (score === 5) {
      return {
        text: "Strong",
        emoji: "💪",
        message: "Now we're talking!",
      };
    }

    return {
      text: "Super Strong",
      emoji: "👑",
      message: "This password is serving SECURITY!",
    };
  };

  const strength = getStrength();

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

    const array = new Uint32Array(16);
    crypto.getRandomValues(array);

    let newPassword = "";

    for (let i = 0; i < 16; i++) {
      newPassword += chars[array[i] % chars.length];
    }

    setPassword(newPassword);
  };

  const copyPassword = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      alert("Password copied! 🎀");
    } catch (error) {
      console.log("Could not copy password:", error);
    }
  };

  const clearPassword = () => {
    setPassword("");
    setShowPassword(false);
  };

  const getBarWidth = () => {
    if (!password) return "0%";
    return `${(score / 6) * 100}%`;
  };

  const getBarClass = () => {
    if (!password) return "empty";
    if (score <= 1) return "veryWeak";
    if (score === 2) return "weak";
    if (score === 3) return "medium";
    if (score === 4) return "good";
    if (score === 5) return "strong";
    return "superStrong";
  };

  return (
    <div style={styles.page}>
      <div style={styles.decorTopLeft}>🎀</div>
      <div style={styles.decorTopRight}>♡</div>
      <div style={styles.decorBottomLeft}>✦</div>
      <div style={styles.decorBottomRight}>🌸</div>

      <main style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.bow}>🎀</div>

          <p style={styles.smallTitle}>
            ✦ PASSWORD CHECKER ✦
          </p>

          <h1 style={styles.title}>
            Is Your Password
            <br />
            <span style={styles.titlePink}>Strong Enough?</span> 💗
          </h1>

          <p style={styles.subtitle}>
            Let's make your password cute AND secure.
          </p>
        </div>

        {/* Main Card */}
        <div style={styles.card}>
          {/* Password Input */}
          <div style={styles.inputSection}>
            <label style={styles.label}>
              🔐 YOUR PASSWORD
            </label>

            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type your password..."
                style={styles.input}
              />

              <button
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? "🙈" : "👀"}
              </button>
            </div>
          </div>

          {/* Strength */}
          <div style={styles.strengthSection}>
            <div style={styles.strengthHeader}>
              <span style={styles.strengthLabel}>
                PASSWORD STRENGTH
              </span>

              <span style={styles.strengthText}>
                {strength.emoji} {strength.text}
              </span>
            </div>

            <div style={styles.progressBackground}>
              <div
                style={{
                  ...styles.progressBar,
                  width: getBarWidth(),
                }}
                className={getBarClass()}
              />
            </div>

            <p style={styles.strengthMessage}>
              {strength.message}
            </p>
          </div>

          {/* Requirements */}
          <div style={styles.requirementsSection}>
            <h2 style={styles.sectionTitle}>
              ✨ Password Checklist
            </h2>

            <div style={styles.checkGrid}>
              <Requirement
                passed={checks.length}
                text="At least 8 characters"
              />

              <Requirement
                passed={checks.uppercase}
                text="Uppercase letter"
              />

              <Requirement
                passed={checks.lowercase}
                text="Lowercase letter"
              />

              <Requirement
                passed={checks.number}
                text="Number"
              />

              <Requirement
                passed={checks.special}
                text="Special character"
              />

              <Requirement
                passed={checks.long}
                text="12+ characters"
              />
            </div>
          </div>

          {/* Score */}
          <div style={styles.scoreBox}>
            <div style={styles.scoreCircle}>
              <span style={styles.scoreNumber}>
                {score}
              </span>

              <span style={styles.scoreOutOf}>
                /6
              </span>
            </div>

            <div style={styles.scoreText}>
              <strong style={styles.scoreTitle}>
                Security Score
              </strong>

              <span style={styles.scoreDescription}>
                {score === 6
                  ? "Perfect! 👑"
                  : `${score} of 6 security checks passed`}
              </span>
            </div>
          </div>

          {/* Tips */}
          <div style={styles.tipBox}>
            <div style={styles.tipIcon}>💡</div>

            <div>
              <strong style={styles.tipTitle}>
                Pookie Security Tip
              </strong>

              <p style={styles.tipText}>
                Don't reuse the same password across different
                websites. One leaked password should not unlock
                your entire digital kingdom.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div style={styles.buttonRow}>
            <button
              onClick={generatePassword}
              style={styles.generateButton}
            >
              ✨ Generate Strong Password
            </button>

            <button
              onClick={copyPassword}
              disabled={!password}
              style={{
                ...styles.secondaryButton,
                opacity: password ? 1 : 0.5,
                cursor: password ? "pointer" : "not-allowed",
              }}
            >
              📋 Copy
            </button>

            <button
              onClick={clearPassword}
              style={styles.clearButton}
            >
              🗑️ Clear
            </button>
          </div>

          {/* Security Note */}
          <div style={styles.securityNote}>
            <span style={styles.securityNoteIcon}>
              🔒
            </span>

            <div>
              <strong style={styles.securityNoteTitle}>
                Your password stays private
              </strong>

              <p style={styles.securityNoteText}>
                This checker runs entirely in your browser.
                Your password is never uploaded or stored.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={styles.footer}>
          <span>🎀</span>
          <span>Made with ♡ for better passwords</span>
          <span>🎀</span>
        </footer>
      </main>
    </div>
  );
}

/* Requirement Component */
function Requirement({ passed, text }) {
  return (
    <div
      style={{
        ...styles.requirement,
        backgroundColor: passed ? "#fff0f7" : "#fffafd",
        borderColor: passed ? "#f2a7c7" : "#f3dce8",
      }}
    >
      <span
        style={{
          ...styles.checkIcon,
          backgroundColor: passed ? "#e98bb2" : "#f7dce8",
        }}
      >
        {passed ? "✓" : "○"}
      </span>

      <span
        style={{
          ...styles.requirementText,
          color: passed ? "#b83e70" : "#a98999",
        }}
      >
        {text}
      </span>
    </div>
  );
}

/* Styles */
const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #fff1f7 0%, #ffe5f0 45%, #f8e8ff 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    fontFamily:
      "'Trebuchet MS', 'Segoe UI', Arial, sans-serif",
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
  },

  container: {
    width: "100%",
    maxWidth: "720px",
    position: "relative",
    zIndex: 2,
  },

  decorTopLeft: {
    position: "fixed",
    top: "25px",
    left: "30px",
    fontSize: "42px",
    transform: "rotate(-15deg)",
    opacity: 0.8,
  },

  decorTopRight: {
    position: "fixed",
    top: "45px",
    right: "45px",
    fontSize: "45px",
    color: "#ed8fb6",
    transform: "rotate(15deg)",
    opacity: 0.7,
  },

  decorBottomLeft: {
    position: "fixed",
    bottom: "40px",
    left: "50px",
    fontSize: "35px",
    color: "#d88be5",
    opacity: 0.7,
  },

  decorBottomRight: {
    position: "fixed",
    bottom: "30px",
    right: "40px",
    fontSize: "38px",
    opacity: 0.7,
  },

  header: {
    textAlign: "center",
    marginBottom: "25px",
  },

  bow: {
    fontSize: "50px",
    marginBottom: "5px",
  },

  smallTitle: {
    color: "#c95a88",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "3px",
    margin: "5px 0 10px",
  },

  title: {
    margin: 0,
    color: "#6f4561",
    fontSize: "36px",
    lineHeight: "1.15",
    fontWeight: "800",
  },

  titlePink: {
    color: "#d64d87",
  },

  subtitle: {
    color: "#9b748a",
    fontSize: "14px",
    marginTop: "12px",
  },

  card: {
    background: "rgba(255, 255, 255, 0.82)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "2px solid rgba(255, 190, 215, 0.6)",
    borderRadius: "30px",
    padding: "32px",
    boxShadow: "0 20px 60px rgba(193, 105, 148, 0.18)",
  },

  inputSection: {
    marginBottom: "25px",
  },

  label: {
    display: "block",
    color: "#8c5771",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    marginBottom: "9px",
  },

  passwordWrapper: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "17px 55px 17px 18px",
    borderRadius: "17px",
    border: "2px solid #f2c3d8",
    outline: "none",
    background: "#fffafd",
    color: "#6f4561",
    fontSize: "16px",
    fontWeight: "600",
  },

  eyeButton: {
    position: "absolute",
    right: "8px",
    border: "none",
    background: "#ffe6f1",
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "18px",
  },

  strengthSection: {
    marginBottom: "28px",
  },

  strengthHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    gap: "10px",
  },

  strengthLabel: {
    color: "#9b7186",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  strengthText: {
    color: "#c54f7d",
    fontSize: "13px",
    fontWeight: "800",
  },

  progressBackground: {
    height: "13px",
    background: "#f8e1eb",
    borderRadius: "20px",
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    borderRadius: "20px",
    transition: "width 0.35s ease",
  },

  strengthMessage: {
    textAlign: "center",
    color: "#a7798f",
    fontSize: "12px",
    marginTop: "10px",
    marginBottom: 0,
  },

  requirementsSection: {
    marginBottom: "24px",
  },

  sectionTitle: {
    color: "#754a61",
    fontSize: "18px",
    marginBottom: "15px",
  },

  checkGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "10px",
  },

  requirement: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "11px 12px",
    borderRadius: "14px",
    border: "1.5px solid",
    transition: "all 0.2s ease",
  },

  checkIcon: {
    width: "24px",
    height: "24px",
    minWidth: "24px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "13px",
    fontWeight: "bold",
  },

  requirementText: {
    fontSize: "12px",
    fontWeight: "600",
  },

  scoreBox: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    background:
      "linear-gradient(135deg, #fff1f7, #f8ecff)",
    border: "1.5px solid #f1c7da",
    borderRadius: "20px",
    padding: "18px",
    marginBottom: "18px",
  },

  scoreCircle: {
    width: "70px",
    height: "70px",
    minWidth: "70px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, #f4a4c6, #d98be5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    boxShadow: "0 8px 20px rgba(215, 125, 165, 0.2)",
  },

  scoreNumber: {
    color: "white",
    fontSize: "25px",
    fontWeight: "900",
    lineHeight: "1",
  },

  scoreOutOf: {
    color: "white",
    fontSize: "10px",
    marginTop: "2px",
  },

  scoreText: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },

  scoreTitle: {
    color: "#814e69",
    fontSize: "15px",
  },

  scoreDescription: {
    color: "#a7798f",
    fontSize: "12px",
  },

  tipBox: {
    display: "flex",
    gap: "13px",
    padding: "15px",
    background: "#fff8fb",
    border: "1.5px dashed #efb4ce",
    borderRadius: "17px",
    marginBottom: "20px",
  },

  tipIcon: {
    fontSize: "24px",
  },

  tipTitle: {
    color: "#bd4c79",
    fontSize: "13px",
  },

  tipText: {
    margin: "5px 0 0",
    color: "#9c7589",
    fontSize: "11px",
    lineHeight: "1.5",
  },

  buttonRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  },

  generateButton: {
    flex: "1 1 220px",
    border: "none",
    borderRadius: "15px",
    padding: "14px 16px",
    background:
      "linear-gradient(135deg, #e987b0, #d88be5)",
    color: "white",
    fontWeight: "800",
    fontSize: "13px",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(216, 130, 174, 0.25)",
  },

  secondaryButton: {
    border: "2px solid #efbfd4",
    borderRadius: "15px",
    padding: "13px 18px",
    background: "#fff8fb",
    color: "#b64c79",
    fontWeight: "800",
    fontSize: "13px",
  },

  clearButton: {
    border: "2px solid #efbfd4",
    borderRadius: "15px",
    padding: "13px 18px",
    background: "#fff",
    color: "#a75b7c",
    fontWeight: "800",
    fontSize: "13px",
    cursor: "pointer",
  },

  securityNote: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
    padding: "13px",
    background: "#fffafd",
    borderRadius: "15px",
    border: "1px solid #f2d9e5",
  },

  securityNoteIcon: {
    fontSize: "20px",
  },

  securityNoteTitle: {
    display: "block",
    color: "#9d607c",
    fontSize: "11px",
    marginBottom: "3px",
  },

  securityNoteText: {
    margin: "0",
    color: "#ae7890",
    fontSize: "10px",
    lineHeight: "1.5",
  },

  footer: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    alignItems: "center",
    marginTop: "20px",
    color: "#ad7890",
    fontSize: "11px",
  },
};

export default App;