import React, { useEffect, useMemo, useState } from "react";

/*
  DAY 8 - TODO LIST
  Preppy Todo Manager
  ------------------------------------------------------------
  Features:
  1. Add tasks
  2. Delete tasks
  3. Edit tasks
  4. Complete / uncomplete tasks
  5. Priority levels
  6. Categories
  7. Due dates
  8. Search
  9. Status filters
  10. Priority filters
  11. Category filters
  12. Sorting
  13. Task statistics
  14. Progress bar
  15. Clear completed
  16. Clear all
  17. LocalStorage
  18. Dark mode
  19. Keyboard shortcuts
  20. Character counter
  21. Empty-state messages
  22. Confirmation before deleting everything
  23. Responsive layout
  24. Preppy pink UI
*/

const STORAGE_KEY = "preppy-todo-day-8";
const THEME_KEY = "preppy-todo-theme";

const initialTasks = [
  {
    id: 1,
    title: "Finish Day 8 React project",
    category: "Study",
    priority: "High",
    dueDate: "",
    completed: false,
    createdAt: Date.now(),
  },
  {
    id: 2,
    title: "Drink some water",
    category: "Personal",
    priority: "Medium",
    dueDate: "",
    completed: false,
    createdAt: Date.now() + 1,
  },
];

const categories = [
  "Study",
  "Work",
  "Personal",
  "Shopping",
  "Health",
  "Other",
];

