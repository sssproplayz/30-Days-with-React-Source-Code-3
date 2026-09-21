import React, { useState } from "react";

function App() {
  const quotes = [
    "Every chapter you finish earns you a new way I'll make you moan tonight",
    "Your success is my aphrodisiac—let's fuck our way to the top",
    "Study hard, baby, so we can travel the world naked later",
    "I want to see your name on Forbes before I see it on my dick",
    "One day your resume will be as impressive as your orgasm face",
    "You're not just building a career—you're building our fuck empire",
    "Every late-night study session means I get to reward you with morning wood",
    "Baby, when you land that promotion, I'm taking you in the office supply closet",
    "Discipline now equals designer lingerie later, love",
    "You turn ambition into foreplay; that's why I can't stop thinking about bending you over your desk",
    "The harder you grind at work, the harder I'll grind between your legs",
    "Imagine us signing deals by day and spilling champagne over each other by night",
    "You're earning every dollar—and every inch of my cock",
    "Study like a queen, rule like a boss, sin like my lover",
    "When you get that PhD, I'll be waiting with lube and congratulations",
    "I want to hear 'yes sir' in the boardroom and 'fuck me harder' in bed",
    "One day we'll toast your success naked in a beach villa—you just need to keep going",
    "You turn ambition into foreplay; that's why I can't stop thinking about fucking your brains out",
    "The more degrees you earn, the more positions we can try",
    "My favorite version of you? The one with ink on your notes and lust on your lips",
    "Babe, let's make a deal: for every hour of studying, 10 minutes of pleasure—starting now",
    "I love watching you focus. It makes me want to bend you over and distract you.",
    "When we finally retire rich from all this hard work—I'm still gonna spank your ass daily.",
    "You're not just learning math; you're calculating how many orgasms we can fit in one night.",
    "If studying gets too boring—I'll read dirty stories while fingering myself for motivation.",
    "I bet if we fucked right now—you'd remember this lesson better than any textbook.",
    "One day these books will collect dust while my hands explore every inch of yours.",
    "Every A+ you earn earns you an hour of my tongue between your legs.",
  "Study hard, fuck harder—that's our motto, baby.",
  "I want to watch you ace that exam, then watch you cum on my face.",
  "The only thing hotter than your GPA is your pussy on my mouth.",
  "Finish that chapter and I'll finish you—deal?",
  "You're building an empire, I'm building an appetite for your body.",
  "That big brain of yours makes my dick so fucking hard.",
  "Pass the test, then let me test every inch of your stamina.",
  "I don't know what's sexier—you quoting textbooks or screaming my name.",
  "Your ambition turns me on almost as much as your naked body does.",
  "Study now, ride me later—fair trade, yeah?",
  "I want to be the reason you take breaks from studying.",
  "Smart girls who swallow are my favorite kind of distraction.",
  "Get that degree, then get on your knees for me.",
  "You're gonna be so successful—and I'm gonna be so deep inside you.",
  "Hard work by day, getting railed by night—that's the life.",
  "Your focus is hot, but your O-face is hotter.",
  "I'll quiz you on flashcards while you ride my cock—multitasking.",
  "The more you achieve, the more I want to worship your body.",
  "Future CEO getting face-fucked tonight—that's the energy.",
  "Study your notes, then study how I make you cum.",
  "I want to celebrate every win with my face buried in your pussy.",
  "You're gonna run the world, and I'm gonna run my hands all over you.",
  "Ambition is sexy, but you naked and panting is sexier.",
  "Keep grinding at your goals, then grind on my dick.",
  "I want to fuck the stress out of you after every exam.",
  "Your success story starts with you bent over my desk.",
  "Smart, successful, and soaked—that's how I like you.",
  "Every milestone means you get to cum as many times as you want.",
  "Work hard now so we can fuck raw in a penthouse later."
  ];

  const [quote, setQuote] = useState(quotes[0]);

  const randomQuote = () => {
    const index = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[index]);
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <div style={styles.decorations}>
          🎀 ✦ ♡ ✦ 🎀
        </div>

        <p style={styles.smallTitle}>
          ✧ DAILY DOSE OF MOTIVATION ✧
        </p>

        <h1 style={styles.title}>
          Random Quote
        </h1>

        <div style={styles.quoteBox}>
          <div style={styles.quoteMark}>"</div>

          <p style={styles.quote}>
            {quote}
          </p>

          <div style={styles.quoteMarkBottom}>"</div>
        </div>

        <button
          onClick={randomQuote}
          style={styles.button}
        >
          🎀 New Quote 🎀
        </button>

        <p style={styles.footer}>
          ♡ keep dreaming • keep learning • keep going ♡
        </p>

      </div>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "25px",
    boxSizing: "border-box",
    background:
      "linear-gradient(135deg, #ffe5f1, #ffd2e6, #fff0f7)",
    fontFamily: "Arial, sans-serif"
  },

  card: {
    width: "600px",
    maxWidth: "100%",
    padding: "45px 35px",
    boxSizing: "border-box",
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.82)",
    border: "3px solid white",
    borderRadius: "35px",
    boxShadow: "0 18px 40px rgba(207, 85, 137, 0.22)"
  },

  decorations: {
    fontSize: "25px",
    marginBottom: "15px"
  },

  smallTitle: {
    color: "#c45a86",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "2px",
    marginBottom: "8px"
  },

  title: {
    color: "#d64483",
    fontSize: "38px",
    margin: "0 0 30px"
  },

  quoteBox: {
    position: "relative",
    background:
      "linear-gradient(135deg, #fff0f6, #ffe1ed)",
    border: "2px solid #f7b5d0",
    borderRadius: "25px",
    padding: "35px 30px",
    marginBottom: "25px"
  },

  quoteMark: {
    color: "#e47eaa",
    fontSize: "45px",
    fontWeight: "bold",
    lineHeight: "20px"
  },

  quote: {
    color: "#8f4c6b",
    fontSize: "22px",
    lineHeight: "1.6",
    fontWeight: "600",
    margin: "15px 5px"
  },

  quoteMarkBottom: {
    color: "#e47eaa",
    fontSize: "45px",
    fontWeight: "bold",
    lineHeight: "15px"
  },

  button: {
    padding: "14px 28px",
    border: "none",
    borderRadius: "30px",
    background:
      "linear-gradient(135deg, #e85b98, #d94382)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(213, 65, 126, 0.25)"
  },

  footer: {
    color: "#b56888",
    fontSize: "13px",
    marginTop: "25px",
    fontWeight: "bold"
  }
};

export default App;