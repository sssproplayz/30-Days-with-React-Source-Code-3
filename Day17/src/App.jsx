import React, { useEffect, useMemo, useState } from "react";

function App() {
  const categories = [
    { name: "Food", emoji: "🍕" },
    { name: "Travel", emoji: "🚌" },
    { name: "College", emoji: "📚" },
    { name: "Shopping", emoji: "🛍️" },
    { name: "Entertainment", emoji: "🎬" },
    { name: "Bills", emoji: "💳" },
    { name: "Other", emoji: "✨" }
  ];

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [note, setNote] = useState("");

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("collegeExpenses");

    return saved ? JSON.parse(saved) : [];
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem("collegeBudget");

    return saved ? Number(saved) : 5000;
  });

  const [budgetInput, setBudgetInput] = useState("");

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "collegeExpenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(
      "collegeBudget",
      budget.toString()
    );
  }, [budget]);

  const addExpense = () => {
    if (!name.trim() || !amount || Number(amount) <= 0) {
      setMessage("Please enter a valid expense 💗");
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: name.trim(),
      amount: Number(amount),
      category,
      date,
      note: note.trim()
    };

    setExpenses((prev) => [newExpense, ...prev]);

    setName("");
    setAmount("");
    setCategory("Food");
    setDate(new Date().toISOString().split("T")[0]);
    setNote("");

    setMessage("Expense added successfully! 🎀");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) =>
      prev.filter((expense) => expense.id !== id)
    );
  };

  const clearExpenses = () => {
    if (expenses.length === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to clear all expenses?"
    );

    if (confirmed) {
      setExpenses([]);
    }
  };

  const updateBudget = () => {
    if (!budgetInput || Number(budgetInput) <= 0) return;

    setBudget(Number(budgetInput));
    setBudgetInput("");
  };

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const remaining = budget - total;

  const percentageUsed =
    budget > 0
      ? Math.min((total / budget) * 100, 100)
      : 0;

  const filteredExpenses = useMemo(() => {
    let result = [...expenses];

    if (search.trim()) {
      result = result.filter((expense) =>
        expense.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (filterCategory !== "All") {
      result = result.filter(
        (expense) => expense.category === filterCategory
      );
    }

    if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.date) - new Date(a.date)
      );
    }

    if (sortBy === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.date) - new Date(b.date)
      );
    }

    if (sortBy === "highest") {
      result.sort((a, b) => b.amount - a.amount);
    }

    if (sortBy === "lowest") {
      result.sort((a, b) => a.amount - b.amount);
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [expenses, search, filterCategory, sortBy]);

  const categoryTotals = categories.map((cat) => {
    const totalForCategory = expenses
      .filter(
        (expense) => expense.category === cat.name
      )
      .reduce(
        (sum, expense) => sum + expense.amount,
        0
      );

    return {
      ...cat,
      total: totalForCategory
    };
  });

  const biggestExpense =
    expenses.length > 0
      ? [...expenses].sort(
          (a, b) => b.amount - a.amount
        )[0]
      : null;

  const averageExpense =
    expenses.length > 0
      ? total / expenses.length
      : 0;

  const getCategoryEmoji = (categoryName) => {
    const found = categories.find(
      (cat) => cat.name === categoryName
    );

    return found ? found.emoji : "✨";
  };

  return (
    <div style={styles.container}>

      {/* HEADER */}

      <div style={styles.decor}>
        🎀 ✦ ♡ ✦ 🎀
      </div>

      <h1 style={styles.title}>
        College Expense Tracker 💸
      </h1>

      <p style={styles.subtitle}>
        because your money deserves better than
        disappearing mysteriously ✨
      </p>

      {/* MESSAGE */}

      {message && (
        <div style={styles.message}>
          {message}
        </div>
      )}

      {/* DASHBOARD */}

      <div style={styles.dashboard}>

        <div style={styles.statCard}>
          <span style={styles.statEmoji}>💰</span>

          <span style={styles.statLabel}>
            Total Spent
          </span>

          <strong style={styles.statValue}>
            ₹{total.toFixed(2)}
          </strong>
        </div>

        <div style={styles.statCard}>
          <span style={styles.statEmoji}>🎀</span>

          <span style={styles.statLabel}>
            Expenses
          </span>

          <strong style={styles.statValue}>
            {expenses.length}
          </strong>
        </div>

        <div style={styles.statCard}>
          <span style={styles.statEmoji}>📊</span>

          <span style={styles.statLabel}>
            Average
          </span>

          <strong style={styles.statValue}>
            ₹{averageExpense.toFixed(2)}
          </strong>
        </div>

        <div style={styles.statCard}>
          <span style={styles.statEmoji}>👑</span>

          <span style={styles.statLabel}>
            Biggest
          </span>

          <strong style={styles.statValue}>
            ₹{biggestExpense
              ? biggestExpense.amount.toFixed(2)
              : "0.00"}
          </strong>
        </div>

      </div>

      {/* BUDGET */}

      <div style={styles.budgetCard}>

        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>
              🎀 Monthly Budget
            </h2>

            <p style={styles.smallText}>
              Keep those student finances behaving.
            </p>
          </div>

          <strong style={styles.budgetAmount}>
            ₹{budget.toFixed(2)}
          </strong>
        </div>

        <div style={styles.progressBackground}>
          <div
            style={{
              ...styles.progressBar,
              width: `${percentageUsed}%`
            }}
          />
        </div>

        <div style={styles.budgetInfo}>

          <span>
            💸 Spent: ₹{total.toFixed(2)}
          </span>

          <span
            style={{
              color:
                remaining >= 0
                  ? "#3f9865"
                  : "#d94d6a"
            }}
          >
            {remaining >= 0
              ? `💗 Remaining: ₹${remaining.toFixed(2)}`
              : `🚨 Over budget: ₹${Math.abs(
                  remaining
                ).toFixed(2)}`}
          </span>

        </div>

        <div style={styles.budgetEditor}>

          <input
            type="number"
            placeholder="Set new budget"
            value={budgetInput}
            onChange={(e) =>
              setBudgetInput(e.target.value)
            }
            style={styles.smallInput}
          />

          <button
            onClick={updateBudget}
            style={styles.smallButton}
          >
            Update Budget 🎀
          </button>

        </div>

      </div>

      {/* ADD EXPENSE */}

      <div style={styles.addCard}>

        <h2 style={styles.sectionTitle}>
          💌 Add New Expense
        </h2>

        <p style={styles.smallText}>
          Every ₹ counts when you're surviving
          college life.
        </p>

        <div style={styles.formGrid}>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              📝 Expense Name
            </label>

            <input
              placeholder="e.g. Vada Pav"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              💰 Amount
            </label>

            <input
              type="number"
              min="0"
              placeholder="e.g. 50"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              🏷️ Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              style={styles.input}
            >
              {categories.map((cat) => (
                <option
                  key={cat.name}
                  value={cat.name}
                >
                  {cat.emoji} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              📅 Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              style={styles.input}
            />
          </div>

        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>
            💭 Note
          </label>

          <textarea
            placeholder="Optional note..."
            value={note}
            onChange={(e) =>
              setNote(e.target.value)
            }
            style={styles.textarea}
            rows="3"
          />
        </div>

        <button
          onClick={addExpense}
          style={styles.addButton}
        >
          🎀 Add Expense
        </button>

      </div>

      {/* CATEGORY SUMMARY */}

      <div style={styles.categoryCard}>

        <h2 style={styles.sectionTitle}>
          🌸 Spending by Category
        </h2>

        <div style={styles.categoryGrid}>

          {categoryTotals.map((cat) => (

            <div
              key={cat.name}
              style={styles.categoryItem}
            >

              <span style={styles.categoryEmoji}>
                {cat.emoji}
              </span>

              <span style={styles.categoryName}>
                {cat.name}
              </span>

              <strong style={styles.categoryAmount}>
                ₹{cat.total.toFixed(2)}
              </strong>

            </div>

          ))}

        </div>

      </div>

      {/* EXPENSE LIST */}

      <div style={styles.expenseCard}>

        <div style={styles.listHeader}>

          <div>
            <h2 style={styles.sectionTitle}>
              🧾 My Expenses
            </h2>

            <p style={styles.smallText}>
              {filteredExpenses.length} expense
              {filteredExpenses.length !== 1
                ? "s"
                : ""}{" "}
              showing
            </p>
          </div>

          {expenses.length > 0 && (
            <button
              onClick={clearExpenses}
              style={styles.clearButton}
            >
              🗑️ Clear All
            </button>
          )}

        </div>

        {/* SEARCH */}

        <div style={styles.controls}>

          <input
            placeholder="🔍 Search expenses..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={styles.controlInput}
          />

          <select
            value={filterCategory}
            onChange={(e) =>
              setFilterCategory(e.target.value)
            }
            style={styles.controlInput}
          >
            <option value="All">
              🌸 All Categories
            </option>

            {categories.map((cat) => (
              <option
                key={cat.name}
                value={cat.name}
              >
                {cat.emoji} {cat.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            style={styles.controlInput}
          >
            <option value="newest">
              📅 Newest First
            </option>

            <option value="oldest">
              📅 Oldest First
            </option>

            <option value="highest">
              💰 Highest Amount
            </option>

            <option value="lowest">
              💗 Lowest Amount
            </option>

            <option value="name">
              🔤 Name
            </option>
          </select>

        </div>

        {/* EXPENSE ITEMS */}

        {filteredExpenses.length === 0 ? (

          <div style={styles.emptyState}>

            <div style={styles.emptyEmoji}>
              🥺💸
            </div>

            <h3 style={styles.emptyTitle}>
              No expenses found
            </h3>

            <p style={styles.smallText}>
              Your wallet is either beautifully
              peaceful or you haven't added anything
              yet.
            </p>

          </div>

        ) : (

          <div style={styles.expenseList}>

            {filteredExpenses.map((expense) => (

              <div
                key={expense.id}
                style={styles.expenseItem}
              >

                <div style={styles.expenseIcon}>
                  {getCategoryEmoji(
                    expense.category
                  )}
                </div>

                <div style={styles.expenseDetails}>

                  <strong style={styles.expenseName}>
                    {expense.name}
                  </strong>

                  <span style={styles.expenseMeta}>
                    {expense.category} •{" "}
                    {new Date(
                      expense.date
                    ).toLocaleDateString()}
                  </span>

                  {expense.note && (
                    <span style={styles.expenseNote}>
                      💭 {expense.note}
                    </span>
                  )}

                </div>

                <div style={styles.expenseRight}>

                  <strong style={styles.expenseAmount}>
                    ₹{expense.amount.toFixed(2)}
                  </strong>

                  <button
                    onClick={() =>
                      deleteExpense(expense.id)
                    }
                    style={styles.deleteButton}
                    title="Delete expense"
                  >
                    🗑️
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* FOOTER */}

      <div style={styles.footer}>
        🎀 made for college students who
        somehow spend ₹200 on snacks 🎀
      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    boxSizing: "border-box",
    background:
      "linear-gradient(135deg, #ffe2ee, #fff0f7, #f8e5ff)",
    padding: "35px 18px",
    fontFamily:
      "'Trebuchet MS', Arial, sans-serif",
    color: "#9f4b70"
  },

  decor: {
    textAlign: "center",
    fontSize: "25px",
    marginBottom: "8px"
  },

  title: {
    textAlign: "center",
    color: "#c64f82",
    fontSize: "clamp(30px, 6vw, 45px)",
    margin: "5px 0",
    fontWeight: "bold"
  },

  subtitle: {
    textAlign: "center",
    color: "#b36c8c",
    fontSize: "14px",
    marginBottom: "30px"
  },

  message: {
    maxWidth: "600px",
    margin: "0 auto 20px",
    padding: "12px",
    borderRadius: "15px",
    background: "#fff",
    textAlign: "center",
    color: "#c64f82",
    fontWeight: "bold",
    boxShadow:
      "0 5px 15px rgba(190,80,130,0.12)"
  },

  dashboard: {
    maxWidth: "1000px",
    margin: "0 auto 22px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(170px, 1fr))",
    gap: "14px"
  },

  statCard: {
    background: "rgba(255,255,255,0.85)",
    borderRadius: "22px",
    padding: "20px 15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
    boxShadow:
      "0 8px 25px rgba(190,80,130,0.12)"
  },

  statEmoji: {
    fontSize: "27px"
  },

  statLabel: {
    fontSize: "12px",
    color: "#b47793",
    fontWeight: "bold"
  },

  statValue: {
    fontSize: "22px",
    color: "#c64f82"
  },

  budgetCard: {
    maxWidth: "1000px",
    margin: "0 auto 22px",
    background: "rgba(255,255,255,0.88)",
    padding: "25px",
    borderRadius: "25px",
    boxShadow:
      "0 8px 25px rgba(190,80,130,0.12)"
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap"
  },

  sectionTitle: {
    color: "#c64f82",
    margin: "0 0 5px",
    fontSize: "22px"
  },

  smallText: {
    color: "#b47793",
    fontSize: "13px",
    margin: "3px 0"
  },

  budgetAmount: {
    fontSize: "26px",
    color: "#c64f82"
  },

  progressBackground: {
    width: "100%",
    height: "15px",
    background: "#f7dce8",
    borderRadius: "20px",
    overflow: "hidden",
    margin: "18px 0 10px"
  },

  progressBar: {
    height: "100%",
    background:
      "linear-gradient(90deg, #f29abd, #d9689a)",
    borderRadius: "20px",
    transition: "width 0.3s ease"
  },

  budgetInfo: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "8px",
    fontSize: "13px",
    fontWeight: "bold"
  },

  budgetEditor: {
    display: "flex",
    gap: "10px",
    marginTop: "18px",
    flexWrap: "wrap"
  },

  smallInput: {
    flex: "1",
    minWidth: "180px",
    padding: "12px",
    border: "1px solid #efbdd2",
    borderRadius: "14px",
    outline: "none",
    fontSize: "14px"
  },

  smallButton: {
    border: "none",
    borderRadius: "14px",
    padding: "12px 18px",
    background: "#f3a2c1",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  addCard: {
    maxWidth: "1000px",
    margin: "0 auto 22px",
    background: "rgba(255,255,255,0.88)",
    padding: "25px",
    borderRadius: "25px",
    boxShadow:
      "0 8px 25px rgba(190,80,130,0.12)"
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginTop: "20px"
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    marginBottom: "15px"
  },

  label: {
    fontSize: "13px",
    fontWeight: "bold",
    color: "#a54c72"
  },

  input: {
    padding: "13px",
    border: "1px solid #efbdd2",
    borderRadius: "14px",
    outline: "none",
    background: "#fffafd",
    fontSize: "14px",
    color: "#8f4567",
    boxSizing: "border-box",
    width: "100%"
  },

  textarea: {
    padding: "13px",
    border: "1px solid #efbdd2",
    borderRadius: "14px",
    outline: "none",
    background: "#fffafd",
    fontSize: "14px",
    color: "#8f4567",
    resize: "vertical",
    boxSizing: "border-box",
    width: "100%",
    fontFamily:
      "'Trebuchet MS', Arial, sans-serif"
  },

  addButton: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "17px",
    background:
      "linear-gradient(135deg, #f29abd, #d96b9c)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow:
      "0 7px 18px rgba(210,90,140,0.2)"
  },

  categoryCard: {
    maxWidth: "1000px",
    margin: "0 auto 22px",
    background: "rgba(255,255,255,0.88)",
    padding: "25px",
    borderRadius: "25px",
    boxShadow:
      "0 8px 25px rgba(190,80,130,0.12)"
  },

  categoryGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "12px",
    marginTop: "18px"
  },

  categoryItem: {
    background: "#fff0f6",
    borderRadius: "18px",
    padding: "15px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px"
  },

  categoryEmoji: {
    fontSize: "27px"
  },

  categoryName: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#a54c72"
  },

  categoryAmount: {
    fontSize: "15px",
    color: "#c64f82"
  },

  expenseCard: {
    maxWidth: "1000px",
    margin: "0 auto",
    background: "rgba(255,255,255,0.88)",
    padding: "25px",
    borderRadius: "25px",
    boxShadow:
      "0 8px 25px rgba(190,80,130,0.12)"
  },

  listHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap"
  },

  clearButton: {
    border: "1px solid #f0a9c3",
    background: "#fff",
    color: "#c64f82",
    borderRadius: "14px",
    padding: "10px 15px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  controls: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(190px, 1fr))",
    gap: "10px",
    margin: "20px 0"
  },

  controlInput: {
    padding: "12px",
    border: "1px solid #efbdd2",
    borderRadius: "14px",
    background: "#fffafd",
    color: "#98486b",
    outline: "none",
    fontSize: "13px"
  },

  expenseList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  expenseItem: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    padding: "15px",
    background: "#fff3f8",
    border: "1px solid #f5d2e0",
    borderRadius: "18px"
  },

  expenseIcon: {
    width: "45px",
    height: "45px",
    borderRadius: "14px",
    background: "#ffe1ed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "23px",
    flexShrink: 0
  },

  expenseDetails: {
    flex: "1",
    minWidth: "0",
    display: "flex",
    flexDirection: "column",
    gap: "3px"
  },

  expenseName: {
    color: "#a34870",
    fontSize: "15px"
  },

  expenseMeta: {
    color: "#b87c97",
    fontSize: "11px"
  },

  expenseNote: {
    color: "#b47793",
    fontSize: "11px",
    overflowWrap: "break-word"
  },

  expenseRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexShrink: 0
  },

  expenseAmount: {
    color: "#c64f82",
    fontSize: "16px"
  },

  deleteButton: {
    border: "none",
    background: "#ffe0e9",
    borderRadius: "10px",
    padding: "8px",
    cursor: "pointer"
  },

  emptyState: {
    textAlign: "center",
    padding: "50px 20px"
  },

  emptyEmoji: {
    fontSize: "50px",
    marginBottom: "10px"
  },

  emptyTitle: {
    color: "#c64f82",
    margin: "5px"
  },

  footer: {
    textAlign: "center",
    marginTop: "30px",
    color: "#b47793",
    fontSize: "12px"
  }
};

export default App;