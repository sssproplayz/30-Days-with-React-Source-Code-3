import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// =========================================================
// PDF.JS WORKER
// =========================================================

pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;


// =========================================================
// APP
// =========================================================

function App() {
  const [file, setFile] = useState(null);

  const [text, setText] = useState("");

  const [pages, setPages] = useState([]);

  const [level, setLevel] = useState(1);

  const [flashcards, setFlashcards] = useState({
    1: [],
    2: [],
    3: [],
  });

  const [current, setCurrent] = useState(0);

  const [showAnswer, setShowAnswer] = useState(false);

  const [loading, setLoading] = useState(false);

  const [loadingProgress, setLoadingProgress] = useState(0);

  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? darkTheme : lightTheme;

  const activeDeck = flashcards[level] || [];

  const activeCard = activeDeck[current];


  // =========================================================
  // CLEAN TEXT
  // =========================================================

  const cleanExtractedText = (str) => {
    if (!str) return "";

    return str
      .replace(/\uFFFD/g, "")
      .replace(/\u00A0/g, " ")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  };


  // =========================================================
  // GROUP PDF TEXT ITEMS INTO LINES
  // =========================================================

  const reconstructLines = (items) => {
    if (!items || items.length === 0) {
      return [];
    }

    const usableItems = items
      .filter((item) => item.str && item.str.trim())
      .map((item) => {
        const x =
          item.transform && item.transform.length >= 6
            ? item.transform[4]
            : 0;

        const y =
          item.transform && item.transform.length >= 6
            ? item.transform[5]
            : 0;

        const fontSize =
          item.transform && item.transform.length >= 4
            ? Math.sqrt(
                item.transform[0] ** 2 +
                item.transform[1] ** 2
              )
            : 12;

        return {
          text: item.str.trim(),
          x,
          y,
          fontSize,
          width: item.width || 0,
        };
      });

    // -------------------------------------------------------
    // Sort from top to bottom
    // -------------------------------------------------------

    usableItems.sort((a, b) => {
      if (Math.abs(a.y - b.y) < 4) {
        return a.x - b.x;
      }

      return b.y - a.y;
    });

    const lines = [];

    for (const item of usableItems) {
      let matchingLine = null;

      for (const line of lines) {
        if (Math.abs(line.y - item.y) <= 4) {
          matchingLine = line;
          break;
        }
      }

      if (!matchingLine) {
        matchingLine = {
          y: item.y,
          items: [],
          maxFontSize: item.fontSize,
        };

        lines.push(matchingLine);
      }

      matchingLine.items.push(item);

      matchingLine.maxFontSize = Math.max(
        matchingLine.maxFontSize,
        item.fontSize
      );
    }

    // -------------------------------------------------------
    // Sort items inside each line
    // -------------------------------------------------------

    lines.forEach((line) => {
      line.items.sort((a, b) => a.x - b.x);
    });

    // -------------------------------------------------------
    // Convert lines into text
    // -------------------------------------------------------

    return lines
      .map((line) => {
        const lineText = line.items
          .map((item) => item.text)
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();

        return {
          text: lineText,
          y: line.y,
          fontSize: line.maxFontSize,
        };
      })
      .filter((line) => line.text.length > 0);
  };


  // =========================================================
  // FIND SLIDE/PAGE TITLE
  // =========================================================

  const findPageHeading = (lines) => {
    if (!lines || lines.length === 0) {
      return "Study Topic";
    }

    const ignored = new Set([
      "contents",
      "table of contents",
      "references",
      "bibliography",
      "thank you",
      "questions",
      "introduction",
    ]);

    // -------------------------------------------------------
    // Prefer large-font text.
    //
    // This is especially useful for PPT-generated PDFs,
    // because the slide title is normally the largest text.
    // -------------------------------------------------------

    const candidates = lines.filter((line) => {
      const text = line.text.trim();

      if (!text) return false;

      if (text.length > 120) return false;

      if (/^[\d\s./-]+$/.test(text)) return false;

      if (ignored.has(text.toLowerCase())) return false;

      return true;
    });

    if (candidates.length === 0) {
      return "Study Topic";
    }

    // Find largest font size
    const largestFont = Math.max(
      ...candidates.map((line) => line.fontSize)
    );

    const largeCandidates = candidates.filter(
      (line) =>
        line.fontSize >= largestFont * 0.75
    );

    if (largeCandidates.length > 0) {
      return largeCandidates[0].text;
    }

    // Fallback
    return candidates[0].text;
  };



  // =========================================================
  // GET PAGE ANSWER TEXT
  // =========================================================

  const getPageAnswer = (lines, heading) => {
    if (!lines || lines.length === 0) {
      return "The visual content of this page is shown below.";
    }

    const headingLower = normalizeText(heading).toLowerCase();

    const remainingLines = lines
      .map((line) => normalizeText(line.text))
      .filter(Boolean)
      .filter(
        (line) =>
          line.toLowerCase() !== headingLower
      );

    const answer = remainingLines.join("\n").trim();

    if (!answer) {
      return "The visual content of this page is shown below.";
    }

    return answer;
  };


  // =========================================================
  // FLASHCARD CONTENT HELPERS
  // =========================================================

  const normalizeText = (value) => {
    return (value || "")
      .replace(/\u00A0/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const cleanHeadingText = (heading) => {
    return normalizeText(heading)
      .replace(/^[\d.)\-\s]+/, "")
      .replace(/[:：]\s*$/, "")
      .trim();
  };

  // Remove the page title and obvious PDF noise. The important
  // point is that the flashcard is built from the CONTENT,
  // not simply from the heading.
  const getContentLines = (page) => {
    if (!page || !page.lines) return [];

    const heading = cleanHeadingText(page.heading).toLowerCase();

    const lines = page.lines
      .map((line) => normalizeText(line.text))
      .filter(Boolean)
      .filter((line) => {
        const lower = line.toLowerCase();

        if (lower === heading) return false;
        if (/^page\s+\d+$/i.test(lower)) return false;
        if (/^[\d\s./-]+$/.test(lower)) return false;

        return true;
      });

    return lines;
  };

  const makeAnswer = (lines) => {
    return lines
      .map((line) => line.trim())
      .filter(Boolean)
      .join("\n")
      .trim();
  };

  const shortenForQuestion = (text) => {
    const cleaned = normalizeText(text);

    if (cleaned.length <= 100) {
      return cleaned.replace(/[.:;]+$/, "");
    }

    return `${cleaned.slice(0, 97).replace(/\s+\S*$/, "")}...`;
  };

  // =========================================================
  // BUILD A REAL QUESTION FROM THE PAGE CONTENT
  // =========================================================

  const buildContentQuestion = (page) => {
    const heading = cleanHeadingText(page.heading);
    const lowerHeading = heading.toLowerCase();
    const contentLines = getContentLines(page);

    // -------------------------------------------------------
    // Curriculum / syllabus / course-outline pages
    // -------------------------------------------------------
    // This is the important fix for the user's example.
    // We ask about what the page actually contains.
    // -------------------------------------------------------

    if (
      /\b(curriculum|syllabus|course outline|course content)\b/i.test(
        lowerHeading
      )
    ) {
      return {
        question: "What topics are covered in the curriculum?",
        answer: makeAnswer(contentLines) || page.text,
      };
    }

    // -------------------------------------------------------
    // Table of contents
    // -------------------------------------------------------

    if (
      /\b(table of contents|contents)\b/i.test(
        lowerHeading
      )
    ) {
      return {
        question: "What topics are listed in the table of contents?",
        answer: makeAnswer(contentLines) || page.text,
      };
    }

    // -------------------------------------------------------
    // If the PDF itself contains a question, use it.
    // -------------------------------------------------------

    const questionLine = contentLines.find((line) =>
      /^(what|why|how|when|where|which|who|define|explain|describe|list|state|write)\b/i.test(
        line
      )
    );

    if (questionLine) {
      const question =
        questionLine.endsWith("?")
          ? questionLine
          : `${questionLine}?`;

      const answerLines = contentLines.filter(
        (line) => line !== questionLine
      );

      return {
        question,
        answer:
          makeAnswer(answerLines) ||
          page.answer ||
          page.text,
      };
    }

    // -------------------------------------------------------
    // Definition-style content
    //
    // Example:
    // "A stack is a linear data structure..."
    //
    // becomes:
    // "What is a stack?"
    // -------------------------------------------------------

    for (const line of contentLines) {
      const definitionMatch = line.match(
        /^(?:a|an|the)?\s*([A-Za-z][A-Za-z0-9 ()/_-]{1,50})\s+(?:is|are|means|refers to|is defined as)\s+(.+)$/i
      );

      if (definitionMatch) {
        const subject = normalizeText(definitionMatch[1])
          .replace(/^(a|an|the)\s+/i, "")
          .trim();

        if (subject.length >= 2) {
          return {
            question: `What is ${subject}?`,
            answer: line,
          };
        }
      }
    }

    // -------------------------------------------------------
    // "Types / advantages / applications / characteristics"
    // -------------------------------------------------------

    const listPattern =
      /\b(types|advantages|disadvantages|applications|characteristics|features|properties|operations|functions|steps|components|uses|benefits)\b/i;

    const listLineIndex = contentLines.findIndex((line) =>
      listPattern.test(line)
    );

    if (listLineIndex !== -1) {
      const listLine = contentLines[listLineIndex];
      const lower = listLine.toLowerCase();

      let kind = "main points";

      if (lower.includes("type")) kind = "types";
      else if (lower.includes("advantage")) kind = "advantages";
      else if (lower.includes("disadvantage")) kind = "disadvantages";
      else if (lower.includes("application") || lower.includes("use")) {
        kind = "applications";
      } else if (lower.includes("characteristic") || lower.includes("feature")) {
        kind = "characteristics";
      } else if (lower.includes("property")) {
        kind = "properties";
      } else if (lower.includes("operation") || lower.includes("function")) {
        kind = "operations";
      } else if (lower.includes("step")) {
        kind = "steps";
      } else if (lower.includes("component")) {
        kind = "components";
      }

      const topic = heading || "this topic";

      return {
        question: `What are the ${kind} of ${topic}?`,
        answer: makeAnswer(contentLines) || page.answer || page.text,
      };
    }

    // -------------------------------------------------------
    // Heading that is itself meaningful, but DO NOT ask
    // "What is Curriculum?" or another empty title question.
    // The question explicitly asks about the page content.
    // -------------------------------------------------------

    if (heading) {
      return {
        question: `What are the key points about ${heading}?`,
        answer: makeAnswer(contentLines) || page.answer || page.text,
      };
    }

    // -------------------------------------------------------
    // Last fallback for image-only pages.
    // It does not invent a topic or a person.
    // -------------------------------------------------------

    return {
      question: `What important information is presented on PDF page ${page.pageNumber}?`,
      answer:
        makeAnswer(contentLines) ||
        page.answer ||
        "Review the PDF page image for the information.",
    };
  };

  // =========================================================
  // CREATE LEVEL-SPECIFIC FLASHCARDS
  // =========================================================

  const buildFlashcards = (pdfPages) => {
    const level1 = [];
    const level2 = [];
    const level3 = [];

    pdfPages.forEach((page) => {
      const base = buildContentQuestion(page);

      // -----------------------------------------------------
      // LEVEL 1: direct recall
      // -----------------------------------------------------

      level1.push({
        question: base.question,
        answer: base.answer,
        image: page.image,
        pageNumber: page.pageNumber,
        heading: page.heading,
      });

      // -----------------------------------------------------
      // LEVEL 2: explanation
      // -----------------------------------------------------

      const heading = cleanHeadingText(page.heading);
      const contentAnswer =
        makeAnswer(getContentLines(page)) ||
        page.answer ||
        page.text;

      level2.push({
        question:
          heading
            ? `Explain the main concepts covered under ${heading}.`
            : `Explain the main concepts presented on PDF page ${page.pageNumber}.`,
        answer: contentAnswer,
        image: page.image,
        pageNumber: page.pageNumber,
        heading: page.heading,
      });

      // -----------------------------------------------------
      // LEVEL 3: important-point recall
      // -----------------------------------------------------

      level3.push({
        question:
          heading
            ? `What important points should you remember about ${heading}?`
            : `What important points should you remember from PDF page ${page.pageNumber}?`,
        answer: contentAnswer,
        image: page.image,
        pageNumber: page.pageNumber,
        heading: page.heading,
      });
    });

    return {
      1: level1,
      2: level2,
      3: level3,
    };
  };


  // =========================================================
  // RENDER PDF PAGE AS IMAGE
  //
  // THIS IS THE BIG FIX FOR:
  //
  // ✔ diagrams
  // ✔ mathematical symbols
  // ✔ equations
  // ✔ arrows
  // ✔ tables
  // ✔ flowcharts
  // ✔ shapes
  // ✔ PPT layouts
  // =========================================================

  const renderPageToImage = async (pdfPage) => {
    const viewport = pdfPage.getViewport({
      scale: 1.5,
    });

    const canvas = document.createElement("canvas");

    const context = canvas.getContext("2d");

    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);

    await pdfPage.render({
      canvasContext: context,
      viewport,
    }).promise;

    return canvas.toDataURL(
      "image/png",
      1.0
    );
  };


  // =========================================================
  // EXTRACT PDF
  // =========================================================

  const extractPDF = async (selectedFile) => {
    setLoading(true);
    setLoadingProgress(0);

    try {
      const arrayBuffer =
        await selectedFile.arrayBuffer();

      const pdf =
        await pdfjsLib
          .getDocument({
            data: arrayBuffer,

            cMapUrl:
              `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/cmaps/`,

            cMapPacked: true,
          })
          .promise;

      const extractedPages = [];

      // -----------------------------------------------------
      // PROCESS EVERY PAGE
      // -----------------------------------------------------

      for (
        let pageNumber = 1;
        pageNumber <= pdf.numPages;
        pageNumber++
      ) {
        const pdfPage =
          await pdf.getPage(pageNumber);

        // ---------------------------------------------------
        // TEXT
        // ---------------------------------------------------

        const content =
          await pdfPage.getTextContent();

        const lines =
          reconstructLines(content.items);

        const pageText =
          cleanExtractedText(
            lines
              .map((line) => line.text)
              .join("\n")
          );

        // ---------------------------------------------------
        // RENDER PAGE
        //
        // This preserves visual information that text
        // extraction cannot understand.
        // ---------------------------------------------------

        const image =
          await renderPageToImage(pdfPage);

        // ---------------------------------------------------
        // FIND TITLE
        // ---------------------------------------------------

        const heading =
          findPageHeading(lines);

        // ---------------------------------------------------
        // ANSWER TEXT
        // ---------------------------------------------------

        const answer =
          getPageAnswer(
            lines,
            heading
          );

        extractedPages.push({
          pageNumber,

          text: pageText,

          lines,

          heading,

          answer,

          image,
        });

        // ---------------------------------------------------
        // PROGRESS
        // ---------------------------------------------------

        setLoadingProgress(
          Math.round(
            (pageNumber / pdf.numPages) * 100
          )
        );
      }

      // -----------------------------------------------------
      // SAVE PAGES
      // -----------------------------------------------------

      setPages(extractedPages);

      // -----------------------------------------------------
      // CREATE TEXT VIEW
      // -----------------------------------------------------

      const combinedText =
        extractedPages
          .map(
            (page) =>
              `PAGE ${page.pageNumber}\n\n${page.text}`
          )
          .join(
            "\n\n========================================\n\n"
          );

      setText(combinedText);

      // -----------------------------------------------------
      // CREATE FLASHCARDS
      // -----------------------------------------------------

      generateMultiLevelFlashcards(
        extractedPages
      );

    } catch (error) {
      console.error(
        "PDF extraction error:",
        error
      );

      alert(
        "Couldn't read this PDF. Please make sure it is a valid text-based PDF."
      );
    } finally {
      setLoading(false);
      setLoadingProgress(0);
    }
  };



  // =========================================================
  // GENERATE FLASHCARDS
  // =========================================================

  const generateMultiLevelFlashcards = (pdfPages) => {
    if (!pdfPages || pdfPages.length === 0) {
      alert("No readable pages were found.");
      return;
    }

    // Use every extracted page. The old version silently stopped
    // after 15 pages, which made the deck incomplete.
    const decks = buildFlashcards(pdfPages);

    setFlashcards(decks);
    setLevel(1);
    setCurrent(0);
    setShowAnswer(false);
  };


  // =========================================================
  // FILE HANDLER
  // =========================================================

  const handleFile = (event) => {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const isPDF =
      selectedFile.type ===
        "application/pdf" ||
      selectedFile.name
        .toLowerCase()
        .endsWith(".pdf");

    if (!isPDF) {
      alert(
        "Bestie... that's not a PDF. 😭"
      );

      return;
    }

    setFile(selectedFile);

    setText("");

    setPages([]);

    setFlashcards({
      1: [],
      2: [],
      3: [],
    });

    setLevel(1);

    setCurrent(0);

    setShowAnswer(false);

    extractPDF(selectedFile);
  };


  // =========================================================
  // NEXT CARD
  // =========================================================

  const nextCard = () => {
    if (
      activeDeck.length === 0
    ) {
      return;
    }

    if (
      current <
      activeDeck.length - 1
    ) {
      setCurrent(
        (previous) =>
          previous + 1
      );

      setShowAnswer(false);

      return;
    }

    // -------------------------------------------------------
    // NEXT LEVEL
    // -------------------------------------------------------

    if (level < 3) {
      setLevel(
        (previous) =>
          previous + 1
      );

      setCurrent(0);

      setShowAnswer(false);

      return;
    }

    // Last card
    setShowAnswer(false);
  };


  // =========================================================
  // PREVIOUS CARD
  // =========================================================

  const previousCard = () => {
    if (current > 0) {
      setCurrent(
        (previous) =>
          previous - 1
      );

      setShowAnswer(false);

      return;
    }

    // Previous level
    if (level > 1) {
      const previousLevel =
        level - 1;

      const previousDeck =
        flashcards[
          previousLevel
        ] || [];

      setLevel(previousLevel);

      setCurrent(
        Math.max(
          previousDeck.length - 1,
          0
        )
      );

      setShowAnswer(false);
    }
  };


  // =========================================================
  // LEVEL SWITCH
  // =========================================================

  const switchLevel = (
    targetLevel
  ) => {
    if (
      !flashcards[
        targetLevel
      ]?.length
    ) {
      return;
    }

    setLevel(targetLevel);

    setCurrent(0);

    setShowAnswer(false);
  };


  // =========================================================
  // ANSWER TOGGLE
  // =========================================================

  const toggleAnswer = () => {
    setShowAnswer(
      (previous) =>
        !previous
    );
  };


  // =========================================================
  // RESET
  // =========================================================

  const resetApp = () => {
    setFile(null);

    setText("");

    setPages([]);

    setFlashcards({
      1: [],
      2: [],
      3: [],
    });

    setLevel(1);

    setCurrent(0);

    setShowAnswer(false);

    setLoading(false);

    setLoadingProgress(0);
  };


  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      style={{
        ...styles.app,

        background:
          theme.bg,

        color:
          theme.textColor,
      }}
    >

      {/* ===================================================
          THEME BUTTON
      ==================================================== */}

      <button
        style={{
          ...styles.themeToggle,

          background:
            theme.toggleBg,

          color:
            theme.toggleText,
        }}

        onClick={() =>
          setDarkMode(
            (previous) =>
              !previous
          )
        }
      >
        {darkMode
          ? "💖 Pink Mode"
          : "🌙 Blue Mode"}
      </button>


      {/* ===================================================
          HEADER
      ==================================================== */}

      <div style={styles.header}>

        <div style={styles.logo}>
          🎀
        </div>

        <h1
          style={{
            ...styles.title,
            color:
              theme.primary,
          }}
        >
          Pookie Notes
        </h1>

        <p
          style={{
            ...styles.subtitle,
            color:
              theme.subText,
          }}
        >
          Turn your PDFs into visual flashcards ✨
        </p>

      </div>


      {/* ===================================================
          UPLOAD BOX
      ==================================================== */}

      <div
        style={{
          ...styles.uploadBox,

          background:
            theme.cardBg,

          borderColor:
            theme.border,
        }}
      >

        <div
          style={
            styles.uploadIcon
          }
        >
          📚
        </div>

        <h2
          style={{
            ...styles.uploadTitle,

            color:
              theme.headingColor,
          }}
        >
          Upload your study PDF
        </h2>

        <p
          style={{
            ...styles.uploadText,

            color:
              theme.subText,
          }}
        >
          Text, formulas, diagrams, tables and slides are preserved 💗
        </p>


        <label
          style={{
            ...styles.uploadButton,

            background:
              theme.buttonGrad,
          }}
        >
          📄 Choose PDF

          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={
              handleFile
            }
            style={{
              display:
                "none",
            }}
          />
        </label>


        {file && (
          <div
            style={{
              ...styles.fileName,

              background:
                theme.tagBg,

              color:
                theme.primary,
            }}
          >
            💗 {file.name}
          </div>
        )}


        {/* =================================================
            LOADING
        ================================================== */}

        {loading && (
          <div
            style={{
              ...styles.loading,

              color:
                theme.primary,
            }}
          >
            <div>
              ✨ Reading PDF pages...
            </div>

            <div
              style={{
                ...styles.progressBarOuter,

                background:
                  theme.tagBg,
              }}
            >
              <div
                style={{
                  ...styles.progressBarInner,

                  width:
                    `${loadingProgress}%`,

                  background:
                    theme.buttonGrad,
                }}
              />
            </div>

            <div
              style={
                styles.progressNumber
              }
            >
              {loadingProgress}%
            </div>
          </div>
        )}


        {/* =================================================
            SUCCESS
        ================================================== */}

        {!loading &&
          pages.length > 0 && (
            <div
              style={{
                ...styles.successMessage,

                color:
                  theme.primary,
              }}
            >
              ✨ Successfully read{" "}
              {pages.length}{" "}
              page
              {pages.length !== 1
                ? "s"
                : ""}
            </div>
          )}


        {/* =================================================
            RESET
        ================================================== */}

        {file && !loading && (
          <button
            onClick={
              resetApp
            }
            style={{
              ...styles.resetButton,

              color:
                theme.primary,

              borderColor:
                theme.border,
            }}
          >
            🗑️ Remove PDF
          </button>
        )}

      </div>


      {/* ===================================================
          FLASHCARD AREA
      ==================================================== */}

      {activeDeck.length >
        0 &&
        activeCard && (
          <div
            style={
              styles.studyArea
            }
          >

            {/* =============================================
                LEVEL TABS
            ============================================== */}

            <div
              style={
                styles.levelContainer
              }
            >

              <button
                onClick={() =>
                  switchLevel(1)
                }

                style={{
                  ...styles.levelTab,

                  background:
                    level === 1
                      ? theme.primary
                      : theme.tagBg,

                  color:
                    level === 1
                      ? "#fff"
                      : theme.textColor,
                }}
              >
                🌸 Level 1
              </button>


              <button
                onClick={() =>
                  switchLevel(2)
                }

                style={{
                  ...styles.levelTab,

                  background:
                    level === 2
                      ? theme.primary
                      : theme.tagBg,

                  color:
                    level === 2
                      ? "#fff"
                      : theme.textColor,
                }}
              >
                🔥 Level 2
              </button>


              <button
                onClick={() =>
                  switchLevel(3)
                }

                style={{
                  ...styles.levelTab,

                  background:
                    level === 3
                      ? theme.primary
                      : theme.tagBg,

                  color:
                    level === 3
                      ? "#fff"
                      : theme.textColor,
                }}
              >
                ⚡ Level 3
              </button>

            </div>


            {/* =============================================
                PROGRESS
            ============================================== */}

            <div
              style={{
                ...styles.progress,

                color:
                  theme.subText,
              }}
            >
              Level {level} • Card{" "}
              {current + 1} of{" "}
              {activeDeck.length}

              {activeCard.pageNumber && (
                <>
                  {" "}
                  • PDF Page{" "}
                  {activeCard.pageNumber}
                </>
              )}
            </div>


            {/* =============================================
                FLASHCARD
            ============================================== */}

            <div
              style={{
                ...styles.flashcard,

                background:
                  theme.cardGrad,

                borderColor:
                  theme.border,
              }}

              onClick={
                toggleAnswer
              }

              role="button"

              tabIndex={0}

              onKeyDown={(
                event
              ) => {
                if (
                  event.key ===
                    "Enter" ||
                  event.key ===
                    " "
                ) {
                  event.preventDefault();

                  toggleAnswer();
                }
              }}
            >

              {/* =========================================
                  QUESTION
              ========================================== */}

              {!showAnswer ? (
                <>
                  <div
                    style={{
                      ...styles.cardLabel,

                      color:
                        theme.primary,
                    }}
                  >
                    QUESTION 💭
                    <br />
                    LEVEL {level}
                  </div>


                  <h2
                    style={{
                      ...styles.question,

                      color:
                        theme.cardText,
                    }}
                  >
                    {
                      activeCard.question
                    }
                  </h2>


                  <div
                    style={{
                      ...styles.pageBadge,

                      color:
                        theme.primary,

                      background:
                        theme.tagBg,
                    }}
                  >
                    📄 PDF Page{" "}
                    {
                      activeCard.pageNumber
                    }
                  </div>


                  <div
                    style={{
                      ...styles.tapHint,

                      color:
                        theme.subText,
                    }}
                  >
                    Tap to reveal the answer ✨
                  </div>
                </>
              ) : (

                /* =========================================
                   ANSWER
                ========================================== */

                <>
                  <div
                    style={{
                      ...styles.cardLabel,

                      color:
                        theme.primary,
                    }}
                  >
                    ANSWER 💗
                  </div>


                  {/* =======================================
                      ACTUAL PDF PAGE IMAGE
                  ======================================== */}

                  {activeCard.image && (
                    <div
                      style={
                        styles.imageContainer
                      }
                    >
                      <img
                        src={
                          activeCard.image
                        }

                        alt={`PDF page ${activeCard.pageNumber}`}

                        style={
                          styles.pageImage
                        }

                        draggable={
                          false
                        }
                      />
                    </div>
                  )}


                  {/* =======================================
                      EXTRACTED TEXT
                  ======================================== */}

                  {activeCard.answer &&
                    activeCard.answer !==
                      "The visual content of this page is shown below." && (
                      <div
                        style={{
                          ...styles.answerText,

                          color:
                            theme.cardText,

                          background:
                            theme.tagBg,
                        }}
                      >
                        <div
                          style={{
                            ...styles.answerTextTitle,

                            color:
                              theme.primary,
                          }}
                        >
                          📝 Extracted text
                        </div>

                        {
                          activeCard.answer
                        }
                      </div>
                    )}


                  <div
                    style={{
                      ...styles.tapHint,

                      color:
                        theme.subText,
                    }}
                  >
                    Tap to hide the answer
                  </div>

                </>
              )}

            </div>


            {/* =================================================
                CONTROLS
            ================================================== */}

            <div
              style={
                styles.controls
              }
            >

              <button
                style={{
                  ...styles.controlButton,

                  background:
                    theme.navButton,

                  opacity:
                    current === 0 &&
                    level === 1
                      ? 0.4
                      : 1,
                }}

                onClick={
                  previousCard
                }

                disabled={
                  current === 0 &&
                  level === 1
                }
              >
                ← Previous
              </button>


              <button
                style={{
                  ...styles.revealButton,

                  background:
                    theme.buttonGrad,
                }}

                onClick={
                  toggleAnswer
                }
              >
                {showAnswer
                  ? "Hide 💕"
                  : "Reveal ✨"}
              </button>


              <button
                style={{
                  ...styles.controlButton,

                  background:
                    theme.navButton,
                }}

                onClick={
                  nextCard
                }
              >
                {current ===
                    activeDeck.length -
                      1 &&
                  level < 3
                  ? "Next Level 🚀"
                  : current ===
                      activeDeck.length -
                        1 &&
                    level === 3
                  ? "Finish 🎀"
                  : "Next →"}
              </button>

            </div>

          </div>
        )}


      {/* ===================================================
          EXTRACTED TEXT
      ==================================================== */}

      {text && (
        <details
          style={{
            ...styles.notes,

            background:
              theme.cardBg,
          }}
        >

          <summary
            style={{
              ...styles.notesTitle,

              color:
                theme.primary,
            }}
          >
            📖 View extracted PDF text
          </summary>


          <div
            style={{
              ...styles.notesContent,

              background:
                theme.tagBg,

              color:
                theme.textColor,
            }}
          >
            {text}
          </div>

        </details>
      )}


      {/* ===================================================
          FOOTER
      ==================================================== */}

      <div
        style={{
          ...styles.footer,

          color:
            theme.subText,
        }}
      >
        Made with 🎀, questionable amounts of caffeine, and React
      </div>

    </div>
  );
}


