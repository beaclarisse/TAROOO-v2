import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../layout/Header';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PostDetail = () => {
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchComments = async () => {
    try {
      const commentsResponse = await axios.get(`http://localhost:3000/api/v1/getComment/${id}`);
      setComments(commentsResponse.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const postResponse = await axios.get(`http://localhost:3000/api/v1/posts/${id}`);
        setPost(postResponse.data);

        if (postResponse.data.userId && user) {
          const userResponse = await axios.get(`http://localhost:3000/api/v1/users/${postResponse.data.userId}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setUser(userResponse.data);
        }

        await fetchComments();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const response = await axios.post(`http://localhost:3000/api/v1/addComment`, {
        postId: id,
        content: newComment,
      });

      setComments([...comments, response.data.comment]);
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async () => {
    try {
      const postResponse = await axios.get(`http://localhost:3000/api/v1/updatepost/${id}`);
      navigate(`/edit-post/${id}`, { state: { post: postResponse.data } });
    } catch (error) {
      console.error('Error fetching post for editing:', error);
    }
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:4001/api/v1/deletePost/${id}`)
      .then(() => {
        // Update state or perform any other necessary actions
        console.log('Post deleted successfully');
      })
      .catch((err) => {
        console.error(err);
        console.log('Failed to delete post');
      });
  };

  return (
    <div className="post-detail-container" style={{ background: "white"}}>
      {/* <Header /> */}
      {[1, 2, 3, 4, 5].map((_, index) => (
        <div key={index} className="space-before-post-container" />
      ))}
      <div className="content-wrapper">
        <div className="post-content-wrapper">
          <div className="user-details">
            <span className="user-icon">👤</span>
            {user && (
              <span className="username">{user.username}</span>
            )}

            {user && user.id === post.userId && (
              <div className="edit-delete-icons">
                <EditIcon onClick={handleEdit} className="edit-icon" />
                <DeleteIcon onClick={handleDelete} className="delete-icon" />
              </div>
            )}
          </div>
          <h2>{post.title}</h2> 
          <p>{post.content}</p>
          {post.images && post.images.length > 0 && (
            <img
              src={post.images[0].url}
              alt="Post"
              className="post-image"
            />
          )}

          {/* Comment Section */}
          <form onSubmit={handleCommentSubmit}>
            <label htmlFor="newComment">Add a Comment:</label>
            <textarea
              id="newComment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Comment'}
            </button>
          </form>

          <div className="comments-section">
            <h3>Comments</h3>
            {isLoading ? (
              <p>Loading comments...</p>
            ) : (
              <div>
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment._id} className="comment-container">
                      <span className="user-icon">👤</span>
                      <span className="username">{comment.username}</span>
                      <p className="comment-content">{comment?.content ? comment.content : 'No content available'}</p>
                    </div>
                  ))
                ) : (
                  <p>No comments available</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

