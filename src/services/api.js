export async function fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  }
  //Bu fonksiyon, ücretsiz JSONPlaceholder API’sinden blog postlarını getiriyor.
  
  export async function fetchPostById(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return response.json();
  }

  export async function fetchCommentsByPostId(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    return await response.json();
  }
  
  export async function createPost(post) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });
  
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
  
    return await response.json();
  }

// API ye yorum ekleyerek sayfaya getirir ve sayfa yenileyince yorumun kaybolmamasını sağlar
  export const postComment = async (postId, comment) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postId,
        name: comment.name,
        body: comment.text,
        email: `${comment.name.toLowerCase()}@mail.com`
      })
    });
  
    if (!response.ok) {
      throw new Error("Yorum gönderilemedi.");
    }
  
    const data = await response.json();
    return data;
  };
  