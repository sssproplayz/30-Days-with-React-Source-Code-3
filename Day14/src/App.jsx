
import React, { useState } from "react";

function App() {
  const choices = [
    { name: "Rock", emoji: "🪨" },
    { name: "Paper", emoji: "📄" },
    { name: "Scissors", emoji: "✂️" }
  ];

  const [mode, setMode] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [computer, setComputer] = useState("");
  const [turn, setTurn] = useState(1);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({
    player1: 0,
    player2: 0,
    draws: 0
  });
  const [played, setPlayed] = useState(false);

  const getEmoji = (choice) => {
    const found = choices.find((item) => item.name === choice);
    return found ? found.emoji : "❔";
  };

  const decideWinner = (first, second) => {
    if (first === second) {
      return "draw";
    }

    if (
      (first === "Rock" && second === "Scissors") ||
      (first === "Paper" && second === "Rock") ||
      (first === "Scissors" && second === "Paper")
    ) {
      return "player1";
    }

    return "player2";
  };

  const updateScore = (winner) => {
    setScore((prev) => ({
      ...prev,
      [winner]: prev[winner] + 1
    }));
  };

  // COMPUTER MODE
  const playComputer = (choice) => {
    const cpu =
      choices[Math.floor(Math.random() * choices.length)].name;

    setPlayer1(choice);
    setComputer(cpu);
    setPlayed(true);

    const winner = decideWinner(choice, cpu);

    if (winner === "draw") {
      setResult("It's a Draw! 🤝");
      updateScore("draws");
    } else if (winner === "player1") {
      setResult("YOU WIN! 🎀🏆");
      updateScore("player1");
    } else {
      setResult("Computer Wins! 🤖");
      updateScore("player2");
    }
  };

  // HUMAN MODE
  const playHuman = (choice) => {
    if (turn === 1) {
      setPlayer1(choice);
      setTurn(2);
    } else {
      setPlayer2(choice);
      setPlayed(true);

      const winner = decideWinner(player1, choice);

      if (winner === "draw") {
        setResult("It's a Draw! 🤝");
        updateScore("draws");
      } else if (winner === "player1") {
        setResult("PLAYER 1 WINS! ❤️🏆");
        updateScore("player1");
      } else {
        setResult("PLAYER 2 WINS! 💙🏆");
        updateScore("player2");
      }
    }
  };

  // RESET ROUND
  const playAgain = () => {
    setPlayer1("");
    setPlayer2("");
    setComputer("");
    setResult("");
    setTurn(1);
    setPlayed(false);
  };

  // RESET EVERYTHING
  const resetGame = () => {
    playAgain();
    setScore({
      player1: 0,
      player2: 0,
      draws: 0
    });
  };

  const changeMode = () => {
    resetGame();
    setMode("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.decorTop}>🎀 ✦ ♡ ✦ 🎀</div>

      <h1 style={styles.heading}>
        Rock Paper Scissors
      </h1>

      <p style={styles.subtitle}>
        ✨ A little game of luck & friendship ✨
      </p>

      {/* MODE SELECTION */}
      {!mode && (
        <div style={styles.modeCard}>
          <h2 style={styles.modeTitle}>
            Choose Your Game Mode 💌
          </h2>

          <button
            style={styles.computerMode}
            onClick={() => setMode("computer")}
          >
            🤖 Play Against Computer
            <span style={styles.modeDescription}>
              Challenge the computer!
            </span>
          </button>

          <button
            style={styles.humanMode}
            onClick={() => setMode("human")}
          >
            👯 Play Against Human
            <span style={styles.modeDescription}>
              Two players, one device!
            </span>
          </button>
        </div>
      )}

      {/* GAME AREA */}
      {mode && (
        <>
          <button
            style={styles.backButton}
            onClick={changeMode}
          >
            ← Change Game Mode
          </button>

          {/* SCOREBOARD */}
          <div style={styles.scoreCard}>
            <h3 style={styles.scoreHeading}>
              🏆 SCOREBOARD
            </h3>

            <div style={styles.scoreRow}>
              <div style={styles.scoreItem}>
                <span style={styles.scoreNumber}>
                  {score.player1}
                </span>
                <span>
                  {mode === "human" ? "❤️ Player 1" : "🎀 You"}
                </span>
              </div>

              <div style={styles.scoreItem}>
                <span style={styles.scoreNumber}>
                  {score.draws}
                </span>
                <span>🤝 Draws</span>
              </div>

              <div style={styles.scoreItem}>
                <span style={styles.scoreNumber}>
                  {score.player2}
                </span>
                <span>
                  {mode === "human" ? "💙 Player 2" : "🤖 Computer"}
                </span>
              </div>
            </div>
          </div>

          {/* COMPUTER MODE */}
          {mode === "computer" && (
            <div style={styles.gameCard}>
              <h2 style={styles.sectionTitle}>
                🎮 Your Move!
              </h2>

              <p style={styles.instruction}>
                Choose your weapon, cutie!
              </p>

              <div style={styles.choiceRow}>
                {choices.map((choice) => (
                  <button
                    key={choice.name}
                    style={{
                      ...styles.choiceButton,
                      ...(played ? styles.disabledButton : {})
                    }}
                    onClick={() => playComputer(choice.name)}
                    disabled={played}
                  >
                    <span style={styles.choiceEmoji}>
                      {choice.emoji}
                    </span>
                    <span>{choice.name}</span>
                  </button>
                ))}
              </div>

              {played && (
                <div style={styles.resultArea}>
                  <div style={styles.battleRow}>
                    <div style={styles.battlePlayer}>
                      <span>🎀 YOU</span>
                      <strong style={styles.battleEmoji}>
                        {getEmoji(player1)}
                      </strong>
                      <span>{player1}</span>
                    </div>

                    <span style={styles.vs}>VS</span>

                    <div style={styles.battlePlayer}>
                      <span>🤖 COMPUTER</span>
                      <strong style={styles.battleEmoji}>
                        {getEmoji(computer)}
                      </strong>
                      <span>{computer}</span>
                    </div>
                  </div>

                  <h2 style={styles.resultText}>
                    {result}
                  </h2>

                  <button
                    style={styles.playAgainButton}
                    onClick={playAgain}
                  >
                    🔄 Play Again
                  </button>
                </div>
              )}
            </div>
          )}

          {/* HUMAN MODE */}
          {mode === "human" && (
            <div style={styles.humanGameCard}>
              <h2 style={styles.sectionTitle}>
                👯 Two Player Battle
              </h2>

              {!played && turn === 1 && (
                <div style={styles.redPanel}>
                  <h2 style={styles.redTitle}>
                    ❤️ PLAYER 1
                  </h2>

                  <p style={styles.redInstruction}>
                    Choose your move!
                  </p>

                  <div style={styles.choiceRow}>
                    {choices.map((choice) => (
                      <button
                        key={choice.name}
                        style={styles.redChoiceButton}
                        onClick={() => playHuman(choice.name)}
                      >
                        <span style={styles.choiceEmoji}>
                          {choice.emoji}
                        </span>
                        <span>{choice.name}</span>
                      </button>
                    ))}
                  </div>

                  <p style={styles.playerHint}>
                    🔴 Red team's turn
                  </p>
                </div>
              )}

              {!played && turn === 2 && (
                <div style={styles.bluePanel}>
                  <h2 style={styles.blueTitle}>
                    💙 PLAYER 2
                  </h2>

                  <p style={styles.blueInstruction}>
                    Player 1 has chosen! Now it's your turn.
                  </p>

                  <div style={styles.choiceRow}>
                    {choices.map((choice) => (
                      <button
                        key={choice.name}
                        style={styles.blueChoiceButton}
                        onClick={() => playHuman(choice.name)}
                      >
                        <span style={styles.choiceEmoji}>
                          {choice.emoji}
                        </span>
                        <span>{choice.name}</span>
                      </button>
                    ))}
                  </div>

                  <p style={styles.playerHint}>
                    🔵 Blue team's turn
                  </p>
                </div>
              )}

              {played && (
                <div style={styles.humanResultArea}>
                  <h2 style={styles.resultText}>
                    ✨ BATTLE RESULTS ✨
                  </h2>

                  <div style={styles.battleRow}>
                    <div style={styles.redResult}>
                      <span>❤️ PLAYER 1</span>
                      <strong style={styles.battleEmoji}>
                        {getEmoji(player1)}
                      </strong>
                      <span>{player1}</span>
                    </div>

                    <span style={styles.vs}>VS</span>

                    <div style={styles.blueResult}>
                      <span>💙 PLAYER 2</span>
                      <strong style={styles.battleEmoji}>
                        {getEmoji(player2)}
                      </strong>
                      <span>{player2}</span>
                    </div>
                  </div>

                  <h2 style={styles.winnerText}>
                    {result}
                  </h2>

                  <button
                    style={styles.playAgainButton}
                    onClick={playAgain}
                  >
                    🔄 Play Another Round
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            style={styles.resetButton}
            onClick={resetGame}
          >
            ♡ Reset Score
          </button>
        </>
      )}

      <div style={styles.footer}>
        made with ♡, bows & a little competition 🎀
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    boxSizing: "border-box",
    background: "linear-gradient(135deg, #ffe0ed, #fff0f6, #fce4ff)",
    fontFamily: "'Trebuchet MS', sans-serif",
    textAlign: "center",
    padding: "35px 15px",
    color: "#a94370"
  },

  decorTop: {
    fontSize: "25px",
    marginBottom: "10px"
  },

  heading: {
    color: "#c94f83",
    fontSize: "clamp(28px, 5vw, 42px)",
    margin: "10px 0",
    fontWeight: "bold"
  },

  subtitle: {
    color: "#b76a8b",
    fontSize: "15px",
    marginBottom: "30px"
  },

  modeCard: {
    maxWidth: "450px",
    margin: "25px auto",
    padding: "30px 20px",
    background: "rgba(255,255,255,0.8)",
    borderRadius: "25px",
    boxShadow: "0 10px 30px rgba(190,90,130,0.15)"
  },

  modeTitle: {
    color: "#c94f83",
    marginBottom: "25px"
  },

  computerMode: {
    display: "block",
    width: "100%",
    padding: "20px",
    marginBottom: "15px",
    border: "none",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #f9b9d3, #f6d0e3)",
    color: "#963d68",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  humanMode: {
    display: "block",
    width: "100%",
    padding: "20px",
    border: "none",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #c6d9ff, #e2cfff)",
    color: "#5c5b9b",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  modeDescription: {
    display: "block",
    fontSize: "12px",
    marginTop: "7px",
    fontWeight: "normal"
  },

  backButton: {
    background: "white",
    color: "#b44d7a",
    border: "1px solid #f2b5ce",
    borderRadius: "20px",
    padding: "10px 18px",
    cursor: "pointer",
    marginBottom: "20px",
    fontWeight: "bold"
  },

  scoreCard: {
    maxWidth: "500px",
    margin: "0 auto 25px",
    background: "rgba(255,255,255,0.85)",
    padding: "18px",
    borderRadius: "22px",
    boxShadow: "0 6px 20px rgba(190,90,130,0.12)"
  },

  scoreHeading: {
    color: "#c94f83",
    letterSpacing: "2px",
    margin: "0 0 15px"
  },

  scoreRow: {
    display: "flex",
    justifyContent: "space-around",
    gap: "10px"
  },

  scoreItem: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    fontSize: "12px",
    fontWeight: "bold"
  },

  scoreNumber: {
    fontSize: "28px",
    color: "#c94f83"
  },

  gameCard: {
    maxWidth: "550px",
    margin: "auto",
    padding: "30px 20px",
    background: "rgba(255,255,255,0.85)",
    borderRadius: "25px",
    boxShadow: "0 10px 30px rgba(190,90,130,0.15)"
  },

  humanGameCard: {
    maxWidth: "650px",
    margin: "auto",
    padding: "25px 15px",
    background: "rgba(255,255,255,0.85)",
    borderRadius: "25px",
    boxShadow: "0 10px 30px rgba(190,90,130,0.15)"
  },

  sectionTitle: {
    color: "#c94f83",
    marginTop: "0",
    fontSize: "24px"
  },

  instruction: {
    color: "#b76a8b",
    marginBottom: "25px"
  },

  choiceRow: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "12px",
    margin: "20px 0"
  },

  choiceButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    width: "115px",
    padding: "17px 10px",
    border: "2px solid #f4b8d0",
    borderRadius: "18px",
    background: "#fff0f6",
    color: "#a94370",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  disabledButton: {
    opacity: 0.5,
    cursor: "not-allowed"
  },

  choiceEmoji: {
    fontSize: "38px"
  },

  resultArea: {
    marginTop: "25px",
    padding: "20px 10px",
    background: "#fff0f6",
    borderRadius: "20px"
  },

  battleRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
    margin: "20px 0"
  },

  battlePlayer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "7px",
    minWidth: "110px",
    fontWeight: "bold",
    color: "#ad4b79"
  },

  battleEmoji: {
    fontSize: "55px",
    display: "block",
    margin: "8px"
  },

  vs: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#d17b9e"
  },

  resultText: {
    color: "#c94f83",
    fontSize: "22px",
    margin: "15px 0"
  },

  winnerText: {
    color: "#c94f83",
    fontSize: "23px",
    margin: "20px 0"
  },

  playAgainButton: {
    padding: "13px 25px",
    border: "none",
    borderRadius: "25px",
    background: "linear-gradient(135deg, #f39cbd, #e98ab1)",
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 5px 12px rgba(200,80,130,0.2)"
  },

  redPanel: {
    padding: "25px 15px",
    background: "linear-gradient(135deg, #fff0f0, #ffe0e3)",
    border: "2px solid #ff9ca8",
    borderRadius: "22px"
  },

  bluePanel: {
    padding: "25px 15px",
    background: "linear-gradient(135deg, #edf3ff, #dce9ff)",
    border: "2px solid #91b7ff",
    borderRadius: "22px"
  },

  redTitle: {
    color: "#d9364e",
    fontSize: "25px",
    margin: "0 0 10px"
  },

  blueTitle: {
    color: "#326ac4",
    fontSize: "25px",
    margin: "0 0 10px"
  },

  redInstruction: {
    color: "#b83b50"
  },

  blueInstruction: {
    color: "#416db1"
  },

  redChoiceButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    width: "110px",
    padding: "16px 8px",
    border: "2px solid #ef8795",
    borderRadius: "17px",
    background: "#fff",
    color: "#c63750",
    fontWeight: "bold",
    cursor: "pointer"
  },

  blueChoiceButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    width: "110px",
    padding: "16px 8px",
    border: "2px solid #83aef5",
    borderRadius: "17px",
    background: "#fff",
    color: "#326ac4",
    fontWeight: "bold",
    cursor: "pointer"
  },

  playerHint: {
    fontSize: "13px",
    fontWeight: "bold",
    marginBottom: "0"
  },

  humanResultArea: {
    padding: "20px 10px",
    background: "#fff4f8",
    borderRadius: "20px"
  },

  redResult: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "7px",
    minWidth: "110px",
    padding: "15px",
    borderRadius: "18px",
    background: "#ffe0e3",
    color: "#c63750",
    fontWeight: "bold"
  },

  blueResult: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "7px",
    minWidth: "110px",
    padding: "15px",
    borderRadius: "18px",
    background: "#dce9ff",
    color: "#326ac4",
    fontWeight: "bold"
  },

  resetButton: {
    display: "block",
    margin: "20px auto",
    padding: "10px 22px",
    border: "1px solid #e8a6c1",
    borderRadius: "20px",
    background: "white",
    color: "#b44d7a",
    fontWeight: "bold",
    cursor: "pointer"
  },

  footer: {
    marginTop: "35px",
    color: "#bd7797",
    fontSize: "13px"
  }
};

export default App;