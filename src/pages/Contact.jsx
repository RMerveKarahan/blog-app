import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mesaj gönderildi!\n" + JSON.stringify(form, null, 2));
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: "1rem" }}>
     <button 
        onClick={() => navigate(-1)} 
        style={{ marginBottom: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
      >
        ← Geri
      </button>

      <h1>İletişim</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          name="name"
          placeholder="Adınız"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Mesajınız"
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
}
