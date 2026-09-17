import React, { useState } from "react";

function App() {
  const [color, setColor] = useState("#ffffff");

  const generateColor = () => {
    const randomColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);

    setColor(randomColor);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Georgia, serif",
        transition: "background-color 0.5s ease",
        padding: "20px",
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          width: "420px",
          padding: "45px 35px",
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.82)",
          border: "3px solid rgba(255, 255, 255, 0.9)",
          borderRadius: "30px",
          boxShadow: "0 20px 45px rgba(0, 0, 0, 0.18)",
          backdropFilter: "blur(10px)"
        }}
      >
        {/* Cute decoration */}
        <div
          style={{
            fontSize: "28px",
            marginBottom: "8px"
          }}
        >
          🎀 ✦ 🎀
        </div>

        {/* Small heading */}
        <p
          style={{
            margin: "0 0 10px",
            fontSize: "12px",
            letterSpacing: "4px",
            color: "#9b5c76",
            fontWeight: "bold"
          }}
        >
          ♡ COLOR OF THE DAY ♡
        </p>

        {/* Main heading */}
        <h1
          style={{
            margin: "5px 0 12px",
            fontSize: "40px",
            color: "#63384c",
            lineHeight: "1.1"
          }}
        >
          Color
          <br />
          Generator
        </h1>

        <p
          style={{
            margin: "0 auto 25px",
            color: "#806575",
            fontSize: "15px",
            lineHeight: "1.5",
            maxWidth: "300px"
          }}
        >
          Create a cute little random color and discover your new favorite shade!
        </p>

        {/* Color preview */}
        <div
          style={{
            width: "150px",
            height: "150px",
            margin: "0 auto 22px",
            backgroundColor: color,
            borderRadius: "50%",
            border: "7px solid white",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.18)",
            transition: "background-color 0.5s ease"
          }}
        ></div>

        {/* Hex code */}
        <div
          style={{
            display: "inline-block",
            padding: "10px 22px",
            marginBottom: "25px",
            backgroundColor: "#fff4f8",
            border: "2px solid #f2c2d4",
            borderRadius: "20px",
            color: "#a84f73",
            fontSize: "22px",
            fontWeight: "bold",
            letterSpacing: "2px"
          }}
        >
          {color}
        </div>

        <br />

        {/* Generate button */}
        <button
          onClick={generateColor}
          style={{
            padding: "14px 30px",
            fontSize: "17px",
            fontFamily: "Georgia, serif",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#c96b91",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            boxShadow: "0 7px 15px rgba(180, 80, 120, 0.3)"
          }}
        >
          Generate Color ♡
        </button>

        {/* Footer */}
        <p
          style={{
            marginTop: "25px",
            marginBottom: "0",
            fontSize: "12px",
            color: "#a47789",
            fontStyle: "italic"
          }}
        >
          made with ♡ & a little randomness
        </p>
      </div>
    </div>
  );
}

export default App;