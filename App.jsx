import React, { useMemo, useState } from "react";

const planets = [
  {
    id: 1,
    name: "Aurelia",
    type: "Ocean World",
    distance: "42.8M km",
    temperature: "18°C",
    moons: 3,
    color: "#55d6be",
    status: "Explored",
    description:
      "A blue-green world covered almost entirely by shallow oceans and floating islands.",
  },
  {
    id: 2,
    name: "Veyron",
    type: "Desert Planet",
    distance: "71.4M km",
    temperature: "47°C",
    moons: 2,
    color: "#e9a23b",
    status: "Unexplored",
    description:
      "A dry planet with enormous dunes and mysterious structures beneath its surface.",
  },
  {
    id: 3,
    name: "Nyx",
    type: "Ice Giant",
    distance: "114M km",
    temperature: "-83°C",
    moons: 14,
    color: "#8ea7ff",
    status: "Explored",
    description:
      "A distant blue giant surrounded by frozen rings and dozens of small moons.",
  },
  {
    id: 4,
    name: "Solara",
    type: "Rocky Planet",
    distance: "23.2M km",
    temperature: "31°C",
    moons: 1,
    color: "#ff6978",
    status: "Explored",
    description:
      "A rocky planet with enormous red valleys and unusually high volcanic activity.",
  },
  {
    id: 5,
    name: "Eclipse",
    type: "Dark World",
    distance: "198M km",
    temperature: "-12°C",
    moons: 7,
    color: "#b56cff",
    status: "Unexplored",
    description:
      "A mysterious world that receives very little light from its distant star.",
  },
  {
    id: 6,
    name: "Zephyria",
    type: "Gas Giant",
    distance: "320M km",
    temperature: "-41°C",
    moons: 28,
    color: "#70d6ff",
    status: "Unexplored",
    description:
      "A massive gas giant with powerful atmospheric storms and bright cloud bands.",
  },
];

