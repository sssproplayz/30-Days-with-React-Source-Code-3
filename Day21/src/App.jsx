import React, { useMemo, useState } from "react";

function App() {
  const [open, setOpen] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const sections = [
    {
      id: 1,
      category: "React",
      emoji: "⚛️",
      title: "What is React?",
      content:
        "React is a JavaScript library created for building interactive and reusable user interfaces. It allows developers to create websites using components that can be combined together to build complete applications.",
    },
    {
      id: 2,
      category: "React",
      emoji: "💗",
      title: "Why is React popular?",
      content:
        "React is popular because it makes user interface development easier through reusable components, state management, and efficient updates. It is also supported by a large developer community and has a huge ecosystem.",
    },
    {
      id: 3,
      category: "JSX",
      emoji: "✨",
      title: "What is JSX?",
      content:
        "JSX is a syntax extension for JavaScript that allows you to write HTML-like code inside JavaScript. It makes React components easier to read and write.",
    },
    {
      id: 4,
      category: "JSX",
      emoji: "🎀",
      title: "Is JSX required in React?",
      content:
        "JSX is not technically required, but it is commonly used because it makes React code much easier to understand. Without JSX, React elements can also be created using React.createElement().",
    },
    {
      id: 5,
      category: "Hooks",
      emoji: "🪄",
      title: "What is useState?",
      content:
        "useState is a React Hook that allows functional components to store and update information called state. When the state changes, React automatically re-renders the component.",
    },
    {
      id: 6,
      category: "Hooks",
      emoji: "🌸",
      title: "What is useEffect?",
      content:
        "useEffect is a React Hook used for performing side effects in components. Common examples include fetching data, setting timers, subscribing to events, and updating something outside the component.",
    },
    {
      id: 7,
      category: "Components",
      emoji: "🧁",
      title: "What is a component?",
      content:
        "A component is a reusable piece of a React application. Components can contain their own structure, styling, logic, and state. Large applications are usually built by combining many smaller components.",
    },
    {
      id: 8,
      category: "Components",
      emoji: "💅",
      title: "What are props?",
      content:
        "Props are values passed from one React component to another. They allow components to receive information from their parent component and make components more reusable.",
    },
    {
      id: 9,
      category: "State",
      emoji: "💞",
      title: "What is state?",
      content:
        "State is information stored inside a component that can change over time. When state changes, React updates the user interface so it reflects the new information.",
    },
    {
      id: 10,
      category: "State",
      emoji: "🩷",
      title: "What happens when state changes?",
      content:
        "When state changes, React schedules a re-render of the component. React then updates the parts of the interface that need to change.",
    },
  ];

  const categories = [
    "All",
    "React",
    "JSX",
    "Hooks",
    "Components",
    "State",
  ];

  const filteredSections = useMemo(() => {
    return sections.filter((section) => {
      const matchesSearch =
        section.title.toLowerCase().includes(search.toLowerCase()) ||
        section.content.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "All" ||
        section.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const toggleSection = (id) => {
    setOpen((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const openAll = () => {
    setOpen(filteredSections.map((section) => section.id));
  };

  const closeAll = () => {
    setOpen([]);
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div style={styles.page}>
      {/* Floating Decorations */}
      <div style={styles.decorOne}>🎀</div>
      <div style={styles.decorTwo}>♡</div>
      <div style={styles.decorThree}>✦</div>
      <div style={styles.decorFour}>🌸</div>
      <div style={styles.decorFive}>💗</div>

      <main style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerBow}>🎀</div>

          <div style={styles.eyebrow}>
            ✦ REACT • FAQ • NOTES ✦
          </div>

          <h1 style={styles.title}>
            React
            <span style={styles.titlePink}> FAQ </span>
            💗
          </h1>

          <p style={styles.subtitle}>
            Cute little answers for your React brain. 🧠✨
          </p>

          <div style={styles.sparkleLine}>
            ♡ ───────── ✦ ───────── ♡
          </div>
        </header>

        {/* Main Card */}
        <section style={styles.mainCard}>
          {/* Search */}
          <div style={styles.searchSection}>
            <label style={styles.searchLabel}>
              🔎 SEARCH YOUR QUESTION
            </label>

            <div style={styles.searchWrapper}>
              <span style={styles.searchIcon}>♡</span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search React, JSX, Hooks..."
                style={styles.searchInput}
              />

              {search && (
                <button
                  onClick={clearSearch}
                  style={styles.clearSearch}
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div style={styles.categorySection}>
            <span style={styles.categoryLabel}>
              CATEGORIES
            </span>

            <div style={styles.categoryRow}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  style={{
                    ...styles.categoryButton,
                    ...(activeCategory === category
                      ? styles.categoryButtonActive
                      : {}),
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div style={styles.controlRow}>
            <div style={styles.resultText}>
              <strong>{filteredSections.length}</strong>{" "}
              {filteredSections.length === 1
                ? "question"
                : "questions"}{" "}
              found 💌
            </div>

            <div style={styles.controlButtons}>
              <button
                onClick={openAll}
                style={styles.controlButton}
              >
                ✨ Open All
              </button>

              <button
                onClick={closeAll}
                style={styles.controlButton}
              >
                🌷 Close All
              </button>
            </div>
          </div>

          {/* Accordion */}
          <div style={styles.accordion}>
            {filteredSections.length > 0 ? (
              filteredSections.map((section, index) => {
                const isOpen = open.includes(section.id);

                return (
                  <div
                    key={section.id}
                    style={{
                      ...styles.accordionItem,
                      ...(isOpen
                        ? styles.accordionItemOpen
                        : {}),
                    }}
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      style={styles.question}
                    >
                      <div style={styles.questionLeft}>
                        <div
                          style={{
                            ...styles.questionEmoji,
                            ...(isOpen
                              ? styles.questionEmojiOpen
                              : {}),
                          }}
                        >
                          {section.emoji}
                        </div>

                        <div style={styles.questionTextArea}>
                          <span style={styles.questionCategory}>
                            {section.category}
                          </span>

                          <span style={styles.questionTitle}>
                            {section.title}
                          </span>
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.plusButton,
                          transform: isOpen
                            ? "rotate(45deg)"
                            : "rotate(0deg)",
                        }}
                      >
                        +
                      </div>
                    </button>

                    {isOpen && (
                      <div style={styles.answerWrapper}>
                        <div style={styles.answerLine} />

                        <p style={styles.answer}>
                          {section.content}
                        </p>

                        <div style={styles.answerFooter}>
                          <span>♡ happy learning!</span>
                          <span>✦</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div style={styles.emptyState}>
                <div style={styles.emptyEmoji}>🥺</div>

                <h2 style={styles.emptyTitle}>
                  No questions found!
                </h2>

                <p style={styles.emptyText}>
                  Your little search bunny couldn't find anything
                  matching that. Try another word! 🎀
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  style={styles.resetButton}
                >
                  🌸 Show Everything
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Bottom Card */}
        <section style={styles.studyCard}>
          <div style={styles.studyIcon}>📚</div>

          <div style={styles.studyText}>
            <h3 style={styles.studyTitle}>
              Tiny React Reminder 🎀
            </h3>

            <p style={styles.studyDescription}>
              Components + Props + State + Hooks = your React
              starter pack. ✨
            </p>
          </div>

          <div style={styles.studyDecor}>
            ♡
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <span>🎀</span>
          <span>Made with React & an unreasonable amount of pink</span>
          <span>💗</span>
        </footer>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    boxSizing: "border-box",
    padding: "45px 20px",
    background:
      "linear-gradient(135deg, #fff0f7 0%, #ffe4f0 40%, #f8e6ff 100%)",
    fontFamily:
      "'Trebuchet MS', 'Segoe UI', Arial, sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  container: {
    width: "100%",
    maxWidth: "850px",
    margin: "0 auto",
    position: "relative",
    zIndex: 2,
  },

  decorOne: {
    position: "fixed",
    top: "35px",
    left: "35px",
    fontSize: "45px",
    transform: "rotate(-15deg)",
    opacity: 0.8,
  },

  decorTwo: {
    position: "fixed",
    top: "70px",
    right: "50px",
    fontSize: "55px",
    color: "#ed8bb5",
    opacity: 0.55,
  },

  decorThree: {
    position: "fixed",
    bottom: "80px",
    left: "55px",
    fontSize: "40px",
    color: "#d88be7",
    opacity: 0.6,
  },

  decorFour: {
    position: "fixed",
    bottom: "35px",
    right: "50px",
    fontSize: "40px",
    opacity: 0.65,
  },

  decorFive: {
    position: "fixed",
    top: "45%",
    left: "4%",
    fontSize: "25px",
    opacity: 0.5,
  },

  header: {
    textAlign: "center",
    marginBottom: "28px",
  },

  headerBow: {
    fontSize: "52px",
    marginBottom: "5px",
    filter: "drop-shadow(0 5px 8px rgba(220, 110, 155, 0.15))",
  },

  eyebrow: {
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "3px",
    color: "#c25b86",
    marginBottom: "10px",
  },

  title: {
    margin: 0,
    fontSize: "46px",
    lineHeight: "1.1",
    fontWeight: "900",
    color: "#68465a",
  },

  titlePink: {
    color: "#dc568b",
  },

  subtitle: {
    color: "#987287",
    fontSize: "14px",
    margin: "12px 0 15px",
  },

  sparkleLine: {
    color: "#db8caf",
    fontSize: "13px",
    letterSpacing: "2px",
  },

  mainCard: {
    background: "rgba(255, 255, 255, 0.83)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "2px solid rgba(255, 190, 215, 0.65)",
    borderRadius: "30px",
    padding: "30px",
    boxShadow:
      "0 25px 70px rgba(190, 105, 150, 0.17)",
  },

  searchSection: {
    marginBottom: "22px",
  },

  searchLabel: {
    display: "block",
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "1.5px",
    color: "#8e5c72",
    marginBottom: "9px",
  },

  searchWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  searchIcon: {
    position: "absolute",
    left: "16px",
    color: "#d982a9",
    fontSize: "18px",
    zIndex: 1,
  },

  searchInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "16px 48px 16px 45px",
    borderRadius: "17px",
    border: "2px solid #f1c5d9",
    outline: "none",
    background: "#fffafd",
    color: "#704b5f",
    fontSize: "14px",
    fontWeight: "600",
  },

  clearSearch: {
    position: "absolute",
    right: "10px",
    width: "30px",
    height: "30px",
    border: "none",
    borderRadius: "50%",
    background: "#f9dce9",
    color: "#b6537c",
    fontSize: "20px",
    cursor: "pointer",
    lineHeight: "20px",
  },

  categorySection: {
    marginBottom: "20px",
  },

  categoryLabel: {
    display: "block",
    color: "#a17287",
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "1.5px",
    marginBottom: "9px",
  },

  categoryRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  categoryButton: {
    border: "1.5px solid #f0c7d9",
    borderRadius: "30px",
    padding: "8px 15px",
    background: "#fffafd",
    color: "#9b6d81",
    fontSize: "11px",
    fontWeight: "800",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  categoryButtonActive: {
    background:
      "linear-gradient(135deg, #e98bb3, #d98de7)",
    color: "white",
    borderColor: "transparent",
    boxShadow:
      "0 5px 14px rgba(216, 133, 174, 0.2)",
  },

  controlRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    padding: "15px 0",
    borderTop: "1px dashed #efcfdd",
    borderBottom: "1px dashed #efcfdd",
    marginBottom: "18px",
  },

  resultText: {
    color: "#a27387",
    fontSize: "11px",
  },

  controlButtons: {
    display: "flex",
    gap: "7px",
  },

  controlButton: {
    border: "none",
    background: "#fff0f6",
    color: "#bc5b83",
    padding: "7px 11px",
    borderRadius: "10px",
    fontSize: "10px",
    fontWeight: "800",
    cursor: "pointer",
  },

  accordion: {
    display: "flex",
    flexDirection: "column",
    gap: "11px",
  },

  accordionItem: {
    border: "1.5px solid #f1d2df",
    borderRadius: "19px",
    background: "#fffafd",
    overflow: "hidden",
    transition: "all 0.25s ease",
  },

  accordionItemOpen: {
    borderColor: "#eba8c5",
    background: "#fff6fa",
    boxShadow:
      "0 8px 25px rgba(205, 113, 155, 0.1)",
  },

  question: {
    width: "100%",
    border: "none",
    background: "transparent",
    padding: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    cursor: "pointer",
    textAlign: "left",
  },

  questionLeft: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    minWidth: 0,
  },

  questionEmoji: {
    width: "43px",
    height: "43px",
    minWidth: "43px",
    borderRadius: "14px",
    background: "#fff0f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "21px",
    transition: "all 0.2s ease",
  },

  questionEmojiOpen: {
    background:
      "linear-gradient(135deg, #ffe1ed, #f2ddff)",
    transform: "scale(1.05)",
  },

  questionTextArea: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    minWidth: 0,
  },

  questionCategory: {
    color: "#c56a8e",
    fontSize: "9px",
    fontWeight: "900",
    letterSpacing: "1.2px",
    textTransform: "uppercase",
  },

  questionTitle: {
    color: "#70495d",
    fontSize: "14px",
    fontWeight: "800",
  },

  plusButton: {
    width: "30px",
    height: "30px",
    minWidth: "30px",
    borderRadius: "50%",
    background: "#ffe6f0",
    color: "#c35581",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "21px",
    fontWeight: "400",
    transition: "transform 0.25s ease",
  },

  answerWrapper: {
    padding: "0 18px 18px 71px",
  },

  answerLine: {
    height: "1px",
    background:
      "linear-gradient(90deg, #f2bed4, transparent)",
    marginBottom: "12px",
  },

  answer: {
    color: "#947184",
    fontSize: "13px",
    lineHeight: "1.7",
    margin: 0,
  },

  answerFooter: {
    display: "flex",
    justifyContent: "space-between",
    color: "#d58aaa",
    fontSize: "10px",
    fontWeight: "700",
    marginTop: "13px",
  },

  emptyState: {
    textAlign: "center",
    padding: "45px 20px",
    background: "#fffafd",
    borderRadius: "20px",
    border: "1.5px dashed #efbfd4",
  },

  emptyEmoji: {
    fontSize: "48px",
    marginBottom: "8px",
  },

  emptyTitle: {
    color: "#774c62",
    fontSize: "20px",
    margin: "0 0 8px",
  },

  emptyText: {
    color: "#a47b8f",
    fontSize: "12px",
    lineHeight: "1.6",
    maxWidth: "400px",
    margin: "0 auto 18px",
  },

  resetButton: {
    border: "none",
    borderRadius: "14px",
    padding: "11px 17px",
    background:
      "linear-gradient(135deg, #e98bb3, #d98de7)",
    color: "white",
    fontSize: "11px",
    fontWeight: "800",
    cursor: "pointer",
  },

  studyCard: {
    marginTop: "18px",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,237,247,0.9))",
    border: "1.5px solid #f0c7d9",
    borderRadius: "22px",
    padding: "18px 20px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    position: "relative",
    overflow: "hidden",
  },

  studyIcon: {
    width: "48px",
    height: "48px",
    minWidth: "48px",
    borderRadius: "15px",
    background: "#ffe4ef",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "23px",
  },

  studyText: {
    flex: 1,
  },

  studyTitle: {
    color: "#814f68",
    fontSize: "13px",
    margin: "0 0 4px",
  },

  studyDescription: {
    color: "#a47a8e",
    fontSize: "11px",
    lineHeight: "1.5",
    margin: 0,
  },

  studyDecor: {
    color: "#e28cae",
    fontSize: "35px",
    opacity: 0.7,
  },

  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "9px",
    color: "#aa7890",
    fontSize: "10px",
    marginTop: "20px",
    textAlign: "center",
  },
};

export default App;