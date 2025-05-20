import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/api';  

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createPost({ title, body });
      navigate('/');  // Başarıyla ekleyince anasayfaya dön
    } catch (err) {
      setError('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: '1rem' }}>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{ padding: '0.5rem', fontSize: '1.1rem' }}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={e => setBody(e.target.value)}
          required
          rows={6}
          style={{ padding: '0.5rem', fontSize: '1.1rem' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '0.7rem', fontSize: '1.2rem', cursor: 'pointer' }}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