// =========================================================
// LIGHT THEME
// =========================================================

const lightTheme = {
  bg:
    "linear-gradient(135deg, #fff0f7 0%, #ffe4f0 50%, #fff5fa 100%)",

  textColor:
    "#4b2940",

  headingColor:
    "#6b284e",

  cardText:
    "#311425",

  primary:
    "#d94f91",

  subText:
    "#834068",

  cardBg:
    "rgba(255, 255, 255, 0.96)",

  cardGrad:
    "linear-gradient(145deg, #ffffff, #fff6fa)",

  border:
    "#efa6c8",

  buttonGrad:
    "linear-gradient(135deg, #f28ab8, #df639b)",

  navButton:
    "#e99abd",

  tagBg:
    "#fff0f7",

  toggleBg:
    "#f28ab8",

  toggleText:
    "#ffffff",
};


// =========================================================
// DARK THEME
// =========================================================

const darkTheme = {
  bg:
    "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",

  textColor:
    "#e0e7ff",

  headingColor:
    "#93c5fd",

  cardText:
    "#ffffff",

  primary:
    "#60a5fa",

  subText:
    "#a5b4fc",

  cardBg:
    "rgba(30, 41, 59, 0.96)",

  cardGrad:
    "linear-gradient(145deg, #1e293b, #0f172a)",

  border:
    "#3b82f6",

  buttonGrad:
    "linear-gradient(135deg, #3b82f6, #1d4ed8)",

  navButton:
    "#2563eb",

  tagBg:
    "#1e1b4b",

  toggleBg:
    "#3b82f6",

  toggleText:
    "#ffffff",
};


