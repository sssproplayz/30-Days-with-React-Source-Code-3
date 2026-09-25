import React, { useState } from "react";

function App() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState(10);
  const [people, setPeople] = useState(1);

  const billAmount = Number(bill) || 0;
  const tipAmount = (billAmount * tip) / 100;
  const total = billAmount + tipAmount;
  const perPerson = people > 0 ? total / people : 0;

  const reset = () => {
    setBill("");
    setTip(10);
    setPeople(1);
  };

  return (
    <div style={styles.page}>
      <div style={styles.topDecoration}>🎀 ♡ ✦ ♡ 🎀</div>

      <div style={styles.card}>
        <p style={styles.miniTitle}>♡ LITTLE CAFÉ CALCULATOR ♡</p>

        <h1 style={styles.title}>Tip Calculator 💌</h1>

        <p style={styles.subtitle}>
          Calculate your tip without making your brain do unnecessary math ♡
        </p>

        <div style={styles.section}>
          <label style={styles.label}>♡ Bill Amount</label>

          <div style={styles.inputWrapper}>
            <span style={styles.currency}>₹</span>

            <input
              type="number"
              placeholder="Enter bill amount"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>♡ Choose Your Tip</label>

          <div style={styles.tipGrid}>
            {[5, 10, 15, 20].map((percentage) => (
              <button
                key={percentage}
                onClick={() => setTip(percentage)}
                style={{
                  ...styles.tipButton,
                  ...(tip === percentage ? styles.selectedTip : {})
                }}
              >
                {percentage}%
              </button>
            ))}
          </div>

          <select
            value={tip}
            onChange={(e) => setTip(Number(e.target.value))}
            style={styles.select}
          >
            <option value="5">5% - Sweet & simple</option>
            <option value="10">10% - Nice & classic</option>
            <option value="15">15% - Very generous ♡</option>
            <option value="20">20% - Extra lovely 🎀</option>
          </select>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>♡ Split Between</label>

          <div style={styles.peopleControl}>
            <button
              onClick={() => setPeople(Math.max(1, people - 1))}
              style={styles.controlButton}
            >
              −
            </button>

            <div style={styles.peopleNumber}>
              {people}
              <span style={styles.peopleText}>
                {people === 1 ? " person" : " people"}
              </span>
            </div>

            <button
              onClick={() => setPeople(people + 1)}
              style={styles.controlButton}
            >
              +
            </button>
          </div>
        </div>

        <div style={styles.resultBox}>
          <p style={styles.resultHeading}>♡ YOUR BILL BREAKDOWN ♡</p>

          <div style={styles.row}>
            <span>Bill</span>
            <strong>₹{billAmount.toFixed(2)}</strong>
          </div>

          <div style={styles.row}>
            <span>
              Tip <small>({tip}%)</small>
            </span>
            <strong>₹{tipAmount.toFixed(2)}</strong>
          </div>

          <div style={styles.divider}></div>

          <div style={styles.totalRow}>
            <span>Total</span>
            <strong>₹{total.toFixed(2)}</strong>
          </div>

          {people > 1 && (
            <div style={styles.perPerson}>
              🎀 Each person pays

              <span style={styles.perPersonAmount}>
                ₹{perPerson.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        <button onClick={reset} style={styles.resetButton}>
          Reset Everything ✦
        </button>

        <p style={styles.footer}>
          made with ♡ & questionable financial decisions
        </p>
      </div>

      <div style={styles.bottomDecoration}>♡ ✦ 🍰 ✦ ♡</div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #ffe5f0, #fff4f8, #fce1ec)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 15px",
    boxSizing: "border-box",
    fontFamily: "'Trebuchet MS', Arial, sans-serif"
  },

  topDecoration: {
    color: "#d85d8b",
    fontSize: "24px",
    letterSpacing: "5px",
    marginBottom: "12px"
  },

  bottomDecoration: {
    color: "#d85d8b",
    fontSize: "22px",
    letterSpacing: "4px",
    marginTop: "15px"
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    background: "rgba(255, 255, 255, 0.9)",
    border: "2px solid #ffd0e1",
    borderRadius: "30px",
    padding: "35px",
    boxSizing: "border-box",
    textAlign: "center",
    boxShadow: "0 18px 45px rgba(205, 83, 130, 0.18)"
  },

  miniTitle: {
    color: "#c65380",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "2px",
    margin: "0 0 8px"
  },

  title: {
    color: "#c44376",
    fontSize: "34px",
    margin: "5px 0 8px",
    fontWeight: "bold"
  },

  subtitle: {
    color: "#8c6474",
    fontSize: "13px",
    lineHeight: "1.5",
    marginBottom: "28px"
  },

  section: {
    textAlign: "left",
    marginBottom: "22px"
  },

  label: {
    display: "block",
    color: "#b64d79",
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "8px"
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    background: "#fff8fb",
    border: "2px solid #f3bfd3",
    borderRadius: "17px",
    padding: "4px 13px"
  },

  currency: {
    color: "#c64f7e",
    fontSize: "20px",
    fontWeight: "bold",
    marginRight: "8px"
  },

  input: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    padding: "12px 5px",
    fontSize: "15px",
    color: "#704052",
    fontFamily: "inherit"
  },

  tipGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "8px",
    marginBottom: "10px"
  },

  tipButton: {
    padding: "10px 5px",
    borderRadius: "13px",
    border: "2px solid #f3bfd3",
    background: "#fff8fb",
    color: "#b9517d",
    fontWeight: "bold",
    cursor: "pointer",
    fontFamily: "inherit"
  },

  selectedTip: {
    background: "linear-gradient(135deg, #f28bb4, #d85f8d)",
    color: "white",
    border: "2px solid #d85f8d",
    boxShadow: "0 5px 12px rgba(216, 95, 141, 0.2)"
  },

  select: {
    width: "100%",
    padding: "11px",
    borderRadius: "14px",
    border: "2px solid #f3bfd3",
    background: "#fff8fb",
    color: "#805367",
    outline: "none",
    fontFamily: "inherit",
    fontSize: "13px"
  },

  peopleControl: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#fff8fb",
    border: "2px solid #f3bfd3",
    borderRadius: "17px",
    padding: "6px"
  },

  controlButton: {
    width: "40px",
    height: "40px",
    border: "none",
    borderRadius: "12px",
    background: "#f7c5d9",
    color: "#ad456f",
    fontSize: "23px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  peopleNumber: {
    color: "#bd4e7b",
    fontWeight: "bold",
    fontSize: "17px"
  },

  peopleText: {
    fontSize: "13px",
    fontWeight: "normal",
    color: "#896172"
  },

  resultBox: {
    background:
      "linear-gradient(145deg, #fff0f7, #ffe5f0)",
    border: "2px dashed #efa9c5",
    borderRadius: "24px",
    padding: "22px",
    marginTop: "8px"
  },

  resultHeading: {
    color: "#bd4f7d",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "2px",
    margin: "0 0 18px"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    color: "#795263",
    fontSize: "14px",
    margin: "10px 0"
  },

  divider: {
    height: "1px",
    background: "#edb8cc",
    margin: "15px 0"
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    color: "#bd4777",
    fontSize: "20px",
    fontWeight: "bold"
  },

  perPerson: {
    marginTop: "18px",
    background: "rgba(255, 255, 255, 0.7)",
    borderRadius: "15px",
    padding: "12px",
    color: "#87586b",
    fontSize: "12px"
  },

  perPersonAmount: {
    display: "block",
    color: "#c34e7d",
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "4px"
  },

  resetButton: {
    border: "none",
    background: "transparent",
    color: "#b85c80",
    fontFamily: "inherit",
    fontSize: "13px",
    marginTop: "18px",
    cursor: "pointer",
    textDecoration: "underline"
  },

  footer: {
    color: "#c27b99",
    fontSize: "10px",
    marginTop: "22px",
    letterSpacing: "1px"
  }
};

export default App;