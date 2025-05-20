import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../services/api';
import { Link } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts()
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1rem',
      display: 'grid',
      gap: '1.5rem',
    }}>
    
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>Bloglar</h1>

      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem',
          marginBottom: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '1rem',
          boxSizing: 'border-box'
        }}
      />

      {filteredPosts.slice(0, 10).map(post => (
        <div key={post.id} style={{
          border: '1px solid #ddd',
          borderRadius: '10px',
          padding: '1rem',
          marginBottom: '1.5rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
        }}>
          <h3 style={{ marginBottom: '0.5rem' }}>
            <Link to={`/posts/${post.id}`} style={{ color: '#0077cc', textDecoration: 'none' }}>
              {post.title}
            </Link>
          </h3>

          <img
            src={`https://picsum.photos/seed/${post.id}/600/300`}
            alt="Post görseli"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              marginBottom: '1rem',
              objectFit: 'cover'
            }}
          />

          <p style={{ lineHeight: '1.6' }}>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
