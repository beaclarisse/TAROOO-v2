import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserPostList = () => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    // Fetch user-specific posts
    axios.get('http://localhost:3000/api/v1/userPosts') // Adjust the endpoint based on your server
      .then(response => setUserPosts(response.data))
      .catch(error => console.error('Error fetching user posts:', error));
  }, []);

  const handleDelete = async (postId) => {
    try {
      const confirmDeletion = window.confirm('Are you sure you want to delete this post?');
      if (confirmDeletion) {
        await axios.delete(`http://localhost:3000/api/v1/deletePost/${postId}`);
        setUserPosts(userPosts.filter((post) => post._id !== postId));
        console.log('Post deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Add handleEdit function if needed

  return (
    <div>
      <h2>Your Posts</h2>
      {userPosts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {/* Add your edit button with onClick handler */}
          <button>Edit</button>
          <button onClick={() => handleDelete(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserPostList;
