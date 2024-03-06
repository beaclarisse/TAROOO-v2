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
    const fetchData = async () => {
      try {
        // Fetch post details
        const postResponse = await axios.get(`http://localhost:3000/api/v1/posts/${id}`);
        setPost(postResponse.data);

        // Fetch user details using userId
        if (postResponse.data.userId) {
          const userResponse = await axios.get(`http://localhost:3000/api/v1/users/${postResponse.data.userId}`);
          setUser(userResponse.data);
        }

        // Fetch comments for the post
        const commentsResponse = await axios.get(`http://localhost:3000/api/v1/posts/${id}/comments`);
        setComments(commentsResponse.data.comments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to create a new comment
      const response = await axios.post(`http://localhost:3000/api/v1/posts/${id}/comments`, {
        content: newComment,
      });

      // Update the comments state with the new comment
      setComments([...comments, response.data.comment]);
      // Clear the input field
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

          {/* Comment Form */}
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
