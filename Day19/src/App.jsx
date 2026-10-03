import React, { useState } from "react";

function App() {
  const items = [
    {
      name: "React",
      emoji: "⚛️",
      category: "Frontend",
      color: "#61dafb"
    },
    {
      name: "JavaScript",
      emoji: "💛",
      category: "Programming",
      color: "#f7df1e"
    },
    {
      name: "Python",
      emoji: "🐍",
      category: "Programming",
      color: "#3776ab"
    },
    {
      name: "Java",
      emoji: "☕",
      category: "Programming",
      color: "#ed8b00"
    },
    {
      name: "C++",
      emoji: "⚙️",
      category: "Programming",
      color: "#00599c"
    },
    {
      name: "HTML",
      emoji: "🌐",
      category: "Web",
      color: "#e34f26"
    },
    {
      name: "CSS",
      emoji: "🎨",
      category: "Styling",
      color: "#1572b6"
    },
    {
      name: "Node.js",
      emoji: "🟢",
      category: "Backend",
      color: "#339933"
    },
    {
      name: "SQL",
      emoji: "🗃️",
      category: "Database",
      color: "#4479a1"
    },
    {
      name: "Git",
      emoji: "🌳",
      category: "Tools",
      color: "#f05032"
    },
    {
      name: "GitHub",
      emoji: "🐙",
      category: "Tools",
      color: "#24292e"
    },
    {
      name: "Flutter",
      emoji: "💙",
      category: "Mobile",
      color: "#02569b"
    }
  ];

  const [search, setSearch] = useState("");

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const highlightText = (text) => {
    if (!search.trim()) {
      return text;
    }

    const parts = text.split(
      new RegExp(`(${search})`, "gi")
    );

    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <mark key={index} style={styles.highlight}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div style={styles.container}>

      {/* DECORATIONS */}

      <div style={styles.topDecor}>
        🎀 ✦ ♡ ✦ 🎀
      </div>

      <div style={styles.sparkleOne}>✦</div>
      <div style={styles.sparkleTwo}>♡</div>
      <div style={styles.sparkleThree}>✧</div>

      {/* MAIN CARD */}

      <div style={styles.mainCard}>

        <div style={styles.header}>

          <div style={styles.iconCircle}>
            🔍
          </div>

          <h1 style={styles.title}>
            Search & Find
          </h1>

          <p style={styles.subtitle}>
            Find your favorite techie things 💻💗
          </p>

        </div>

        {/* SEARCH BAR */}

        <div style={styles.searchWrapper}>

          <span style={styles.searchIcon}>
            🔍
          </span>

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search for a skill..."
            style={styles.input}
          />

          {search && (
            <button
              onClick={clearSearch}
              style={styles.clearButton}
            >
              ×
            </button>
          )}

        </div>

        <p style={styles.shortcut}>
          ✨ Try searching for React, Python, CSS...
        </p>

        {/* RESULT COUNT */}

        <div style={styles.resultHeader}>

          <span style={styles.resultText}>
            {search
              ? `💌 Results for "${search}"`
              : "🌸 All Skills"}
          </span>

          <span style={styles.resultCount}>
            {filtered.length} found
          </span>

        </div>

        {/* RESULTS */}

        {filtered.length > 0 ? (

          <div style={styles.grid}>

            {filtered.map((item) => (

              <div
                key={item.name}
                style={{
                  ...styles.itemCard,
                  borderTop: `4px solid ${item.color}`
                }}
              >

                <div
                  style={{
                    ...styles.itemEmoji,
                    background: `${item.color}18`
                  }}
                >
                  {item.emoji}
                </div>

                <div style={styles.itemInfo}>

                  <h3 style={styles.itemName}>
                    {highlightText(item.name)}
                  </h3>

                  <span style={styles.category}>
                    {item.category}
                  </span>

                </div>

                <span style={styles.heart}>
                  ♡
                </span>

              </div>

            ))}

          </div>

        ) : (

          /* EMPTY STATE */

          <div style={styles.emptyState}>

            <div style={styles.emptyEmoji}>
              🥺💔
            </div>

            <h2 style={styles.emptyTitle}>
              Nothing found!
            </h2>

            <p style={styles.emptyText}>
              Your search is being a little
              too mysterious.
            </p>

            <button
              onClick={clearSearch}
              style={styles.tryButton}
            >
              🎀 Show Everything
            </button>

          </div>

        )}

        {/* FOOTER STATS */}

        <div style={styles.footerStats}>

          <div style={styles.footerItem}>
            <span>📚</span>
            <strong>{items.length}</strong>
            <small>Skills</small>
          </div>

          <div style={styles.divider} />

          <div style={styles.footerItem}>
            <span>🔎</span>
            <strong>{filtered.length}</strong>
            <small>Matches</small>
          </div>

          <div style={styles.divider} />

          <div style={styles.footerItem}>
            <span>💗</span>
            <strong>
              {search ? "Searching" : "Ready"}
            </strong>
            <small>Status</small>
          </div>

        </div>

      </div>

      {/* FOOTER */}

      <p style={styles.footer}>
        made with ♡, caffeine & questionable
        amounts of CSS 🎀
      </p>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    boxSizing: "border-box",
    padding: "35px 18px",
    background:
      "linear-gradient(135deg, #ffdce9, #fff0f7, #f8e2ff)",
    fontFamily:
      "'Trebuchet MS', Arial, sans-serif",
    position: "relative",
    overflow: "hidden"
  },

  topDecor: {
    textAlign: "center",
    fontSize: "27px",
    marginBottom: "15px",
    color: "#cf5c8a"
  },

  sparkleOne: {
    position: "absolute",
    top: "100px",
    left: "8%",
    fontSize: "25px",
    color: "#e894b5"
  },

  sparkleTwo: {
    position: "absolute",
    top: "240px",
    right: "8%",
    fontSize: "30px",
    color: "#e68db1"
  },

  sparkleThree: {
    position: "absolute",
    bottom: "150px",
    left: "10%",
    fontSize: "22px",
    color: "#d99ac0"
  },

  mainCard: {
    width: "100%",
    maxWidth: "850px",
    margin: "0 auto",
    padding: "30px",
    boxSizing: "border-box",
    background: "rgba(255, 255, 255, 0.82)",
    backdropFilter: "blur(15px)",
    borderRadius: "30px",
    boxShadow:
      "0 20px 50px rgba(190, 85, 135, 0.18)"
  },

  header: {
    textAlign: "center",
    marginBottom: "25px"
  },

  iconCircle: {
    width: "65px",
    height: "65px",
    margin: "0 auto 12px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #f7aec9, #e98db2)",
    fontSize: "29px",
    boxShadow:
      "0 8px 20px rgba(210, 90, 140, 0.2)"
  },

  title: {
    color: "#c44e80",
    fontSize: "clamp(30px, 6vw, 42px)",
    margin: "0 0 5px",
    fontWeight: "bold"
  },

  subtitle: {
    color: "#b87594",
    fontSize: "14px",
    margin: "0"
  },

  searchWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#fff",
    border: "2px solid #f2bed2",
    borderRadius: "20px",
    padding: "5px 10px 5px 15px",
    boxShadow:
      "0 7px 20px rgba(190, 80, 130, 0.1)"
  },

  searchIcon: {
    fontSize: "20px"
  },

  input: {
    flex: "1",
    minWidth: "0",
    border: "none",
    outline: "none",
    background: "transparent",
    padding: "13px 5px",
    fontSize: "16px",
    color: "#934766",
    fontFamily:
      "'Trebuchet MS', Arial, sans-serif"
  },

  clearButton: {
    width: "32px",
    height: "32px",
    border: "none",
    borderRadius: "50%",
    background: "#ffe0eb",
    color: "#c54f80",
    fontSize: "22px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  shortcut: {
    textAlign: "center",
    fontSize: "11px",
    color: "#bd86a1",
    margin: "9px 0 25px"
  },

  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px"
  },

  resultText: {
    color: "#a64b72",
    fontSize: "15px",
    fontWeight: "bold"
  },

  resultCount: {
    background: "#ffe1ed",
    color: "#c14e7d",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "bold"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "14px"
  },

  itemCard: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "13px",
    padding: "17px",
    background: "#fff",
    borderRadius: "19px",
    boxShadow:
      "0 6px 18px rgba(190, 80, 130, 0.08)",
    transition:
      "transform 0.2s ease, box-shadow 0.2s ease"
  },

  itemEmoji: {
    width: "48px",
    height: "48px",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px",
    flexShrink: 0
  },

  itemInfo: {
    flex: "1",
    minWidth: "0"
  },

  itemName: {
    margin: "0 0 5px",
    color: "#9f456c",
    fontSize: "16px"
  },

  category: {
    display: "inline-block",
    background: "#fff0f6",
    color: "#bd7191",
    padding: "4px 8px",
    borderRadius: "10px",
    fontSize: "9px",
    fontWeight: "bold"
  },

  heart: {
    color: "#e89ab8",
    fontSize: "22px"
  },

  highlight: {
    background: "#ffd2e4",
    color: "#b83f70",
    borderRadius: "4px",
    padding: "1px 2px"
  },

  emptyState: {
    textAlign: "center",
    padding: "45px 20px",
    background: "#fff7fa",
    borderRadius: "22px"
  },

  emptyEmoji: {
    fontSize: "55px",
    marginBottom: "10px"
  },

  emptyTitle: {
    color: "#c44e80",
    margin: "5px 0"
  },

  emptyText: {
    color: "#b67b96",
    fontSize: "13px"
  },

  tryButton: {
    border: "none",
    borderRadius: "20px",
    padding: "11px 20px",
    background:
      "linear-gradient(135deg, #f2a1c2, #dc709f)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px"
  },

  footerStats: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "25px",
    marginTop: "28px",
    paddingTop: "22px",
    borderTop: "1px solid #f2d5e1",
    flexWrap: "wrap"
  },

  footerItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "3px",
    color: "#b66f8e"
  },

  divider: {
    width: "1px",
    height: "35px",
    background: "#edcad9"
  },

  footer: {
    textAlign: "center",
    color: "#b77b97",
    fontSize: "12px",
    marginTop: "22px"
  }
};

export default App;