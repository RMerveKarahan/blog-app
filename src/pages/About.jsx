import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: "1rem" }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ marginBottom: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
      >
        ← Geri
      </button>
      <h1>Hakkında</h1><br></br>
      <p>Merhaba! Ben Merve, bu blog sitesini React ve Vite kullanarak oluşturdum.</p>
      <p>Burada çeşitli konularda yazılar paylaşıyorum ve öğrenmeye devam ediyorum.</p>
      <p>İletişime geçmek için: <a href="mailto:email@ornek.com">email@ornek.com</a></p>
    </div>
  );
}
