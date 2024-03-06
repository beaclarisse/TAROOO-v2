import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';
// import Loader from '../layout/Loader';

const User = ({ username }) => (
  <div className="user">
    <span className="user-icon">👤</span>
    <span className="username">{username}</span>
  </div>
);

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({});
  const [addingPost, setAddingPost] = useState(false);


  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleImageChange = (e) => {
    const images = e.target.files[0];
    setNewPost({ ...newPost, images });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', newPost.title);
    formData.append('content', newPost.content);
    formData.append('images', newPost.images);

    try {
      const response = await axios.post('http://localhost:3000/api/v1/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPosts([response.data, ...posts]);
      setNewPost({ title: '', content: '', images: null });
      setAddingPost(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="forum-container">
      <Header />

      {addingPost ? (
        <div className="add-post-form">
          <form onSubmit={handlePostSubmit} encType="multipart/form-data">
            <label>Title:</label>
            <input type="text" name="title" value={newPost.title} onChange={handleInputChange} />

            <label>Content:</label>
            <textarea name="content" value={newPost.content} onChange={handleInputChange}></textarea>

            <label>Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />

            <button type="submit">Submit Post</button>
          </form>
        </div>
      ) : (
        <div className="posts-container">
          <h2 className="posts-header" align="center">Post Forum</h2>
          <div className="add-post-container">
            <button
              type="button"
              onClick={() => setAddingPost(!addingPost)}
              style={{
                borderRadius: '10px',
                backgroundColor: 'green',
                color: 'white',
                padding: '10px 20px',
                cursor: 'pointer',
              }}
            >
              {addingPost ? 'Cancel' : 'Add Post'}
            </button>

          </div>
          {posts.map(post => (
            <div key={post._id} className="post-card">
              <User username={post.username} />
              <h3 className="post-title">{post.title}</h3>
              <p className="post-content">{post.content}</p>
              {post.images && post.images.length > 0 && (
                <img
                  src={post.images[0].url}
                />
              )}
              <Link to={{ pathname: `/post/${post._id}`, state: { post } }} className="view-post-link">
                View Post
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Forum;
