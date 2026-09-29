import React, { useEffect, useState } from "react";

function App() {
  const createNumber = () => Math.floor(Math.random() * 10) + 1;

  const [secret, setSecret] = useState(createNumber);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [won, setWon] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const createConfetti = () => {
    const pieces = [];

    for (let i = 0; i < 80; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2 + Math.random() * 2,
        rotation: Math.random() * 360,
        size: 7 + Math.random() * 8,
        emoji: ["🎀", "💗", "✨", "♡", "🌸", "🎉"][
          Math.floor(Math.random() * 6)
        ]
      });
    }

    setConfetti(pieces);
  };

  useEffect(() => {
    if (won) {
      createConfetti();
    }
  }, [won]);

  const checkGuess = () => {
    const number = Number(guess);

    if (!guess) {
      setMessage("♡ Enter a number first, pookie ♡");
      return;
    }

    if (number < 1 || number > 10) {
      setMessage("🎀 Pick a number between 1 and 10!");
      return;
    }

    setAttempts((prev) => prev + 1);

    if (number === secret) {
      setMessage("");
      setWon(true);
    } else if (number < secret) {
      setMessage("Too low! Go a little higher ♡");
      setGuess("");
    } else {
      setMessage("Too high! Come down a little 🎀");
      setGuess("");
    }
  };

  const playAgain = () => {
    setSecret(createNumber());
    setGuess("");
    setMessage("");
    setAttempts(0);
    setWon(false);
    setConfetti([]);
  };

  return (
    <div style={styles.page}>
      {/* Confetti */}
      {won && (
        <div style={styles.confettiContainer}>
          {confetti.map((piece) => (
            <span
              key={piece.id}
              style={{
                ...styles.confetti,
                left: `${piece.left}%`,
                fontSize: `${piece.size}px`,
                animationDelay: `${piece.delay}s`,
                animationDuration: `${piece.duration}s`,
                transform: `rotate(${piece.rotation}deg)`
              }}
            >
              {piece.emoji}
            </span>
          ))}
        </div>
      )}

      <div style={styles.topDecoration}>
        🎀 ♡ ✦ ♡ 🎀
      </div>

      <div style={styles.card}>
        <div style={styles.sparkleOne}>✦</div>
        <div style={styles.sparkleTwo}>♡</div>

        {!won ? (
          <>
            <p style={styles.miniTitle}>
              ♡ A LITTLE GUESSING GAME ♡
            </p>

            <h1 style={styles.title}>
              Guess the Number 🎀
            </h1>

            <p style={styles.subtitle}>
              There is a secret number hiding between
              <strong> 1 and 10 </strong>
              ♡
            </p>

            {/* Secret number mystery box */}
            <div style={styles.secretBox}>
              <span style={styles.secretLabel}>
                SECRET NUMBER
              </span>

              <div style={styles.questionMark}>
                ?
              </div>

              <span style={styles.secretHint}>
                shhhh... it's hiding ♡
              </span>
            </div>

            {/* Guess input */}
            <div style={styles.inputArea}>
              <label style={styles.label}>
                ♡ Your Guess
              </label>

              <input
                type="number"
                min="1"
                max="10"
                value={guess}
                placeholder="1 - 10"
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    checkGuess();
                  }
                }}
                style={styles.input}
              />

              <button
                onClick={checkGuess}
                style={styles.guessButton}
              >
                Guess ♡
              </button>
            </div>

            {/* Message */}
            {message && (
              <div style={styles.messageBox}>
                <span>{message}</span>
              </div>
            )}

            {/* Attempts */}
            <div style={styles.attemptBox}>
              <span>🎀 Attempts</span>
              <strong>{attempts}</strong>
            </div>

            {/* Hints */}
            <div style={styles.hintBox}>
              <p style={styles.hintTitle}>
                ✦ HOW TO PLAY ✦
              </p>

              <p>
                Enter a number from <strong>1 to 10</strong>.
              </p>

              <p>
                I'll tell you if you're too high or too low.
              </p>

              <p>
                Find the secret number to unlock the surprise! 💌
              </p>
            </div>
          </>
        ) : (
          /* WIN SCREEN */
          <div style={styles.winScreen}>
            <div style={styles.winSparkles}>
              ✨ 🎀 ✨
            </div>

            <div style={styles.trophy}>
              🏆
            </div>

            <p style={styles.winMiniTitle}>
              ♡ SECRET UNLOCKED ♡
            </p>

            <h1 style={styles.winTitle}>
              YOU WON! 🎉
            </h1>

            <div style={styles.winningNumber}>
              <span style={styles.numberLabel}>
                THE SECRET NUMBER WAS
              </span>

              <span style={styles.number}>
                {secret}
              </span>
            </div>

            <p style={styles.winMessage}>
              🎀 You actually found it! 🎀
            </p>

            <p style={styles.attemptMessage}>
              You got it in{" "}
              <strong>
                {attempts}
              </strong>{" "}
              {attempts === 1 ? "attempt" : "attempts"} ♡
            </p>

            <div style={styles.winBadge}>
              ✦ CUTIE CHAMPION ✦
            </div>

            <button
              onClick={playAgain}
              style={styles.playAgain}
            >
              Play Again ♡
            </button>
          </div>
        )}

        <p style={styles.footer}>
          made with ♡ & suspiciously good guessing skills
        </p>
      </div>

      <div style={styles.bottomDecoration}>
        ♡ ✦ 🌸 ✦ ♡
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #ffdbea, #fff0f7, #fbd7e8, #ffe9f3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 15px",
    boxSizing: "border-box",
    fontFamily: "'Trebuchet MS', Arial, sans-serif",
    overflow: "hidden",
    position: "relative"
  },

  topDecoration: {
    fontSize: "27px",
    color: "#d84e87",
    letterSpacing: "6px",
    marginBottom: "12px",
    zIndex: 2
  },

  bottomDecoration: {
    fontSize: "23px",
    color: "#d84e87",
    letterSpacing: "5px",
    marginTop: "15px",
    zIndex: 2
  },

  card: {
    width: "100%",
    maxWidth: "480px",
    minHeight: "600px",
    background: "rgba(255, 255, 255, 0.93)",
    border: "3px solid #ffd0e2",
    borderRadius: "35px",
    padding: "38px",
    boxSizing: "border-box",
    textAlign: "center",
    boxShadow:
      "0 22px 55px rgba(205, 75, 130, 0.2)",
    position: "relative",
    overflow: "hidden",
    zIndex: 1
  },

  sparkleOne: {
    position: "absolute",
    top: "18px",
    right: "28px",
    color: "#e77fa8",
    fontSize: "25px"
  },

  sparkleTwo: {
    position: "absolute",
    top: "55px",
    left: "28px",
    color: "#efa8c3",
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
    color: "#c43e74",
    fontSize: "35px",
    margin: "5px 0 8px",
    fontWeight: "bold"
  },

  subtitle: {
    color: "#916779",
    fontSize: "13px",
    lineHeight: "1.6",
    marginBottom: "25px"
  },

  secretBox: {
    background:
      "linear-gradient(145deg, #fff0f7, #ffe0ed)",
    border: "2px dashed #efa4c2",
    borderRadius: "25px",
    padding: "20px",
    marginBottom: "25px"
  },

  secretLabel: {
    display: "block",
    color: "#c05a83",
    fontSize: "10px",
    fontWeight: "bold",
    letterSpacing: "2px"
  },

  questionMark: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, #f18ab3, #d85b8c)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "13px auto",
    fontSize: "42px",
    fontWeight: "bold",
    boxShadow:
      "0 10px 22px rgba(210, 80, 130, 0.25)"
  },

  secretHint: {
    color: "#b5748c",
    fontSize: "11px",
    fontStyle: "italic"
  },

  inputArea: {
    textAlign: "left"
  },

  label: {
    display: "block",
    color: "#b64b78",
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "8px"
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    borderRadius: "16px",
    border: "2px solid #f2bfd3",
    background: "#fff8fb",
    outline: "none",
    textAlign: "center",
    fontSize: "18px",
    color: "#7c455d",
    fontFamily: "inherit"
  },

  guessButton: {
    width: "100%",
    marginTop: "12px",
    padding: "14px",
    border: "none",
    borderRadius: "17px",
    background:
      "linear-gradient(135deg, #f38ab5, #d95d8c)",
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    fontFamily: "inherit",
    cursor: "pointer",
    boxShadow:
      "0 7px 16px rgba(210, 80, 130, 0.22)"
  },

  messageBox: {
    marginTop: "18px",
    padding: "12px",
    background: "#fff0f6",
    border: "1px solid #f2bfd3",
    borderRadius: "15px",
    color: "#b94e7a",
    fontSize: "13px",
    fontWeight: "bold"
  },

  attemptBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "18px",
    padding: "12px 15px",
    background: "#fff8fb",
    border: "1px solid #f4d0df",
    borderRadius: "15px",
    color: "#966174",
    fontSize: "12px"
  },

  attemptBoxStrong: {
  color: "#c64e7c",
  fontSize: "18px"
},

  hintBox: {
    marginTop: "20px",
    padding: "16px",
    background: "#fff8fb",
    borderRadius: "18px",
    color: "#8b6373",
    fontSize: "11px",
    lineHeight: "1.5"
  },

  hintTitle: {
    color: "#c15480",
    fontWeight: "bold",
    fontSize: "10px",
    letterSpacing: "2px",
    marginTop: "0"
  },

  winScreen: {
    paddingTop: "20px"
  },

  winSparkles: {
    fontSize: "25px",
    letterSpacing: "8px",
    marginBottom: "5px"
  },

  trophy: {
    fontSize: "70px",
    margin: "5px 0"
  },

  winMiniTitle: {
    color: "#c24e7b",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "3px",
    margin: "8px 0"
  },

  winTitle: {
    color: "#c83d73",
    fontSize: "39px",
    margin: "8px 0 20px",
    textShadow:
      "0 4px 10px rgba(200, 60, 115, 0.15)"
  },

  winningNumber: {
    background:
      "linear-gradient(145deg, #ffe3ef, #fff0f7)",
    border: "3px dashed #ec8fb2",
    borderRadius: "25px",
    padding: "20px",
    boxShadow:
      "0 8px 20px rgba(210, 80, 130, 0.12)"
  },

  numberLabel: {
    display: "block",
    color: "#b96784",
    fontSize: "10px",
    fontWeight: "bold",
    letterSpacing: "2px"
  },

  number: {
    display: "block",
    color: "#c43f74",
    fontSize: "65px",
    fontWeight: "bold",
    marginTop: "5px"
  },

  winMessage: {
    color: "#bd4b78",
    fontSize: "17px",
    fontWeight: "bold",
    margin: "20px 0 8px"
  },

  attemptMessage: {
    color: "#916577",
    fontSize: "13px"
  },

  winBadge: {
    display: "inline-block",
    background: "#f8c7da",
    color: "#ad416c",
    padding: "9px 15px",
    borderRadius: "20px",
    fontSize: "10px",
    fontWeight: "bold",
    letterSpacing: "1px",
    marginTop: "10px"
  },

  playAgain: {
    display: "block",
    width: "100%",
    marginTop: "25px",
    padding: "15px",
    border: "none",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg, #f38ab5, #d95d8c)",
    color: "white",
    fontFamily: "inherit",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow:
      "0 8px 18px rgba(210, 80, 130, 0.22)"
  },

  footer: {
    color: "#c27a98",
    fontSize: "10px",
    marginTop: "25px",
    letterSpacing: "1px"
  },

  confettiContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 10,
    overflow: "hidden"
  },

  confetti: {
    position: "absolute",
    top: "-30px",
    animationName: "confettiFall",
    animationTimingFunction: "ease-in",
    animationIterationCount: "1",
    animationFillMode: "forwards"
  }
};

/* Confetti animation */
const styleSheet = document.createElement("style");

styleSheet.innerHTML = `
  @keyframes confettiFall {
    0% {
      top: -40px;
      opacity: 1;
      transform: translateY(0) rotate(0deg);
    }

    50% {
      opacity: 1;
    }

    100% {
      top: 110vh;
      opacity: 0;
      transform: translateY(0) rotate(720deg);
    }
  }
`;

if (!document.head.contains(styleSheet)) {
  document.head.appendChild(styleSheet);
}

export default App;