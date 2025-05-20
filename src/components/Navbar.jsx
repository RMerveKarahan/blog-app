import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const { themeName, changeTheme } = useContext(ThemeContext);

  return (
    <div style={{
      width: "100%",
      padding: "1rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "var(--background)",
      color: "var(--color)",
      borderBottom: "1px solid var(--color)",
      transition: "background-color 0.3s ease, color 0.3s ease"
    }}>
      <h2>My Blog</h2>
      <div>
        <Link to="/" style={{ marginRight: "1rem", color: "var(--color)", fontWeight: 'bold' }}>Anasayfa</Link>
        <Link to="/about" style={{ marginRight: "1rem", color: "var(--color)", fontWeight: 'bold' }}>Hakkında</Link>
        <Link to="/contact" style={{ marginRight: "1rem", color: "var(--color)", fontWeight: 'bold' }}>İletişim</Link>

        
        <select
          value={themeName}
          onChange={(e) => changeTheme(e.target.value)}
          style={{
            padding: "0.3rem",
            borderRadius: "5px",
            border: "1px solid var(--color)",
            backgroundColor: "var(--background)",
            color: "var(--color)",
            cursor: "pointer"
          }}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="solarized">Solarized</option>
          <option value="highContrast">High Contrast</option>
        </select>
      </div>
    </div>
  );
}