const missions = [
  {
    id: 1,
    title: "Map Aurelia's northern ocean",
    planet: "Aurelia",
    progress: 85,
  },
  {
    id: 2,
    title: "Analyze Veyron sand samples",
    planet: "Veyron",
    progress: 54,
  },
  {
    id: 3,
    title: "Photograph Nyx rings",
    planet: "Nyx",
    progress: 32,
  },
  {
    id: 4,
    title: "Scan Solara volcanoes",
    planet: "Solara",
    progress: 72,
  },
];

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(planets[0]);
  const [favorites, setFavorites] = useState([1, 4]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [fuel, setFuel] = useState(76);
  const [completedMissions, setCompletedMissions] = useState([]);
  const [message, setMessage] = useState("Systems operational.");
  const [randomPlanet, setRandomPlanet] = useState(null);

  const filteredPlanets = useMemo(() => {
    return planets.filter((planet) => {
      const matchesSearch =
        planet.name.toLowerCase().includes(search.toLowerCase()) ||
        planet.type.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || planet.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((planetId) => planetId !== id)
        : [...current, id]
    );

    setMessage("Favorite list updated.");
  };

  const launchRandomMission = () => {
    const available = planets.filter((planet) => planet.status === "Unexplored");
    const choice = available[Math.floor(Math.random() * available.length)];

    setRandomPlanet(choice);
    setSelectedPlanet(choice);

    if (fuel >= 15) {
      setFuel((value) => value - 15);
      setMessage(`Mission launched toward ${choice.name}.`);
    } else {
      setMessage("Insufficient fuel for launch.");
    }
  };

  const refuel = () => {
    setFuel(100);
    setMessage("Fuel tanks refilled to maximum capacity.");
  };

  const toggleMission = (id) => {
    setCompletedMissions((current) =>
      current.includes(id)
        ? current.filter((missionId) => missionId !== id)
        : [...current, id]
    );

    setMessage("Mission status updated.");
  };

  return (
    <div className="app">
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #070b18;
          color: #f5f7ff;
        }

        button,
        input,
        select {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        .app {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 15% 15%, #17204b 0, transparent 25%),
            radial-gradient(circle at 85% 80%, #241342 0, transparent 25%),
            #070b18;
        }

        .stars {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.35;
          background-image:
            radial-gradient(circle, white 1px, transparent 1px),
            radial-gradient(circle, white 1px, transparent 1px);
          background-size: 80px 80px, 130px 130px;
          background-position: 10px 20px, 50px 70px;
        }

        .container {
          width: min(1200px, 92%);
          margin: auto;
          position: relative;
          z-index: 1;
        }

        header {
          padding: 35px 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .logo {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #9b7cff;
          box-shadow: 0 0 30px #9b7cff88;
          font-size: 22px;
        }

        .brand h1 {
          margin: 0;
          font-size: 23px;
        }

        .brand p {
          margin: 4px 0 0;
          color: #8992ad;
          font-size: 13px;
        }

        .status {
          padding: 10px 15px;
          border: 1px solid #263252;
          border-radius: 30px;
          background: #10162a;
          color: #9ce6b5;
          font-size: 13px;
        }

        .dashboard {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 20px;
        }

        .panel {
          background: #10162aee;
          border: 1px solid #252e4b;
          border-radius: 20px;
          padding: 22px;
          box-shadow: 0 15px 45px #00000025;
          backdrop-filter: blur(8px);
        }

        .hero {
          min-height: 270px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .eyebrow {
          color: #a998ff;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }

        .hero h2 {
          font-size: 42px;
          margin: 0;
        }

        .hero p {
          color: #aab2c9;
          max-width: 600px;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .primary,
        .secondary {
          border: 0;
          border-radius: 10px;
          padding: 12px 18px;
          transition: 0.2s;
        }

        .primary {
          background: #9b7cff;
          color: white;
        }

        .secondary {
          background: #1c2540;
          color: #dbe0f3;
          border: 1px solid #303b5e;
        }

        .primary:hover,
        .secondary:hover {
          transform: translateY(-2px);
          filter: brightness(1.12);
        }

        .planet-preview {
          min-height: 270px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .planet {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          margin-bottom: 18px;
          box-shadow:
            inset -22px -20px 30px #00000055,
            0 0 55px var(--planet-color);
          background:
            radial-gradient(circle at 30% 25%, #ffffff77, transparent 12%),
            radial-gradient(circle at 65% 65%, #00000033, transparent 35%),
            var(--planet-color);
        }

        .planet-preview h3 {
          margin: 0;
          font-size: 24px;
        }

        .planet-preview span {
          color: #929bb5;
          margin-top: 5px;
        }

        .section {
          margin-top: 20px;
        }

        .section-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .section-title h2 {
          margin: 0;
          font-size: 20px;
        }

        .section-title span {
          color: #747e9b;
          font-size: 13px;
        }

        .controls {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }

        .search {
          flex: 1;
          padding: 12px 15px;
          border-radius: 10px;
          border: 1px solid #293452;
          background: #0b1020;
          color: white;
          outline: none;
        }

        .search:focus {
          border-color: #9b7cff;
        }

        .filter {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #293452;
          background: #0b1020;
          color: white;
        }

        .planet-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 13px;
        }

        .planet-card {
          position: relative;
          padding: 16px;
          border-radius: 15px;
          background: #0c1224;
          border: 1px solid #202b48;
          cursor: pointer;
          transition: 0.2s;
        }

        .planet-card:hover {
          transform: translateY(-3px);
          border-color: #6557a4;
        }

        .mini-planet {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--planet-color);
          box-shadow: 0 0 20px var(--planet-color);
          margin-bottom: 12px;
        }

        .planet-card h3 {
          margin: 0 0 4px;
        }

        .planet-card p {
          color: #78839e;
          margin: 0;
          font-size: 12px;
        }

        .favorite {
          position: absolute;
          right: 12px;
          top: 10px;
          background: transparent;
          border: 0;
          color: #555f7a;
          font-size: 20px;
        }

        .favorite.active {
          color: #ffd166;
        }

        .details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .detail {
          background: #0b1121;
          border: 1px solid #202b45;
          border-radius: 12px;
          padding: 15px;
        }

        .detail small {
          display: block;
          color: #737d98;
          margin-bottom: 5px;
        }

        .detail strong {
          font-size: 17px;
        }

        .mission {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          align-items: center;
          padding: 14px;
          border-radius: 13px;
          background: #0c1224;
          border: 1px solid #202b45;
          margin-bottom: 10px;
        }

        .mission-info {
          flex: 1;
        }

        .mission-title {
          margin: 0 0 5px;
          font-weight: bold;
        }

        .mission-planet {
          color: #7e89a6;
          font-size: 12px;
        }

        .progress {
          height: 7px;
          margin-top: 10px;
          background: #222b43;
          border-radius: 20px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: #9b7cff;
          border-radius: 20px;
          transition: width 0.4s;
        }

        .mission button {
          border: 1px solid #35415f;
          background: #171f35;
          color: #bfc7df;
          padding: 8px 11px;
          border-radius: 8px;
        }

        .mission button.done {
          background: #193625;
          color: #8fe3ad;
          border-color: #315f42;
        }

        .fuel-panel {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .fuel-number {
          font-size: 38px;
          font-weight: bold;
          min-width: 95px;
        }

        .fuel-track {
          flex: 1;
          height: 13px;
          border-radius: 20px;
          background: #252d43;
          overflow: hidden;
        }

        .fuel-level {
          height: 100%;
          background: #63d7a2;
          transition: width 0.4s;
        }

        .notification {
          margin-top: 20px;
          padding: 13px 16px;
          border-radius: 10px;
          background: #171d34;
          color: #aeb8d1;
          border: 1px solid #273252;
          font-size: 13px;
        }

        .random-result {
          margin-top: 15px;
          padding: 15px;
          border-radius: 12px;
          background: #16102c;
          border: 1px solid #463777;
        }

        .random-result strong {
          color: #bdaeff;
        }

        footer {
          text-align: center;
          padding: 35px 0;
          color: #525d78;
          font-size: 12px;
        }

        @media (max-width: 850px) {
          .dashboard {
            grid-template-columns: 1fr;
          }

          .planet-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 550px) {
          header {
            align-items: flex-start;
            flex-direction: column;
          }

          .hero h2 {
            font-size: 32px;
          }

          .planet-grid {
            grid-template-columns: 1fr;
          }

          .controls {
            flex-direction: column;
          }

          .fuel-panel {
            flex-direction: column;
            align-items: flex-start;
          }

          .fuel-track {
            width: 100%;
          }
        }
      `}</style>

      <div className="stars"></div>

      <div className="container">
        <header>
          <div className="brand">
            <div className="logo">✦</div>
            <div>
              <h1>Cosmic Command</h1>
              <p>Exploration control interface</p>
            </div>
          </div>

          <div className="status">● ALL SYSTEMS NOMINAL</div>
        </header>

        <main>
          <div className="dashboard">
            <section className="panel hero">
              <div>
                <div className="eyebrow">Mission Control</div>
                <h2>Explore the unknown.</h2>
                <p>
                  Monitor distant worlds, manage exploration missions,
                  and select your next destination from the command deck.
                </p>
              </div>

              <div className="hero-actions">
                <button
                  className="primary"
                  onClick={launchRandomMission}
                >
                  Launch Random Mission
                </button>

                <button
                  className="secondary"
                  onClick={refuel}
                >
                  Refuel Ship
                </button>
              </div>
            </section>

            <section
              className="panel planet-preview"
              style={{
                "--planet-color": selectedPlanet.color,
              }}
            >
              <div className="planet"></div>
              <h3>{selectedPlanet.name}</h3>
              <span>{selectedPlanet.type}</span>
            </section>
          </div>

          <div className="section">
            <div className="section-title">
              <h2>Planet Database</h2>
              <span>{filteredPlanets.length} worlds found</span>
            </div>

            <div className="panel">
              <div className="controls">
                <input
                  className="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search planets or planet types..."
                />

                <select
                  className="filter"
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                >
                  <option>All</option>
                  <option>Explored</option>
                  <option>Unexplored</option>
                </select>
              </div>

              <div className="planet-grid">
                {filteredPlanets.map((planet) => (
                  <div
                    className="planet-card"
                    key={planet.id}
                    onClick={() => setSelectedPlanet(planet)}
                  >
                    <button
                      className={`favorite ${
                        favorites.includes(planet.id) ? "active" : ""
                      }`}
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleFavorite(planet.id);
                      }}
                    >
                      {favorites.includes(planet.id) ? "★" : "☆"}
                    </button>

                    <div
                      className="mini-planet"
                      style={{
                        "--planet-color": planet.color,
                      }}
                    ></div>

                    <h3>{planet.name}</h3>
                    <p>{planet.type}</p>
                    <p>{planet.distance}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="section">
            <div className="section-title">
              <h2>Selected Planet</h2>
              <span>{selectedPlanet.status}</span>
            </div>

            <div className="panel">
              <div className="details">
                <div className="detail">
                  <small>Name</small>
                  <strong>{selectedPlanet.name}</strong>
                </div>

                <div className="detail">
                  <small>Classification</small>
                  <strong>{selectedPlanet.type}</strong>
                </div>

                <div className="detail">
                  <small>Distance</small>
                  <strong>{selectedPlanet.distance}</strong>
                </div>

                <div className="detail">
                  <small>Temperature</small>
                  <strong>{selectedPlanet.temperature}</strong>
                </div>

                <div className="detail">
                  <small>Moons</small>
                  <strong>{selectedPlanet.moons}</strong>
                </div>

                <div className="detail">
                  <small>Discovery Status</small>
                  <strong>{selectedPlanet.status}</strong>
                </div>
              </div>

              <div className="notification">
                <strong>Planet briefing:</strong>{" "}
                {selectedPlanet.description}
              </div>
            </div>
          </div>

          <div className="section">
            <div className="section-title">
              <h2>Active Missions</h2>
              <span>
                {completedMissions.length}/{missions.length} completed
              </span>
            </div>

            <div className="panel">
              {missions.map((mission) => {
                const completed = completedMissions.includes(mission.id);

                return (
                  <div className="mission" key={mission.id}>
                    <div className="mission-info">
                      <p className="mission-title">
                        {mission.title}
                      </p>

                      <span className="mission-planet">
                        Target: {mission.planet}
                      </span>

                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: completed
                              ? "100%"
                              : `${mission.progress}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <button
                      className={completed ? "done" : ""}
                      onClick={() => toggleMission(mission.id)}
                    >
                      {completed ? "Done" : "Complete"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="section">
            <div className="section-title">
              <h2>Ship Fuel</h2>
              <span>Exploration vessel X-07</span>
            </div>

            <div className="panel fuel-panel">
              <div className="fuel-number">{fuel}%</div>

              <div className="fuel-track">
                <div
                  className="fuel-level"
                  style={{ width: `${fuel}%` }}
                ></div>
              </div>

              <button
                className="secondary"
                onClick={refuel}
              >
                Refill
              </button>
            </div>
          </div>

          {randomPlanet && (
            <div className="random-result">
              Random mission destination selected:{" "}
              <strong>{randomPlanet.name}</strong> ·{" "}
              {randomPlanet.type}
            </div>
          )}

          <div className="notification">
            System message: {message}
          </div>
        </main>

        <footer>
          COSMIC COMMAND CENTER · React Exploration Interface · 2026
        </footer>
      </div>
    </div>
  );
}

export default App;