const priorities = ["Low", "Medium", "High"];

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        return JSON.parse(saved);
      }

      return initialTasks;
    } catch {
      return initialTasks;
    }
  });

  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Study");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingCategory, setEditingCategory] = useState("Study");
  const [editingPriority, setEditingPriority] = useState("Medium");
  const [editingDueDate, setEditingDueDate] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem(THEME_KEY) === "dark";
  });
  const [showFilters, setShowFilters] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(
      THEME_KEY,
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  useEffect(() => {
    if (!message) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setMessage("");
    }, 2500);

    return () => clearTimeout(timer);
  }, [message]);

  const addTask = () => {
    const cleanTask = task.trim();

    if (cleanTask === "") {
      setMessage("Please enter a task first ♡");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: cleanTask,
      category,
      priority,
      dueDate,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ]);

    setTask("");
    setDueDate("");
    setPriority("Medium");
    setCategory("Study");
    setMessage("Task added successfully 🎀");
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.filter((item) => item.id !== id)
    );

    setMessage("Task deleted ♡");
  };

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditingText(item.title);
    setEditingCategory(item.category);
    setEditingPriority(item.priority);
    setEditingDueDate(item.dueDate);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
    setEditingCategory("Study");
    setEditingPriority("Medium");
    setEditingDueDate("");
  };

  const saveEdit = () => {
    const cleanText = editingText.trim();

    if (cleanText === "") {
      setMessage("A task cannot be empty ♡");
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === editingId
          ? {
              ...item,
              title: cleanText,
              category: editingCategory,
              priority: editingPriority,
              dueDate: editingDueDate,
            }
          : item
      )
    );

    cancelEditing();
    setMessage("Task updated ✨");
  };

  const clearCompleted = () => {
    setTasks((currentTasks) =>
      currentTasks.filter((item) => !item.completed)
    );

    setMessage("Completed tasks cleared ♡");
  };

  const clearAll = () => {
    const shouldClear = window.confirm(
      "Delete all tasks? This cannot be undone."
    );

    if (!shouldClear) {
      return;
    }

    setTasks([]);
    setMessage("All tasks cleared.");
  };

  const markAllComplete = () => {
    setTasks((currentTasks) =>
      currentTasks.map((item) => ({
        ...item,
        completed: true,
      }))
    );

    setMessage("Everything is complete! 🎀");
  };

  const markAllIncomplete = () => {
    setTasks((currentTasks) =>
      currentTasks.map((item) => ({
        ...item,
        completed: false,
      }))
    );

    setMessage("Tasks marked as active.");
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      addTask();
    }
  };

  const isOverdue = (item) => {
    if (!item.dueDate || item.completed) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(`${item.dueDate}T00:00:00`);

    return due < today;
  };

  const isDueToday = (item) => {
    if (!item.dueDate) {
      return false;
    }

    const today = new Date();
    const due = new Date(`${item.dueDate}T00:00:00`);

    return (
      today.getFullYear() === due.getFullYear() &&
      today.getMonth() === due.getMonth() &&
      today.getDate() === due.getDate()
    );
  };

  const formatDate = (date) => {
    if (!date) {
      return "No due date";
    }

    const parsed = new Date(`${date}T00:00:00`);

    return parsed.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    result = result.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" && !item.completed) ||
        (statusFilter === "Completed" && item.completed);

      const matchesPriority =
        priorityFilter === "All" ||
        item.priority === priorityFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesCategory
      );
    });

    if (sortBy === "Newest") {
      result.sort(
        (a, b) => b.createdAt - a.createdAt
      );
    }

    if (sortBy === "Oldest") {
      result.sort(
        (a, b) => a.createdAt - b.createdAt
      );
    }

    if (sortBy === "Priority") {
      const order = {
        High: 1,
        Medium: 2,
        Low: 3,
      };

      result.sort(
        (a, b) =>
          order[a.priority] - order[b.priority]
      );
    }

    if (sortBy === "Due Date") {
      result.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        return (
          new Date(`${a.dueDate}T00:00:00`) -
          new Date(`${b.dueDate}T00:00:00`)
        );
      });
    }

    if (sortBy === "A-Z") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [
    tasks,
    search,
    statusFilter,
    priorityFilter,
    categoryFilter,
    sortBy,
  ]);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  const activeTasks = totalTasks - completedTasks;

  const highPriorityTasks = tasks.filter(
    (item) => item.priority === "High" && !item.completed
  ).length;

  const overdueTasks = tasks.filter(
    (item) => isOverdue(item)
  ).length;

  const todayTasks = tasks.filter(
    (item) => isDueToday(item)
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  const hasFilters =
    search !== "" ||
    statusFilter !== "All" ||
    priorityFilter !== "All" ||
    categoryFilter !== "All";

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setCategoryFilter("All");
    setSortBy("Newest");
  };

  return (
    <div
      style={
        darkMode
          ? styles.darkContainer
          : styles.container
      }
    >
      <style>{globalStyles}</style>

      <header style={styles.header}>
        <div style={styles.headerDecor}>
          🎀 ✦ ♡ ✦ 🎀
        </div>

        <p style={styles.eyebrow}>
          ✧ DAY 08 • PRODUCTIVITY ✧
        </p>

        <h1 style={styles.title}>
          My Todo List
        </h1>

        <p style={styles.subtitle}>
          Organize your day, one tiny task at a time ♡
        </p>

        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          style={styles.themeButton}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      {message && (
        <div style={styles.toast}>
          {message}
        </div>
      )}

      <main style={styles.main}>
        <section style={styles.addCard}>
          <div style={styles.sectionHeading}>
            <div>
              <p style={styles.cardEyebrow}>
                ✦ WHAT'S NEXT?
              </p>

              <h2 style={styles.cardTitle}>
                Add a new task
              </h2>
            </div>

            <span style={styles.ribbon}>
              ♡
            </span>
          </div>

          <textarea
            value={task}
            onChange={(event) =>
              setTask(event.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Write something you want to accomplish..."
            maxLength={200}
            style={styles.textarea}
          />

          <div style={styles.characterCount}>
            {task.length}/200 characters
          </div>

          <div style={styles.formGrid}>
            <label style={styles.label}>
              Category
              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                style={styles.select}
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label style={styles.label}>
              Priority
              <select
                value={priority}
                onChange={(event) =>
                  setPriority(event.target.value)
                }
                style={styles.select}
              >
                {priorities.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label style={styles.label}>
              Due date
              <input
                type="date"
                value={dueDate}
                onChange={(event) =>
                  setDueDate(event.target.value)
                }
                style={styles.select}
              />
            </label>
          </div>

          <button
            type="button"
            onClick={addTask}
            style={styles.addButton}
          >
            ✨ Add Task
          </button>
        </section>

        <section style={styles.statsGrid}>
          <StatCard
            icon="📝"
            number={totalTasks}
            label="Total Tasks"
          />

          <StatCard
            icon="🌷"
            number={activeTasks}
            label="Active"
          />

          <StatCard
            icon="💗"
            number={completedTasks}
            label="Completed"
          />

          <StatCard
            icon="🔥"
            number={highPriorityTasks}
            label="High Priority"
          />
        </section>

        <section style={styles.progressCard}>
          <div style={styles.progressHeader}>
            <div>
              <p style={styles.cardEyebrow}>
                ✦ YOUR PROGRESS
              </p>

              <h2 style={styles.cardTitle}>
                {progress}% complete
              </h2>
            </div>

            <span style={styles.progressEmoji}>
              {progress === 100 ? "🎉" : "🎀"}
            </span>
          </div>

          <div style={styles.progressTrack}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progress}%`,
              }}
            />
          </div>

          <p style={styles.progressText}>
            {completedTasks} of {totalTasks} tasks completed ♡
          </p>
        </section>

        <section style={styles.controlsCard}>
          <div style={styles.controlsTop}>
            <div>
              <p style={styles.cardEyebrow}>
                ✦ FIND YOUR TASKS
              </p>

              <h2 style={styles.cardTitle}>
                Task controls
              </h2>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowFilters(!showFilters)
              }
              style={styles.filterButton}
            >
              {showFilters
                ? "♡ Hide Filters"
                : "♡ Show Filters"}
            </button>
          </div>

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="🔎 Search tasks..."
            style={styles.search}
          />

          {showFilters && (
            <div style={styles.filtersGrid}>
              <label style={styles.label}>
                Status
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  style={styles.select}
                >
                  <option value="All">
                    All
                  </option>
                  <option value="Active">
                    Active
                  </option>
                  <option value="Completed">
                    Completed
                  </option>
                </select>
              </label>

              <label style={styles.label}>
                Priority
                <select
                  value={priorityFilter}
                  onChange={(event) =>
                    setPriorityFilter(event.target.value)
                  }
                  style={styles.select}
                >
                  <option value="All">
                    All
                  </option>
                  {priorities.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label style={styles.label}>
                Category
                <select
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(event.target.value)
                  }
                  style={styles.select}
                >
                  <option value="All">
                    All
                  </option>
                  {categories.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label style={styles.label}>
                Sort by
                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                  style={styles.select}
                >
                  <option value="Newest">
                    Newest
                  </option>
                  <option value="Oldest">
                    Oldest
                  </option>
                  <option value="Priority">
                    Priority
                  </option>
                  <option value="Due Date">
                    Due Date
                  </option>
                  <option value="A-Z">
                    A-Z
                  </option>
                </select>
              </label>
            </div>
          )}

          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              style={styles.resetButton}
            >
              ↺ Reset Filters
            </button>
          )}
        </section>

        <section style={styles.listCard}>
          <div style={styles.listHeader}>
            <div>
              <p style={styles.cardEyebrow}>
                ✦ YOUR PLANS
              </p>

              <h2 style={styles.cardTitle}>
                {filteredTasks.length}{" "}
                {filteredTasks.length === 1
                  ? "task"
                  : "tasks"}
              </h2>
            </div>

            <div style={styles.quickActions}>
              <button
                type="button"
                onClick={markAllComplete}
                style={styles.smallButton}
                disabled={tasks.length === 0}
              >
                ✓ All Done
              </button>

              <button
                type="button"
                onClick={markAllIncomplete}
                style={styles.smallButton}
                disabled={tasks.length === 0}
              >
                ↻ Reset
              </button>
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <EmptyState
              hasFilters={hasFilters}
              resetFilters={resetFilters}
            />
          ) : (
            <div style={styles.taskList}>
              {filteredTasks.map((item) => (
                <TaskItem
                  key={item.id}
                  item={item}
                  editingId={editingId}
                  editingText={editingText}
                  editingCategory={editingCategory}
                  editingPriority={editingPriority}
                  editingDueDate={editingDueDate}
                  setEditingText={setEditingText}
                  setEditingCategory={setEditingCategory}
                  setEditingPriority={setEditingPriority}
                  setEditingDueDate={setEditingDueDate}
                  startEditing={startEditing}
                  cancelEditing={cancelEditing}
                  saveEdit={saveEdit}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                  isOverdue={isOverdue}
                  isDueToday={isDueToday}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
        </section>

        <section style={styles.bottomActions}>
          <button
            type="button"
            onClick={clearCompleted}
            style={styles.dangerSoft}
          >
            🧹 Clear Completed
          </button>

          <button
            type="button"
            onClick={clearAll}
            style={styles.danger}
          >
            🗑️ Clear Everything
          </button>
        </section>

        <section style={styles.miniStats}>
          <MiniStat
            icon="📅"
            value={todayTasks}
            label="Due today"
          />

          <MiniStat
            icon="⚠️"
            value={overdueTasks}
            label="Overdue"
          />

          <MiniStat
            icon="✨"
            value={progress}
            label="Percent done"
            suffix="%"
          />
        </section>
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerDecor}>
          🎀 ♡ ✦ ♡ 🎀
        </div>

        <p>
          Made with React, pink energy & lots of productivity ♡
        </p>

        <small>
          Day 8 • Todo List
        </small>
      </footer>
    </div>
  );
}

function StatCard({
  icon,
  number,
  label,
}) {
  return (
    <div style={styles.statCard}>
      <span style={styles.statIcon}>
        {icon}
      </span>

      <strong style={styles.statNumber}>
        {number}
      </strong>

      <span style={styles.statLabel}>
        {label}
      </span>
    </div>
  );
}

function MiniStat({
  icon,
  value,
  label,
  suffix = "",
}) {
  return (
    <div style={styles.miniStat}>
      <span>
        {icon}
      </span>

      <strong>
        {value}
        {suffix}
      </strong>

      <small>
        {label}
      </small>
    </div>
  );
}

function EmptyState({
  hasFilters,
  resetFilters,
}) {
  return (
    <div style={styles.emptyState}>
      <div style={styles.emptyEmoji}>
        {hasFilters ? "🔎" : "🌷"}
      </div>

      <h3 style={styles.emptyTitle}>
        {hasFilters
          ? "No tasks found"
          : "Your list is empty"}
      </h3>

      <p style={styles.emptyText}>
        {hasFilters
          ? "Try changing your filters or search."
          : "Add a little task above and get started ♡"}
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={resetFilters}
          style={styles.addButtonSmall}
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}

function TaskItem({
  item,
  editingId,
  editingText,
  editingCategory,
  editingPriority,
  editingDueDate,
  setEditingText,
  setEditingCategory,
  setEditingPriority,
  setEditingDueDate,
  startEditing,
  cancelEditing,
  saveEdit,
  toggleTask,
  deleteTask,
  isOverdue,
  isDueToday,
  formatDate,
}) {
  const editing = editingId === item.id;
  const overdue = isOverdue(item);
  const today = isDueToday(item);

  if (editing) {
    return (
      <div style={styles.editCard}>
        <p style={styles.editLabel}>
          ✦ EDITING TASK
        </p>

        <textarea
          value={editingText}
          onChange={(event) =>
            setEditingText(event.target.value)
          }
          maxLength={200}
          style={styles.editTextarea}
        />

        <div style={styles.editGrid}>
          <select
            value={editingCategory}
            onChange={(event) =>
              setEditingCategory(event.target.value)
            }
            style={styles.select}
          >
            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <select
            value={editingPriority}
            onChange={(event) =>
              setEditingPriority(event.target.value)
            }
            style={styles.select}
          >
            {priorities.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={editingDueDate}
            onChange={(event) =>
              setEditingDueDate(event.target.value)
            }
            style={styles.select}
          />
        </div>

        <div style={styles.editActions}>
          <button
            type="button"
            onClick={saveEdit}
            style={styles.saveButton}
          >
            ✓ Save
          </button>

          <button
            type="button"
            onClick={cancelEditing}
            style={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <article
      style={{
        ...styles.taskItem,
        opacity: item.completed ? 0.65 : 1,
      }}
    >
      <button
        type="button"
        onClick={() => toggleTask(item.id)}
        style={
          item.completed
            ? styles.checkboxDone
            : styles.checkbox
        }
        aria-label={
          item.completed
            ? "Mark task incomplete"
            : "Mark task complete"
        }
      >
        {item.completed ? "✓" : ""}
      </button>

      <div style={styles.taskContent}>
        <div style={styles.taskTopLine}>
          <h3
            style={{
              ...styles.taskTitle,
              textDecoration: item.completed
                ? "line-through"
                : "none",
            }}
          >
            {item.title}
          </h3>

          <PriorityBadge
            priority={item.priority}
          />
        </div>

        <div style={styles.taskMeta}>
          <span style={styles.categoryBadge}>
            ♡ {item.category}
          </span>

          {item.dueDate && (
            <span
              style={
                overdue
                  ? styles.overdueBadge
                  : today
                  ? styles.todayBadge
                  : styles.dateBadge
              }
            >
              {overdue
                ? "⚠️ Overdue"
                : today
                ? "🎀 Today"
                : "📅"}{" "}
              {formatDate(item.dueDate)}
            </span>
          )}
        </div>
      </div>

      <div style={styles.taskActions}>
        <button
          type="button"
          onClick={() => startEditing(item)}
          style={styles.iconButton}
          title="Edit task"
        >
          ✏️
        </button>

        <button
          type="button"
          onClick={() => deleteTask(item.id)}
          style={styles.deleteButton}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </article>
  );
}

function PriorityBadge({
  priority,
}) {
  const style =
    priority === "High"
      ? styles.highBadge
      : priority === "Medium"
      ? styles.mediumBadge
      : styles.lowBadge;

  return (
    <span style={style}>
      {priority === "High"
        ? "🔥 High"
        : priority === "Medium"
        ? "🌸 Medium"
        : "🌱 Low"}
    </span>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    boxSizing: "border-box",
    padding: "45px 20px",
    background:
      "linear-gradient(135deg, #ffe6f2 0%, #ffd5e7 45%, #fff3f8 100%)",
    color: "#743b58",
    fontFamily:
      "Arial, Helvetica, sans-serif",
    transition: "0.3s",
  },

  darkContainer: {
    minHeight: "100vh",
    boxSizing: "border-box",
    padding: "45px 20px",
    background:
      "linear-gradient(135deg, #24151e 0%, #3a1d2c 50%, #21131b 100%)",
    color: "#ffeaf4",
    fontFamily:
      "Arial, Helvetica, sans-serif",
    transition: "0.3s",
  },

  header: {
    position: "relative",
    maxWidth: "1100px",
    margin: "0 auto 30px",
    textAlign: "center",
  },

  headerDecor: {
    fontSize: "26px",
    marginBottom: "12px",
  },

  eyebrow: {
    color: "#c55383",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "2px",
    margin: "0 0 8px",
  },

  title: {
    color: "#d64182",
    fontSize: "46px",
    margin: "0",
    fontWeight: "800",
  },

  subtitle: {
    color: "#a25a78",
    fontSize: "15px",
    margin: "10px 0 0",
  },

  themeButton: {
    position: "absolute",
    right: "0",
    top: "5px",
    border: "2px solid #f2aac8",
    borderRadius: "25px",
    padding: "9px 15px",
    background: "#fff7fb",
    color: "#b54e7c",
    fontWeight: "bold",
    cursor: "pointer",
  },

  toast: {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 100,
    background: "#d94783",
    color: "white",
    padding: "12px 22px",
    borderRadius: "30px",
    boxShadow:
      "0 10px 25px rgba(200, 65, 125, 0.3)",
    fontWeight: "bold",
  },

  main: {
    maxWidth: "1100px",
    margin: "0 auto",
  },

  addCard: {
    background: "rgba(255,255,255,0.86)",
    border: "3px solid white",
    borderRadius: "30px",
    padding: "30px",
    boxShadow:
      "0 15px 35px rgba(202, 79, 132, 0.16)",
    marginBottom: "22px",
  },

  sectionHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  cardEyebrow: {
    margin: "0 0 5px",
    color: "#c65a86",
    fontSize: "11px",
    letterSpacing: "1.7px",
    fontWeight: "bold",
  },

  cardTitle: {
    margin: "0",
    color: "#a84470",
    fontSize: "24px",
  },

  ribbon: {
    width: "45px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "#ffe2ee",
    color: "#d44c86",
    fontSize: "22px",
  },

  textarea: {
    width: "100%",
    minHeight: "90px",
    boxSizing: "border-box",
    resize: "vertical",
    border: "2px solid #f2bfd3",
    borderRadius: "18px",
    padding: "15px",
    fontSize: "16px",
    outline: "none",
    color: "#7b405b",
    background: "#fffafd",
  },

  characterCount: {
    textAlign: "right",
    fontSize: "11px",
    color: "#b17b92",
    marginTop: "5px",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "14px",
    marginTop: "18px",
  },

  filtersGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, minmax(0, 1fr))",
    gap: "12px",
    marginTop: "15px",
  },

  editGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "12px",
    marginTop: "12px",
  },

  label: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    color: "#a14c72",
    fontSize: "12px",
    fontWeight: "bold",
  },

  select: {
    width: "100%",
    boxSizing: "border-box",
    border: "2px solid #f1c1d5",
    borderRadius: "13px",
    padding: "11px",
    background: "#fffafd",
    color: "#82445f",
    outline: "none",
    fontSize: "14px",
  },

  addButton: {
    display: "block",
    width: "100%",
    marginTop: "20px",
    border: "none",
    borderRadius: "18px",
    padding: "15px",
    background:
      "linear-gradient(135deg, #e75a98, #d94081)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow:
      "0 9px 20px rgba(211, 62, 126, 0.22)",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, minmax(0, 1fr))",
    gap: "15px",
    marginBottom: "22px",
  },

  statCard: {
    background: "rgba(255,255,255,0.82)",
    border: "2px solid white",
    borderRadius: "23px",
    padding: "20px",
    textAlign: "center",
    boxShadow:
      "0 10px 25px rgba(201, 78, 130, 0.1)",
  },

  statIcon: {
    display: "block",
    fontSize: "25px",
    marginBottom: "7px",
  },

  statNumber: {
    display: "block",
    color: "#d54583",
    fontSize: "27px",
  },

  statLabel: {
    display: "block",
    color: "#a46780",
    fontSize: "12px",
    marginTop: "4px",
  },

  progressCard: {
    background: "rgba(255,255,255,0.84)",
    border: "2px solid white",
    borderRadius: "25px",
    padding: "25px",
    marginBottom: "22px",
  },

  progressHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "15px",
  },

  progressEmoji: {
    fontSize: "30px",
  },

  progressTrack: {
    width: "100%",
    height: "16px",
    background: "#f9dce9",
    borderRadius: "20px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: "20px",
    background:
      "linear-gradient(90deg, #e85c98, #d93d81)",
    transition: "width 0.35s ease",
  },

  progressText: {
    color: "#a56880",
    fontSize: "12px",
    margin: "10px 0 0",
  },

  controlsCard: {
    background: "rgba(255,255,255,0.84)",
    border: "2px solid white",
    borderRadius: "25px",
    padding: "25px",
    marginBottom: "22px",
  },

  controlsTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    marginBottom: "15px",
  },

  filterButton: {
    border: "2px solid #efb1ca",
    borderRadius: "18px",
    padding: "9px 15px",
    background: "#fff7fb",
    color: "#b34c78",
    fontWeight: "bold",
    cursor: "pointer",
  },

  search: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px 16px",
    border: "2px solid #f0bfd3",
    borderRadius: "16px",
    outline: "none",
    fontSize: "15px",
    color: "#7f415d",
    background: "#fffafd",
  },

  resetButton: {
    marginTop: "13px",
    border: "none",
    background: "transparent",
    color: "#c84d80",
    fontWeight: "bold",
    cursor: "pointer",
  },

  listCard: {
    background: "rgba(255,255,255,0.84)",
    border: "2px solid white",
    borderRadius: "28px",
    padding: "25px",
    marginBottom: "20px",
  },

  listHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "20px",
  },

  quickActions: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },

  smallButton: {
    border: "2px solid #f0b8cf",
    borderRadius: "15px",
    padding: "8px 12px",
    background: "#fff7fb",
    color: "#a94a73",
    cursor: "pointer",
    fontWeight: "bold",
  },

  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  taskItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px",
    border: "2px solid #f6d3e1",
    borderRadius: "20px",
    background: "#fffafd",
    transition: "0.2s",
  },

  checkbox: {
    flexShrink: 0,
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    border: "3px solid #e77baa",
    background: "white",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  checkboxDone: {
    flexShrink: 0,
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    border: "3px solid #d94c88",
    background: "#d94c88",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  taskContent: {
    flex: 1,
    minWidth: 0,
  },

  taskTopLine: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    justifyContent: "space-between",
  },

  taskTitle: {
    margin: "0",
    color: "#77415b",
    fontSize: "16px",
    lineHeight: "1.4",
    wordBreak: "break-word",
  },

  taskMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "7px",
    marginTop: "8px",
  },

  categoryBadge: {
    padding: "5px 9px",
    borderRadius: "12px",
    background: "#ffe8f1",
    color: "#ae5277",
    fontSize: "11px",
    fontWeight: "bold",
  },

  dateBadge: {
    padding: "5px 9px",
    borderRadius: "12px",
    background: "#f5edf8",
    color: "#805a8d",
    fontSize: "11px",
    fontWeight: "bold",
  },

  todayBadge: {
    padding: "5px 9px",
    borderRadius: "12px",
    background: "#fff0c9",
    color: "#a8792b",
    fontSize: "11px",
    fontWeight: "bold",
  },

  overdueBadge: {
    padding: "5px 9px",
    borderRadius: "12px",
    background: "#ffe0e0",
    color: "#bd4d4d",
    fontSize: "11px",
    fontWeight: "bold",
  },

  highBadge: {
    flexShrink: 0,
    padding: "5px 9px",
    borderRadius: "12px",
    background: "#ffe0e0",
    color: "#b64e4e",
    fontSize: "10px",
    fontWeight: "bold",
  },

  mediumBadge: {
    flexShrink: 0,
    padding: "5px 9px",
    borderRadius: "12px",
    background: "#fff0cc",
    color: "#9b762f",
    fontSize: "10px",
    fontWeight: "bold",
  },

  lowBadge: {
    flexShrink: 0,
    padding: "5px 9px",
    borderRadius: "12px",
    background: "#e3f5e7",
    color: "#4e8b5b",
    fontSize: "10px",
    fontWeight: "bold",
  },

  taskActions: {
    display: "flex",
    gap: "6px",
    flexShrink: 0,
  },

  iconButton: {
    width: "36px",
    height: "36px",
    border: "none",
    borderRadius: "12px",
    background: "#ffe9f2",
    cursor: "pointer",
  },

  deleteButton: {
    width: "36px",
    height: "36px",
    border: "none",
    borderRadius: "12px",
    background: "#ffe1e1",
    cursor: "pointer",
  },

  editCard: {
    padding: "20px",
    borderRadius: "20px",
    border: "2px dashed #e99abb",
    background: "#fff4f8",
  },

  editLabel: {
    color: "#c24d7c",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "1px",
    margin: "0 0 10px",
  },

  editTextarea: {
    width: "100%",
    minHeight: "70px",
    boxSizing: "border-box",
    border: "2px solid #efbfd2",
    borderRadius: "14px",
    padding: "12px",
    resize: "vertical",
    outline: "none",
    fontSize: "15px",
    color: "#7d405b",
  },

  editActions: {
    display: "flex",
    gap: "10px",
    marginTop: "14px",
  },

  saveButton: {
    border: "none",
    borderRadius: "14px",
    padding: "10px 18px",
    background: "#d94b86",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  cancelButton: {
    border: "2px solid #e7b4ca",
    borderRadius: "14px",
    padding: "10px 18px",
    background: "white",
    color: "#9b5271",
    fontWeight: "bold",
    cursor: "pointer",
  },

  emptyState: {
    textAlign: "center",
    padding: "50px 20px",
    border: "2px dashed #efbfd2",
    borderRadius: "20px",
    background: "#fff8fb",
  },

  emptyEmoji: {
    fontSize: "45px",
    marginBottom: "10px",
  },

  emptyTitle: {
    color: "#b34e78",
    fontSize: "21px",
    margin: "0 0 8px",
  },

  emptyText: {
    color: "#a06c82",
    fontSize: "14px",
    margin: "0 0 18px",
  },

  addButtonSmall: {
    border: "none",
    borderRadius: "15px",
    padding: "10px 18px",
    background: "#d94b86",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  bottomActions: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
    margin: "20px 0",
  },

  dangerSoft: {
    border: "2px solid #e9b2c7",
    borderRadius: "15px",
    padding: "10px 16px",
    background: "#fff7fa",
    color: "#aa5576",
    fontWeight: "bold",
    cursor: "pointer",
  },

  danger: {
    border: "none",
    borderRadius: "15px",
    padding: "10px 16px",
    background: "#b9536d",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  miniStats: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "12px",
    marginBottom: "35px",
  },

  miniStat: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "9px",
    padding: "14px",
    borderRadius: "17px",
    background: "rgba(255,255,255,0.72)",
    color: "#a35b79",
  },

  footer: {
    textAlign: "center",
    color: "#a96480",
    fontSize: "13px",
  },

  footerDecor: {
    fontSize: "21px",
    marginBottom: "8px",
  },
};

const globalStyles = `
  * {
    box-sizing: border-box;
  }

  button,
  input,
  textarea,
  select {
    font-family: inherit;
  }

  button {
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease,
      opacity 0.15s ease;
  }

  button:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  button:active:not(:disabled) {
    transform: translateY(1px);
  }

  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  input:focus,
  textarea:focus,
  select:focus {
    border-color: #e47ca7 !important;
    box-shadow:
      0 0 0 3px rgba(228, 124, 167, 0.15);
  }

  @media (max-width: 850px) {
    .unused {
      display: none;
    }
  }

  @media (max-width: 700px) {
    body {
      margin: 0;
    }
  }

  @media (max-width: 600px) {
    .unused-small {
      display: none;
    }
  }
`;

export default App;
