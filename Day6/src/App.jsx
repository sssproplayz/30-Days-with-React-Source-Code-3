import React, { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const locations = [
    {
      name: "Italy",
      city: "Rome",
      timeZone: "Europe/Rome",
      emoji: "🇮🇹"
    },
    {
      name: "Japan",
      city: "Tokyo",
      timeZone: "Asia/Tokyo",
      emoji: "🇯🇵"
    },
    {
      name: "India",
      city: "Mumbai",
      timeZone: "Asia/Kolkata",
      emoji: "🇮🇳"
    },
    {
      name: "USA",
      city: "New York",
      timeZone: "America/New_York",
      emoji: "🇺🇸"
    },
    {
      name: "UK",
      city: "London",
      timeZone: "Europe/London",
      emoji: "🇬🇧"
    }
  ];

  const getTime = (timeZone) => {
    return time.toLocaleTimeString("en-US", {
      timeZone: timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };

  const getDate = (timeZone) => {
    return time.toLocaleDateString("en-US", {
      timeZone: timeZone,
      weekday: "short",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <div style={styles.decorations}>🎀 ✦ ♡ ✦ 🎀</div>

        <h1 style={styles.title}>World Clock</h1>

        <p style={styles.subtitle}>
          ♡ little clocks around the world ♡
        </p>
      </div>

      <div style={styles.clockGrid}>

        {locations.map((location) => (
          <div style={styles.card} key={location.timeZone}>

            <div style={styles.cardTop}>
              <span style={styles.flag}>{location.emoji}</span>

              <div>
                <h2 style={styles.country}>{location.name}</h2>
                <p style={styles.city}>{location.city}</p>
              </div>
            </div>

            <div style={styles.clock}>
              {getTime(location.timeZone)}
            </div>

            <div style={styles.date}>
              {getDate(location.timeZone)}
            </div>

            <div style={styles.heart}>♡</div>

          </div>
        ))}

      </div>

      <p style={styles.footer}>
        ✦ time is prettier together ✦
      </p>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    boxSizing: "border-box",
    padding: "45px 25px",
    background:
      "linear-gradient(135deg, #ffe5f1, #ffd2e5, #fff1f7)",
    fontFamily: "Arial, sans-serif",
    textAlign: "center"
  },

  header: {
    marginBottom: "35px"
  },

  decorations: {
    fontSize: "25px",
    marginBottom: "12px"
  },

  title: {
    margin: "0",
    color: "#d94d8c",
    fontSize: "42px",
    fontWeight: "bold"
  },

  subtitle: {
    color: "#a85b7d",
    fontSize: "15px",
    marginTop: "10px"
  },

  clockGrid: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "22px"
  },

  card: {
    background: "rgba(255, 255, 255, 0.82)",
    border: "3px solid #ffffff",
    borderRadius: "28px",
    padding: "25px 20px",
    boxShadow: "0 12px 30px rgba(210, 91, 140, 0.18)"
  },

  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "18px"
  },

  flag: {
    fontSize: "38px"
  },

  country: {
    margin: "0",
    color: "#c94f83",
    fontSize: "22px"
  },

  city: {
    margin: "4px 0 0",
    color: "#a66b85",
    fontSize: "13px"
  },

  clock: {
    background: "#fff0f6",
    borderRadius: "18px",
    padding: "17px 8px",
    color: "#d63f80",
    fontSize: "30px",
    fontWeight: "bold",
    letterSpacing: "1px",
    border: "2px solid #ffd0e3"
  },

  date: {
    marginTop: "13px",
    color: "#9f637e",
    fontSize: "14px",
    fontWeight: "bold"
  },

  heart: {
    color: "#e67ca9",
    fontSize: "20px",
    marginTop: "10px"
  },

  footer: {
    marginTop: "32px",
    color: "#b45c82",
    fontSize: "14px",
    fontWeight: "bold"
  }
};

export default App;