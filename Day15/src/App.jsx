import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// PDF worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(false);

  // =========================
  // EXTRACT PDF TEXT
  // =========================
  const extractPDF = async (selectedFile) => {
    setLoading(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
      }).promise;

      let extractedText = "";

      for (let page = 1; page <= pdf.numPages; page++) {
        const pdfPage = await pdf.getPage(page);

        const content = await pdfPage.getTextContent();

        const pageText = content.items
          .map((item) => item.str)
          .join(" ");

        extractedText += pageText + "\n";
      }

      setText(extractedText);

      generateFlashcards(extractedText);
    } catch (error) {
      console.error(error);
      alert("Couldn't read this PDF 😭");
    }

    setLoading(false);
  };

  // =========================
  // GENERATE FLASHCARDS
  // =========================
  const generateFlashcards = (content) => {
    const sentences = content
      .replace(/\s+/g, " ")
      .split(/[.!?]/)
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 30);

    const cards = sentences.slice(0, 20).map((sentence) => {
      const words = sentence.split(" ");

      const keyword =
        words
          .filter((word) => word.length > 5)
          .sort((a, b) => b.length - a.length)[0] ||
        "this topic";

      return {
        question: `What does the PDF say about "${keyword}"?`,
        answer: sentence,
      };
    });

    setFlashcards(cards);
    setCurrent(0);
    setShowAnswer(false);
  };

  // =========================
  // HANDLE PDF UPLOAD
  // =========================
  const handleFile = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Bestie... that's not a PDF. 😭");
      return;
    }

    setFile(selectedFile);
    extractPDF(selectedFile);
  };

  // =========================
  // FLASHCARD CONTROLS
  // =========================
  const nextCard = () => {
    if (current < flashcards.length - 1) {
      setCurrent(current + 1);
      setShowAnswer(false);
    }
  };

  const previousCard = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setShowAnswer(false);
    }
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  // =========================
  // UI
  // =========================
  return (
    <div style={styles.app}>

      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.logo}>🎀</div>

        <h1 style={styles.title}>
          Pookie Notes
        </h1>

        <p style={styles.subtitle}>
          Turn boring PDFs into cute little flashcards ✨
        </p>
      </div>

      {/* UPLOAD AREA */}
      <div style={styles.uploadBox}>

        <div style={styles.uploadIcon}>
          📚
        </div>

        <h2 style={styles.uploadTitle}>
          Upload your study PDF
        </h2>

        <p style={styles.uploadText}>
          I'll extract the information and turn it into flashcards 💗
        </p>

        <label style={styles.uploadButton}>
          📄 Choose PDF

          <input
            type="file"
            accept=".pdf"
            onChange={handleFile}
            style={{ display: "none" }}
          />
        </label>

        {file && (
          <div style={styles.fileName}>
            💗 {file.name}
          </div>
        )}

        {loading && (
          <div style={styles.loading}>
            ✨ Reading your PDF...
          </div>
        )}

      </div>

      {/* FLASHCARDS */}
      {flashcards.length > 0 && (

        <div style={styles.studyArea}>

          <div style={styles.sectionTitle}>
            💭 Flashcard Time
          </div>

          <div style={styles.progress}>
            Card {current + 1} / {flashcards.length}
          </div>

          {/* FLASHCARD */}
          <div
            style={styles.flashcard}
            onClick={toggleAnswer}
          >

            {!showAnswer ? (
              <>
                <div style={styles.cardLabel}>
                  QUESTION 💭
                </div>

                <h2 style={styles.question}>
                  {flashcards[current].question}
                </h2>

                <div style={styles.tapHint}>
                  Tap to reveal the answer ✨
                </div>
              </>
            ) : (
              <>
                <div style={styles.cardLabel}>
                  ANSWER 💗
                </div>

                <h2 style={styles.answer}>
                  {flashcards[current].answer}
                </h2>

                <div style={styles.tapHint}>
                  Tap to hide the answer
                </div>
              </>
            )}

          </div>

          {/* CONTROLS */}
          <div style={styles.controls}>

            <button
              style={{
                ...styles.controlButton,
                opacity: current === 0 ? 0.4 : 1,
              }}
              onClick={previousCard}
              disabled={current === 0}
            >
              ← Previous
            </button>

            <button
              style={styles.revealButton}
              onClick={toggleAnswer}
            >
              {showAnswer ? "Hide 💕" : "Reveal ✨"}
            </button>

            <button
              style={{
                ...styles.controlButton,
                opacity:
                  current === flashcards.length - 1
                    ? 0.4
                    : 1,
              }}
              onClick={nextCard}
              disabled={current === flashcards.length - 1}
            >
              Next →
            </button>

          </div>

        </div>
      )}

      {/* EXTRACTED NOTES */}
      {text && (

        <details style={styles.notes}>

          <summary style={styles.notesTitle}>
            📖 View extracted PDF text
          </summary>

          <div style={styles.notesContent}>
            {text}
          </div>

        </details>

      )}

      {/* FOOTER */}
      <div style={styles.footer}>
        Made with 🎀, questionable amounts of caffeine,
        and React
      </div>

    </div>
  );
}


