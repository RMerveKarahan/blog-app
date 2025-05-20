import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, fetchCommentsByPostId, postComment } from '../services/api';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);         // API'den gelen yorumlar
  const [userComments, setUserComments] = useState([]); // Kullanıcının eklediği yorumlar (localStorage’dan)
  const [newComment, setNewComment] = useState({ name: "", text: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  // Düzenleme için state
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Yorum input değişimi
  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prev => ({ ...prev, [name]: value }));
  };

  // Yorum gönderme
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    
    if (newComment.name.trim() && newComment.text.trim()) {
      try {
        const createdComment = await postComment(id, newComment);
        console.log("Yorum başarıyla gönderildi:", createdComment);
        const errors = {};
        if (!newComment.name.trim()) {
          errors.name = "Ad boş olamaz.";
        }
        if (newComment.text.trim().length < 10) {
          errors.text = "Yorum en az 10 karakter olmalı.";
        }
        if (Object.keys(errors).length > 0) {
          setFormErrors(errors);
          return;
        }

        setUserComments(prev => {
          const updated = [...prev, createdComment];
          localStorage.setItem(`userComments-${id}`, JSON.stringify(updated));
          return updated;
        });

        setNewComment({ name: "", text: "" });
      } catch (err) {
        alert("Yorum en az 10 karakter olmalı");
       // console.error("POST hatası:", err);
      }
    }
  };

  // Yorum silme
  const handleDeleteComment = (index) => {
    setUserComments(prev => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem(`userComments-${id}`, JSON.stringify(updated));
      return updated;
    });

    if (editingIndex === index) {
      setEditingIndex(null);
      setEditingText("");
    }
  };

  // Düzenleme başlatma
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(userComments[index].body || userComments[index].text || "");
  };

  // Düzenleme input değişimi
  const handleEditingChange = (e) => {
    setEditingText(e.target.value);
  };

  // Düzenlemeyi kaydet
  const saveEditing = () => {
    if (editingText.trim() === "") return; // boş yorum olmasın

    setUserComments(prev => {
      const updated = prev.map((c, i) =>
        i === editingIndex ? { ...c, body: editingText, text: editingText } : c
      );
      localStorage.setItem(`userComments-${id}`, JSON.stringify(updated));
      return updated;
    });

    setEditingIndex(null);
    setEditingText("");
  };

  // Düzenlemeyi iptal et
  const cancelEditing = () => {
    setEditingIndex(null);
    setEditingText("");
  };

  useEffect(() => {
    setLoading(true);

    Promise.all([fetchPostById(id), fetchCommentsByPostId(id)])
      .then(([postData, commentData]) => {
        setPost(postData);
        setComments(commentData);

        // localStorage'dan kullanıcı yorumlarını yükle
        const storedUserComments = localStorage.getItem(`userComments-${id}`);
        if (storedUserComments) {
          setUserComments(JSON.parse(storedUserComments));
        }

        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading post...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '1rem',
      boxSizing: 'border-box'
    }}>
      <button
        onClick={() => navigate(-1)}
        style={{ marginBottom: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
      >
        ← Geri
      </button>

      <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{post.title}</h1>

      <img
        src={`https://picsum.photos/seed/post-${post.id}/800/400`}
        alt="Post"
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '10px',
          marginBottom: '1rem'
        }}
      />

      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>{post.body}</p>
      <input
  type="text"
  placeholder="Yorumlarda ara..."
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
  style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
/>


      <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Comments</h2>


      {/* API'den gelen yorumlar */}


      {comments.length === 0 && userComments.length === 0 && (
        <p style={{ textAlign: 'center', color: '#888' }}>Henüz yorum yapılmamış, ilk sen ol!</p>
      )}

      {comments.map(comment => (
        <div key={comment.id} style={{
          border: '1px solid #eee',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          backgroundColor: '#fafafa'
        }}>
          <h4 style={{ marginBottom: '0.5rem' }}>{comment.name}</h4>
          <p style={{ fontStyle: 'italic', color: '#555', marginBottom: '0.5rem' }}>{comment.email}</p>
          <p style={{ lineHeight: '1.4' }}>{comment.body}</p>
        </div>
      ))}

      {/* Kullanıcının eklediği yorumlar */}
      {userComments
      .filter(c =>
        c.text?.toLowerCase().includes(filter.toLowerCase()) ||
        c.name?.toLowerCase().includes(filter.toLowerCase())
      )
      .map((comment, idx) => (
        <div key={"user-" + idx} style={{
          border: '1px solid #007bff',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          backgroundColor: '#e7f1ff'
        }}>
          <h4 style={{ marginBottom: '0.5rem' }}>{comment.name}</h4>

          {editingIndex === idx ? (
            <>
              <textarea
                value={editingText}
                onChange={handleEditingChange}
                style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
              />
              <button onClick={saveEditing} style={{ marginRight: "0.5rem" }}>Kaydet</button>
              <button onClick={cancelEditing}>İptal</button>
            </>
          ) : (
            <>
              <p style={{ lineHeight: '1.4' }}>{comment.body || comment.text}</p>
              <button onClick={() => startEditing(idx)} style={{ marginRight: "0.5rem" }}>Düzenle</button>
              <button onClick={() => handleDeleteComment(idx)}>Sil</button>
            </>
          )}
        </div>
      ))}

      <hr style={{ margin: "2rem 0" }} />
      <h3>Yorumlar</h3>

      <form onSubmit={handleCommentSubmit} style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          name="name"
          placeholder="Adınız"
          value={newComment.name}
          onChange={handleCommentChange}
          required
          style={{ padding: "0.5rem", width: "100%", marginBottom: "0.5rem" }}
        />
        <textarea
          name="text"
          placeholder="Yorumunuz"
          value={newComment.text}
          onChange={handleCommentChange}
          required
          style={{ padding: "0.5rem", width: "100%", marginBottom: "0.5rem" }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          Yorum Ekle
        </button>
      </form>
    </div>
  );
}
