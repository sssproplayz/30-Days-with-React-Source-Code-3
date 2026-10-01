import React, { useEffect, useState } from "react";

function App() {
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("pookieNotes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("pookieNotes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!title.trim() && !note.trim()) return;

    const newNote = {
      id: Date.now(),
      title: title || "Untitled Note",
      text: note,
      category: category,
      favorite: false,
      pinned: false,
      date: new Date().toLocaleString(),
    };

    setNotes([newNote, ...notes]);

    setTitle("");
    setNote("");
    setCategory("Personal");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((item) => item.id !== id));
  };

  const toggleFavorite = (id) => {
    setNotes(
      notes.map((item) =>
        item.id === id
          ? { ...item, favorite: !item.favorite }
          : item
      )
    );
  };

  const togglePin = (id) => {
    setNotes(
      notes.map((item) =>
        item.id === id
          ? { ...item, pinned: !item.pinned }
          : item
      )
    );
  };

  const editNote = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setNote(item.text);
    setCategory(item.category);
  };

  const updateNote = () => {
    if (!title.trim() && !note.trim()) return;

    setNotes(
      notes.map((item) =>
        item.id === editingId
          ? {
              ...item,
              title: title || "Untitled Note",
              text: note,
              category: category,
              date: new Date().toLocaleString(),
            }
          : item
      )
    );

    setEditingId(null);
    setTitle("");
    setNote("");
    setCategory("Personal");
  };

  const copyNote = (text) => {
    navigator.clipboard.writeText(text);
    alert("Note copied! 🎀");
  };

  const clearAll = () => {
    if (notes.length === 0) return;

    const confirmDelete = window.confirm(
      "Delete all your notes? 🥺"
    );

    if (confirmDelete) {
      setNotes([]);
    }
  };

  const filteredNotes = notes
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.text.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "Favorites" && item.favorite) ||
        (filter === "Pinned" && item.pinned) ||
        item.category === filter;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));

  return (
    <div style={darkMode ? styles.darkApp : styles.app}>
      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.heading}>🎀 Pookie Notes</h1>
            <p style={styles.subtitle}>
              Your tiny corner for big thoughts ♡
            </p>
          </div>

          <button
            style={styles.darkButton}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* STATS */}
        <div style={styles.stats}>
          <div style={styles.statBox}>
            📝 <b>{notes.length}</b>
            <span>Total Notes</span>
          </div>

          <div style={styles.statBox}>
            ⭐ <b>{notes.filter((n) => n.favorite).length}</b>
            <span>Favorites</span>
          </div>

          <div style={styles.statBox}>
            📌 <b>{notes.filter((n) => n.pinned).length}</b>
            <span>Pinned</span>
          </div>
        </div>

        {/* NOTE CREATOR */}
        <div style={styles.editor}>
          <input
            type="text"
            placeholder="✨ Give your note a cute title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your little thoughts here... 💭"
            style={styles.textarea}
          />

          <div style={styles.editorBottom}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={styles.select}
            >
              <option>Personal</option>
              <option>College</option>
              <option>Ideas</option>
              <option>Important</option>
              <option>To-Do</option>
            </select>

            <span style={styles.counter}>
              {note.length} characters
            </span>

            {editingId ? (
              <button
                onClick={updateNote}
                style={styles.saveButton}
              >
                💖 Update Note
              </button>
            ) : (
              <button
                onClick={addNote}
                style={styles.saveButton}
              >
                🎀 Save Note
              </button>
            )}
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div style={styles.controls}>
          <input
            type="text"
            placeholder="🔍 Search your notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={styles.select}
          >
            <option>All</option>
            <option>Favorites</option>
            <option>Pinned</option>
            <option>Personal</option>
            <option>College</option>
            <option>Ideas</option>
            <option>Important</option>
            <option>To-Do</option>
          </select>

          <button
            onClick={clearAll}
            style={styles.clearButton}
          >
            🗑️ Clear All
          </button>
        </div>

        {/* NOTES */}
        <div style={styles.notesGrid}>

          {filteredNotes.length === 0 ? (
            <div style={styles.empty}>
              <div style={styles.emptyEmoji}>🧸</div>
              <h2>No notes found!</h2>
              <p>
                Your thoughts are hiding somewhere.
                <br />
                Write something cute above ♡
              </p>
            </div>
          ) : (
            filteredNotes.map((item) => (
              <div
                key={item.id}
                style={{
                  ...styles.note,
                  ...(item.pinned ? styles.pinned : {}),
                }}
              >

                {/* NOTE TOP */}
                <div style={styles.noteTop}>
                  <span style={styles.category}>
                    {item.category}
                  </span>

                  <div>
                    <button
                      onClick={() => togglePin(item.id)}
                      style={styles.iconButton}
                      title="Pin note"
                    >
                      {item.pinned ? "📌" : "📍"}
                    </button>

                    <button
                      onClick={() => toggleFavorite(item.id)}
                      style={styles.iconButton}
                      title="Favorite"
                    >
                      {item.favorite ? "❤️" : "♡"}
                    </button>
                  </div>
                </div>

                {/* NOTE CONTENT */}
                <h2 style={styles.noteTitle}>
                  {item.title}
                </h2>

                <p style={styles.noteText}>
                  {item.text}
                </p>

                <p style={styles.date}>
                  🕒 {item.date}
                </p>

                {/* NOTE ACTIONS */}
                <div style={styles.actions}>

                  <button
                    onClick={() => editNote(item)}
                    style={styles.editButton}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => copyNote(item.text)}
                    style={styles.copyButton}
                  >
                    📋 Copy
                  </button>

                  <button
                    onClick={() => deleteNote(item.id)}
                    style={styles.deleteButton}
                  >
                    🗑️ Delete
                  </button>

                </div>
              </div>
            ))
          )}

        </div>

        <footer style={styles.footer}>
          Made with 🎀 + React
        </footer>

      </div>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #fff0f6, #ffe4ef, #fff7fb)",
    padding: "30px 15px",
    transition: "0.3s",
  },

  darkApp: {
    minHeight: "100vh",
    background: "#211923",
    color: "#fff",
    padding: "30px 15px",
  },

  container: {
    maxWidth: "1000px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  heading: {
    margin: 0,
    color: "#d63384",
    fontSize: "38px",
  },

  subtitle: {
    marginTop: "5px",
    color: "#9b6b7d",
  },

  darkButton: {
    border: "none",
    padding: "10px 15px",
    borderRadius: "20px",
    background: "#d63384",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  stats: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },

  statBox: {
    flex: 1,
    background: "rgba(255,255,255,0.8)",
    padding: "15px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(214,51,132,0.12)",
  },

  editor: {
    background: "white",
    padding: "20px",
    borderRadius: "22px",
    boxShadow: "0 8px 25px rgba(214,51,132,0.15)",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "none",
    outline: "none",
    fontSize: "22px",
    fontWeight: "bold",
    padding: "10px",
    marginBottom: "10px",
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    height: "120px",
    border: "2px solid #ffd1e3",
    borderRadius: "15px",
    padding: "15px",
    resize: "vertical",
    outline: "none",
    fontSize: "15px",
  },

  editorBottom: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "12px",
    flexWrap: "wrap",
  },

  select: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ffc4da",
    background: "#fff7fb",
  },

  counter: {
    color: "#999",
    fontSize: "13px",
    marginRight: "auto",
  },

  saveButton: {
    border: "none",
    padding: "11px 18px",
    borderRadius: "20px",
    background: "#d63384",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  controls: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },

  search: {
    flex: 1,
    minWidth: "200px",
    padding: "12px",
    borderRadius: "12px",
    border: "2px solid #ffd1e3",
    outline: "none",
  },

  clearButton: {
    border: "none",
    borderRadius: "12px",
    padding: "10px 15px",
    background: "#ff6b81",
    color: "white",
    cursor: "pointer",
  },

  notesGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
  },

  note: {
    background: "#fff",
    borderRadius: "20px",
    padding: "18px",
    boxShadow: "0 5px 18px rgba(214,51,132,0.12)",
    border: "2px solid #ffe1ec",
  },

  pinned: {
    border: "2px solid #ffb3d1",
    boxShadow: "0 5px 20px rgba(214,51,132,0.2)",
  },

  noteTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  category: {
    background: "#ffe1ec",
    color: "#c2256e",
    padding: "5px 10px",
    borderRadius: "15px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  iconButton: {
    border: "none",
    background: "transparent",
    fontSize: "20px",
    cursor: "pointer",
  },

  noteTitle: {
    color: "#c2256e",
    marginBottom: "5px",
  },

  noteText: {
    color: "#555",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
  },

  date: {
    fontSize: "11px",
    color: "#aaa",
  },

  actions: {
    display: "flex",
    gap: "7px",
    marginTop: "15px",
  },

  editButton: {
    flex: 1,
    border: "none",
    padding: "8px",
    borderRadius: "10px",
    background: "#ffe3ef",
    cursor: "pointer",
  },

  copyButton: {
    flex: 1,
    border: "none",
    padding: "8px",
    borderRadius: "10px",
    background: "#f4e4ff",
    cursor: "pointer",
  },

  deleteButton: {
    flex: 1,
    border: "none",
    padding: "8px",
    borderRadius: "10px",
    background: "#ffd6dc",
    cursor: "pointer",
  },

  empty: {
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "60px 20px",
    background: "rgba(255,255,255,0.7)",
    borderRadius: "25px",
  },

  emptyEmoji: {
    fontSize: "60px",
  },

  footer: {
    textAlign: "center",
    marginTop: "35px",
    color: "#b2778f",
    fontSize: "13px",
  },
};

export default App;