// =====================================================
// STYLES
// =====================================================

const styles = {

  app: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #fff0f7 0%, #ffe4f0 50%, #fff5fa 100%)",
    fontFamily:
      "'Segoe UI', Arial, sans-serif",
    color: "#4b2940",
    padding: "40px 20px",
    boxSizing: "border-box",
  },

  header: {
    textAlign: "center",
    marginBottom: "35px",
  },

  logo: {
    fontSize: "45px",
    marginBottom: "5px",
  },

  title: {
    fontSize: "45px",
    margin: "0",
    color: "#d94f91",
    fontWeight: "800",
  },

  subtitle: {
    color: "#9b6685",
    fontSize: "17px",
    marginTop: "10px",
  },

  uploadBox: {
    maxWidth: "650px",
    margin: "0 auto",
    padding: "40px",
    background: "rgba(255,255,255,0.9)",
    border:
      "3px dashed #efa6c8",
    borderRadius: "28px",
    textAlign: "center",
    boxShadow:
      "0 15px 40px rgba(190,80,140,0.15)",
  },

  uploadIcon: {
    fontSize: "50px",
  },

  uploadTitle: {
    fontSize: "25px",
    margin: "15px 0 8px",
    color: "#6b284e", // ADD THIS LINE (Fixes "Upload your study PDF")
    fontWeight: "700",
  },

  uploadText: {
    color: "#a26b89",
    marginBottom: "25px",
  },

  uploadButton: {
    display: "inline-block",
    padding: "15px 30px",
    background:
      "linear-gradient(135deg, #f28ab8, #df639b)",
    color: "white",
    borderRadius: "15px",
    cursor: "pointer",
    fontWeight: "700",
    boxShadow:
      "0 8px 20px rgba(220,90,145,0.25)",
  },

  fileName: {
    marginTop: "20px",
    padding: "12px",
    background: "#fff0f7",
    borderRadius: "12px",
    color: "#9b5076",
  },

  loading: {
    marginTop: "20px",
    color: "#d65791",
    fontWeight: "bold",
  },

  studyArea: {
    maxWidth: "800px",
    margin: "45px auto",
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#d65791",
    marginBottom: "8px",
  },

  progress: {
    color: "#a86b8b",
    fontWeight: "600",
    marginBottom: "15px",
  },

  flashcard: {
    minHeight: "360px",
    padding: "55px",
    background:
      "linear-gradient(145deg, #ffffff, #fff6fa)",
    border:
      "2px solid #f2afd0",
    borderRadius: "30px",
    boxShadow:
      "0 20px 50px rgba(190,80,140,0.18)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "transform 0.2s",
  },

  cardLabel: {
    color: "#e15d98",
    fontSize: "13px",
    fontWeight: "800",
    letterSpacing: "2px",
    marginBottom: "20px",
  },

  question: {
    maxWidth: "650px",
    lineHeight: "1.5",
    fontSize: "27px",
  },

  answer: {
    maxWidth: "650px",
    lineHeight: "1.6",
    fontSize: "21px",
    color: "#654054",
  },

  tapHint: {
    marginTop: "25px",
    color: "#b78ca2",
    fontSize: "14px",
  },

  controls: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "25px",
    flexWrap: "wrap",
  },

  controlButton: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "12px",
    background: "#e99abd",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
  },

  revealButton: {
    padding: "12px 25px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg, #df619b, #c94c89)",
    color: "white",
    fontWeight: "800",
    cursor: "pointer",
  },

  notes: {
    maxWidth: "800px",
    margin: "45px auto",
    background: "white",
    padding: "20px",
    borderRadius: "20px",
    boxShadow:
      "0 10px 30px rgba(180,80,130,0.1)",
  },

  notesTitle: {
    cursor: "pointer",
    fontWeight: "800",
    color: "#c9578c",
  },

  notesContent: {
    marginTop: "15px",
    padding: "15px",
    background: "#fff7fb",
    borderRadius: "12px",
    lineHeight: "1.7",
    whiteSpace: "pre-wrap",
    textAlign: "left",
    maxHeight: "300px",
    overflowY: "auto",
    color: "#624255",
  },

  footer: {
    textAlign: "center",
    marginTop: "50px",
    color: "#b38a9f",
    fontSize: "13px",
  },
};

export default App;