// =========================================================
// STYLES
// =========================================================

const styles = {

  app: {
    minHeight:
      "100vh",

    fontFamily:
      "'Segoe UI', Arial, sans-serif",

    padding:
      "40px 20px",

    boxSizing:
      "border-box",

    position:
      "relative",

    transition:
      "all 0.3s ease",
  },


  themeToggle: {
    position:
      "absolute",

    top:
      "20px",

    right:
      "20px",

    padding:
      "10px 18px",

    border:
      "none",

    borderRadius:
      "20px",

    fontWeight:
      "700",

    cursor:
      "pointer",

    boxShadow:
      "0 4px 12px rgba(0,0,0,0.15)",

    zIndex:
      10,
  },


  header: {
    textAlign:
      "center",

    marginBottom:
      "35px",
  },


  logo: {
    fontSize:
      "45px",

    marginBottom:
      "5px",
  },


  title: {
    fontSize:
      "45px",

    margin:
      "0",

    fontWeight:
      "800",
  },


  subtitle: {
    fontSize:
      "17px",

    marginTop:
      "10px",
  },


  uploadBox: {
    maxWidth:
      "650px",

    margin:
      "0 auto",

    padding:
      "40px",

    borderWidth:
      "3px",

    borderStyle:
      "dashed",

    borderRadius:
      "28px",

    textAlign:
      "center",

    boxShadow:
      "0 15px 40px rgba(0,0,0,0.15)",
  },


  uploadIcon: {
    fontSize:
      "50px",
  },


  uploadTitle: {
    fontSize:
      "25px",

    margin:
      "15px 0 8px",

    fontWeight:
      "800",
  },


  uploadText: {
    marginBottom:
      "25px",

    fontSize:
      "16px",

    lineHeight:
      "1.5",
  },


  uploadButton: {
    display:
      "inline-block",

    padding:
      "15px 30px",

    color:
      "white",

    borderRadius:
      "15px",

    cursor:
      "pointer",

    fontWeight:
      "700",

    boxShadow:
      "0 8px 20px rgba(0,0,0,0.2)",
  },


  fileName: {
    marginTop:
      "20px",

    padding:
      "12px",

    borderRadius:
      "12px",

    fontWeight:
      "600",

    wordBreak:
      "break-word",
  },


  loading: {
    marginTop:
      "20px",

    fontWeight:
      "bold",
  },


  progressBarOuter: {
    width:
      "100%",

    height:
      "10px",

    borderRadius:
      "20px",

    marginTop:
      "12px",

    overflow:
      "hidden",
  },


  progressBarInner: {
    height:
      "100%",

    borderRadius:
      "20px",

    transition:
      "width 0.2s ease",
  },


  progressNumber: {
    marginTop:
      "7px",

    fontSize:
      "13px",
  },


  successMessage: {
    marginTop:
      "15px",

    fontWeight:
      "700",
  },


  resetButton: {
    marginTop:
      "15px",

    padding:
      "8px 15px",

    background:
      "transparent",

    borderWidth:
      "1px",

    borderStyle:
      "solid",

    borderRadius:
      "10px",

    cursor:
      "pointer",

    fontWeight:
      "600",
  },


  studyArea: {
    maxWidth:
      "850px",

    margin:
      "45px auto",

    textAlign:
      "center",
  },


  levelContainer: {
    display:
      "flex",

    justifyContent:
      "center",

    gap:
      "10px",

    marginBottom:
      "20px",

    flexWrap:
      "wrap",
  },


  levelTab: {
    padding:
      "10px 20px",

    border:
      "none",

    borderRadius:
      "20px",

    fontWeight:
      "700",

    cursor:
      "pointer",

    transition:
      "all 0.2s ease",
  },


  progress: {
    fontWeight:
      "600",

    marginBottom:
      "15px",
  },


  flashcard: {
    minHeight:
      "380px",

    padding:
      "45px 35px",

    borderWidth:
      "2px",

    borderStyle:
      "solid",

    borderRadius:
      "30px",

    boxShadow:
      "0 20px 50px rgba(0,0,0,0.2)",

    display:
      "flex",

    flexDirection:
      "column",

    justifyContent:
      "center",

    alignItems:
      "center",

    cursor:
      "pointer",

    userSelect:
      "none",

    transition:
      "all 0.2s ease",

    overflow:
      "hidden",
  },


  cardLabel: {
    fontSize:
      "13px",

    fontWeight:
      "800",

    letterSpacing:
      "2px",

    marginBottom:
      "20px",

    textAlign:
      "center",
  },


  question: {
    maxWidth:
      "700px",

    lineHeight:
      "1.5",

    fontSize:
      "25px",

    fontWeight:
      "700",

    margin:
      "0",

    whiteSpace:
      "pre-wrap",
  },


  pageBadge: {
    marginTop:
      "25px",

    padding:
      "7px 14px",

    borderRadius:
      "20px",

    fontSize:
      "13px",

    fontWeight:
      "700",
  },


  imageContainer: {
    width:
      "100%",

    maxWidth:
      "720px",

    maxHeight:
      "650px",

    overflowY:
      "auto",

    overflowX:
      "auto",

    borderRadius:
      "16px",

    background:
      "#ffffff",

    boxShadow:
      "0 5px 20px rgba(0,0,0,0.18)",

    marginBottom:
      "20px",

    cursor:
      "default",
  },


  pageImage: {
    display:
      "block",

    width:
      "100%",

    height:
      "auto",

    objectFit:
      "contain",

    userSelect:
      "none",
  },


  answerText: {
    width:
      "100%",

    maxWidth:
      "720px",

    padding:
      "18px",

    borderRadius:
      "16px",

    lineHeight:
      "1.65",

    whiteSpace:
      "pre-wrap",

    textAlign:
      "left",

    fontSize:
      "16px",

    boxSizing:
      "border-box",

    cursor:
      "default",

    maxHeight:
      "300px",

    overflowY:
      "auto",
  },


  answerTextTitle: {
    fontWeight:
      "800",

    marginBottom:
      "10px",

    fontSize:
      "14px",
  },


  tapHint: {
    marginTop:
      "20px",

    fontSize:
      "14px",
  },


  controls: {
    display:
      "flex",

    justifyContent:
      "center",

    gap:
      "12px",

    marginTop:
      "25px",

    flexWrap:
      "wrap",
  },


  controlButton: {
    padding:
      "12px 20px",

    border:
      "none",

    borderRadius:
      "12px",

    color:
      "white",

    fontWeight:
      "700",

    cursor:
      "pointer",
  },


  revealButton: {
    padding:
      "12px 25px",

    border:
      "none",

    borderRadius:
      "12px",

    color:
      "white",

    fontWeight:
      "800",

    cursor:
      "pointer",
  },


  notes: {
    maxWidth:
      "850px",

    margin:
      "45px auto",

    padding:
      "20px",

    borderRadius:
      "20px",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.1)",
  },


  notesTitle: {
    cursor:
      "pointer",

    fontWeight:
      "800",
  },


  notesContent: {
    marginTop:
      "15px",

    padding:
      "15px",

    borderRadius:
      "12px",

    lineHeight:
      "1.7",

    whiteSpace:
      "pre-wrap",

    textAlign:
      "left",

    maxHeight:
      "400px",

    overflowY:
      "auto",

    fontSize:
      "14px",
  },


  footer: {
    textAlign:
      "center",

    marginTop:
      "50px",

    fontSize:
      "13px",

    paddingBottom:
      "20px",
  },
};


export default App;