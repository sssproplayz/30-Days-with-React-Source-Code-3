import React, { useMemo, useState } from "react";

function App() {
  const [password, setPassword] = useState("");

  const [mode, setMode] = useState("Random");

  const [name, setName] = useState("");
  const [pin, setPin] = useState("");

  const [length, setLength] = useState(12);

  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const [copied, setCopied] = useState(false);

  const uppercase =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const lowercase =
    "abcdefghijklmnopqrstuvwxyz";

  const numbers =
    "0123456789";

  const symbols =
    "!@#$%^&*()_+-=[]{}";

  const randomCharacter = (characters) => {
    return characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  };

  const shuffle = (text) => {
    return text
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  const generateRandomPassword = () => {
    let available = "";
    let result = "";

    if (includeUppercase) {
      available += uppercase;
      result += randomCharacter(uppercase);
    }

    if (includeLowercase) {
      available += lowercase;
      result += randomCharacter(lowercase);
    }

    if (includeNumbers) {
      available += numbers;
      result += randomCharacter(numbers);
    }

    if (includeSymbols) {
      available += symbols;
      result += randomCharacter(symbols);
    }

    if (available === "") {
      setPassword("Select at least one option");
      return;
    }

    while (result.length < Number(length)) {
      result += randomCharacter(available);
    }

    setPassword(shuffle(result));
    setCopied(false);
  };

  const generateNamePassword = () => {
    if (name.trim() === "") {
      setPassword("Enter a name or word first");
      return;
    }

    const cleanName = name.trim();

    const randomNumber =
      Math.floor(Math.random() * 900) + 100;

    const randomSymbol =
      randomCharacter(symbols);

    const result =
      cleanName.charAt(0).toUpperCase() +
      cleanName.slice(1) +
      randomNumber +
      randomSymbol;

    setPassword(result);
    setCopied(false);
  };

  const generatePin = () => {
    let result = "";

    for (let i = 0; i < Number(length); i++) {
      result += randomCharacter(numbers);
    }

    setPassword(result);
    setCopied(false);
  };

  const generateMemorablePassword = () => {
    const words = [
      "Cherry",
      "Moon",
      "Star",
      "Peach",
      "Cloud",
      "Rose",
      "Sugar",
      "Dream",
      "Berry",
      "Daisy",
      "Sunny",
      "Velvet",
      "Honey",
      "Pearl",
      "Lucky",
      "Magic"
    ];

    const firstWord =
      words[Math.floor(Math.random() * words.length)];

    const secondWord =
      words[Math.floor(Math.random() * words.length)];

    const number =
      Math.floor(Math.random() * 900) + 100;

    const symbol =
      randomCharacter(symbols);

    const result =
      firstWord +
      secondWord +
      number +
      symbol;

    setPassword(result);
    setCopied(false);
  };

  const generatePassword = () => {
    if (mode === "Random") {
      generateRandomPassword();
    }

    if (mode === "Name") {
      generateNamePassword();
    }

    if (mode === "PIN") {
      generatePin();
    }

    if (mode === "Memorable") {
      generateMemorablePassword();
    }
  };

  const copyPassword = async () => {
    if (!password) {
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  const strength = useMemo(() => {
    if (!password) {
      return {
        label: "Not generated",
        width: "0%",
        className: "empty"
      };
    }

    if (
      password.length >= 16 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      return {
        label: "Very Strong",
        width: "100%",
        className: "veryStrong"
      };
    }

    if (
      password.length >= 12 &&
      /[A-Za-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      return {
        label: "Strong",
        width: "80%",
        className: "strong"
      };
    }

    if (password.length >= 8) {
      return {
        label: "Medium",
        width: "55%",
        className: "medium"
      };
    }

    return {
      label: "Weak",
      width: "30%",
      className: "weak"
    };
  }, [password]);

  return (
    <div style={styles.container}>

      <div style={styles.decorations}>
        🎀 ✦ ♡ ✦ 🎀
      </div>

      <p style={styles.eyebrow}>
        ✧ DAY 10 • PASSWORD LAB ✧
      </p>

      <h1 style={styles.title}>
        Password Generator
      </h1>

      <p style={styles.subtitle}>
        Create something cute, random & secure ♡
      </p>

      <div style={styles.card}>

        <div style={styles.modeSection}>
          <p style={styles.sectionTitle}>
            ♡ Choose your password style
          </p>

          <div style={styles.modeGrid}>

            <button
              onClick={() => setMode("Random")}
              style={
                mode === "Random"
                  ? styles.activeMode
                  : styles.modeButton
              }
            >
              ✨
              <span>Random</span>
            </button>

            <button
              onClick={() => setMode("Name")}
              style={
                mode === "Name"
                  ? styles.activeMode
                  : styles.modeButton
              }
            >
              🌷
              <span>Name</span>
            </button>

            <button
              onClick={() => setMode("PIN")}
              style={
                mode === "PIN"
                  ? styles.activeMode
                  : styles.modeButton
              }
            >
              🔢
              <span>PIN</span>
            </button>

            <button
              onClick={() => setMode("Memorable")}
              style={
                mode === "Memorable"
                  ? styles.activeMode
                  : styles.modeButton
              }
            >
              💌
              <span>Memorable</span>
            </button>

          </div>
        </div>

        {mode === "Name" && (
          <div style={styles.optionBox}>

            <label style={styles.label}>
              🌸 Enter a name or word
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="e.g. Sonali"
              style={styles.input}
            />

            <p style={styles.hint}>
              We'll combine it with numbers and a symbol.
            </p>

          </div>
        )}

        {mode === "PIN" && (
          <div style={styles.optionBox}>

            <label style={styles.label}>
              🔢 PIN length
            </label>

            <select
              value={length}
              onChange={(e) =>
                setLength(e.target.value)
              }
              style={styles.input}
            >
              <option value="4">4 digits</option>
              <option value="6">6 digits</option>
              <option value="8">8 digits</option>
              <option value="10">10 digits</option>
            </select>

            <p style={styles.hint}>
              Generates a random numeric PIN.
            </p>

          </div>
        )}

        {mode === "Memorable" && (
          <div style={styles.optionBox}>

            <p style={styles.memorableText}>
              🍓 Two cute words + numbers + symbol
            </p>

            <p style={styles.hint}>
              Easier to remember while still being
              more varied than a simple word.
            </p>

          </div>
        )}

        {mode === "Random" && (
          <div style={styles.options}>

            <label style={styles.label}>
              🎀 Password length: {length}
            </label>

            <input
              type="range"
              min="6"
              max="30"
              value={length}
              onChange={(e) =>
                setLength(e.target.value)
              }
              style={styles.slider}
            />

            <div style={styles.checkGrid}>

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) =>
                    setIncludeUppercase(
                      e.target.checked
                    )
                  }
                />
                ABC Uppercase
              </label>

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) =>
                    setIncludeLowercase(
                      e.target.checked
                    )
                  }
                />
                abc Lowercase
              </label>

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) =>
                    setIncludeNumbers(
                      e.target.checked
                    )
                  }
                />
                123 Numbers
              </label>

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) =>
                    setIncludeSymbols(
                      e.target.checked
                    )
                  }
                />
                !@# Symbols
              </label>

            </div>

          </div>
        )}

        <div style={styles.passwordBox}>

          <p style={styles.passwordLabel}>
            ✦ YOUR PASSWORD ✦
          </p>

          <div style={styles.password}>
            {password || "Your password appears here"}
          </div>

          {password && (
            <div style={styles.passwordActions}>

              <button
                onClick={copyPassword}
                style={styles.copyButton}
              >
                {copied
                  ? "✓ Copied!"
                  : "♡ Copy Password"}
              </button>

              <button
                onClick={generatePassword}
                style={styles.regenerateButton}
              >
                ↻ Regenerate
              </button>

            </div>
          )}

        </div>

        <div style={styles.strengthBox}>

          <div style={styles.strengthHeader}>
            <span>Password strength</span>

            <strong>
              {strength.label}
            </strong>
          </div>

          <div style={styles.strengthTrack}>
            <div
              style={{
                ...styles.strengthFill,
                width: strength.width
              }}
            />
          </div>

        </div>

        <button
          onClick={generatePassword}
          style={styles.generateButton}
        >
          🎀 Generate Password 🎀
        </button>

      </div>

      <div style={styles.tipBox}>
        <span style={styles.tipIcon}>💡</span>

        <div>
          <strong style={styles.tipTitle}>
            Little password tip
          </strong>

          <p style={styles.tipText}>
            Use unique passwords for important accounts
            and avoid using easily guessed personal details.
          </p>
        </div>
      </div>

      <footer style={styles.footer}>
        ♡ secure • cute • productive ♡
      </footer>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "45px 20px",
    boxSizing: "border-box",
    background:
      "linear-gradient(135deg, #ffe5f1, #ffd3e6, #fff1f7)",
    fontFamily: "Arial, sans-serif",
    textAlign: "center"
  },

  decorations: {
    fontSize: "26px",
    marginBottom: "10px"
  },

  eyebrow: {
    color: "#c65383",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "2px",
    margin: "0 0 8px"
  },

  title: {
    color: "#d64182",
    fontSize: "40px",
    margin: "0"
  },

  subtitle: {
    color: "#a25a78",
    fontSize: "15px",
    margin: "10px 0 30px"
  },

  card: {
    width: "650px",
    maxWidth: "100%",
    margin: "0 auto",
    padding: "30px",
    boxSizing: "border-box",
    background: "rgba(255, 255, 255, 0.86)",
    border: "3px solid white",
    borderRadius: "32px",
    boxShadow:
      "0 18px 40px rgba(202, 78, 132, 0.2)"
  },

  modeSection: {
    marginBottom: "25px"
  },

  sectionTitle: {
    color: "#a94a72",
    fontWeight: "bold",
    fontSize: "15px",
    marginBottom: "15px"
  },

  modeGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, 1fr)",
    gap: "10px"
  },

  modeButton: {
    border: "2px solid #f1bfd3",
    borderRadius: "18px",
    padding: "13px 5px",
    background: "#fff8fb",
    color: "#a24d71",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px"
  },

  activeMode: {
    border: "2px solid #df5b91",
    borderRadius: "18px",
    padding: "13px 5px",
    background: "#ffe0ec",
    color: "#c83e78",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
    boxShadow:
      "0 5px 15px rgba(217, 67, 130, 0.15)"
  },

  optionBox: {
    background: "#fff4f8",
    border: "2px solid #f5c4d7",
    borderRadius: "20px",
    padding: "20px",
    marginBottom: "20px",
    textAlign: "left"
  },

  label: {
    display: "block",
    color: "#a34d72",
    fontWeight: "bold",
    fontSize: "13px",
    marginBottom: "10px"
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    borderRadius: "14px",
    border: "2px solid #edb8cf",
    background: "white",
    color: "#7c405b",
    fontSize: "15px",
    outline: "none"
  },

  hint: {
    color: "#a8738a",
    fontSize: "12px",
    margin: "9px 0 0"
  },

  memorableText: {
    color: "#a44b72",
    fontWeight: "bold",
    margin: "0"
  },

  options: {
    textAlign: "left",
    marginBottom: "22px"
  },

  slider: {
    width: "100%",
    accentColor: "#db568c",
    marginBottom: "18px"
  },

  checkGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, 1fr)",
    gap: "10px"
  },

  checkboxLabel: {
    color: "#8d5069",
    fontSize: "13px",
    background: "#fff4f8",
    border: "1px solid #f2c5d7",
    padding: "10px",
    borderRadius: "12px"
  },

  passwordBox: {
    background:
      "linear-gradient(135deg, #ffe1ed, #fff0f6)",
    border: "2px solid #f2b8d0",
    borderRadius: "23px",
    padding: "22px",
    marginBottom: "18px"
  },

  passwordLabel: {
    color: "#b04c77",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "2px",
    margin: "0 0 12px"
  },

  password: {
    minHeight: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px",
    background: "white",
    borderRadius: "15px",
    border: "2px dashed #e9a7c3",
    color: "#8b3f60",
    fontSize: "19px",
    fontWeight: "bold",
    wordBreak: "break-all"
  },

  passwordActions: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginTop: "12px"
  },

  copyButton: {
    border: "none",
    borderRadius: "13px",
    padding: "9px 15px",
    background: "#d94b86",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  regenerateButton: {
    border: "2px solid #e8abc4",
    borderRadius: "13px",
    padding: "9px 15px",
    background: "white",
    color: "#a54c72",
    fontWeight: "bold",
    cursor: "pointer"
  },

  strengthBox: {
    textAlign: "left",
    marginBottom: "20px"
  },

  strengthHeader: {
    display: "flex",
    justifyContent: "space-between",
    color: "#9b5572",
    fontSize: "12px",
    marginBottom: "7px"
  },

  strengthTrack: {
    height: "9px",
    background: "#f5d8e5",
    borderRadius: "20px",
    overflow: "hidden"
  },

  strengthFill: {
    height: "100%",
    background:
      "linear-gradient(90deg, #ed8eb3, #d53e7d)",
    borderRadius: "20px",
    transition: "width 0.3s ease"
  },

  generateButton: {
    width: "100%",
    border: "none",
    borderRadius: "18px",
    padding: "15px",
    background:
      "linear-gradient(135deg, #e85b98, #d83d7e)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow:
      "0 9px 20px rgba(211, 62, 126, 0.22)"
  },

  tipBox: {
    maxWidth: "650px",
    margin: "20px auto 0",
    display: "flex",
    gap: "12px",
    textAlign: "left",
    padding: "17px",
    background: "rgba(255, 255, 255, 0.7)",
    border: "2px solid white",
    borderRadius: "20px"
  },

  tipIcon: {
    fontSize: "25px"
  },

  tipTitle: {
    color: "#a74d73",
    fontSize: "13px"
  },

  tipText: {
    color: "#96647b",
    fontSize: "12px",
    margin: "5px 0 0",
    lineHeight: "1.5"
  },

  footer: {
    marginTop: "25px",
    color: "#a7617e",
    fontSize: "13px",
    fontWeight: "bold"
  }
};

export default App;