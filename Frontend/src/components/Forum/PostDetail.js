import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { id } = useParams();

  useEffect(() => {
    // Fetch post details
    axios.get(`http://localhost:3000/api/v1/posts/${id}`)
      .then(response => {
        setPost(response.data);
        // Fetch user details using userId
        if (response.data.userId) {
          axios.get(`http://localhost:3000/api/v1/users/${response.data.userId}`)
            .then(userResponse => setUser(userResponse.data))
            .catch(error => console.error('Error fetching user details:', error));
        }
      });

    // Fetch comments for the post
    axios.get(`http://localhost:3000/api/v1/posts/${id}/comments`)
      .then(response => setComments(response.data.comments))
      .catch(error => console.error('Error fetching comments:', error));
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post(`http://localhost:3000/api/v1/posts/${id}/comments`, {
        content: newComment,
      });

      setComments([...comments, response.data.comment]);
      
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <div className="post-detail-container">
      <div className="post-content-wrapper">
        <div className="user-details">
          <p>User ID: {user.userId}</p>
        </div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        {post.images && post.images.length > 0 && (
          <img src={post.images[0].url} alt="Post Image" />
        )}

        {/* Comment Section */}
        <div className="comments-section">
          <h3>Comments</h3>
          <ul>
            {comments.map(comment => (
              <li key={comment._id}>{comment.content}</li>
            ))}
          </ul>

        
          <form onSubmit={handleCommentSubmit}>
            <label htmlFor="newComment">Add a Comment:</label>
            <textarea
              id="newComment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit">Submit Comment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
