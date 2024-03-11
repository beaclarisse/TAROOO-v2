import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../layout/Header';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUser } from '../../utils/helpers';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';


const PostDetail = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [DeleteCommentId, setDeleteCommentId] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteCommentId, setCommentIdToDelete] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const postResponse = await axios.get(`http://localhost:3000/api/v1/posts/${id}`);
        setPost(postResponse.data);

        const commentsResponse = await axios.get(`http://localhost:3000/api/v1/getComment/${id}`);
        setComments(commentsResponse.data.comments);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, isSubmitting]);


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
        console.log('Post deleted successfully');
      })
      .catch((err) => {
        console.error(err);
        console.log('Failed to delete post');
      });
  };


  const handleDeleteComment = (commentId) => {
    setCommentIdToDelete(commentId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDeleteComment = async () => {
    try {
      if (deleteCommentId === null) {
        console.error('Comment ID is null');
        return;
      }

      await axios.delete(`http://localhost:3000/api/v1/deleteComment/${deleteCommentId}`);
      setComments((prevComments) => prevComments.filter((comment) => comment._id !== deleteCommentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    } finally {
      setDeleteDialogOpen(false);
      setCommentIdToDelete(null);
    }
  };


  const handleCancelDeleteComment = () => {
    setDeleteDialogOpen(false);
    setDeleteCommentId(null);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const currentUser = getUser();

      console.log('Current User:', currentUser);

      const response = await axios.post(
        `http://localhost:3000/api/v1/addComment`,
        {
          postId: id,
          content: newComment,
          commentor: currentUser.id,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      console.log('Response:', response.data);

      setComments([...comments, response.data.comment]);
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
      console.log('Axios Error:', error.response);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-detail-container" style={{ background: 'white' }}>
      <Header />
      {[1, 2, 3, 4, 5].map((_, index) => (
        <div key={index} className="space-before-post-container" />
      ))}
      <div className="content-wrapper">
        <div className="post-content-wrapper">
          <div className="user-details">
            {/* <span className="user-icon">👤</span> */}
            {post.user && post.user.avatar && (
              <img src={post.user.avatar} alt="User Avatar" className="user-avatar" />
            )}
          </div>

          {/* Updated Post details section */}
          <div className="post-details-section">
            <div className="post-container">
              <div>
                {/* Use post.poster instead of post.poster.name */}
                <span className="username" style={{ fontWeight: 'bold' }}><h3></h3>Posted by: {post.user && post.user.name}</span>
                <p className="post-content">
                  {post?.content ? post.content : 'No content available'}
                  {post.images && post.images.length > 0 && (
                    <div>
                      {post.images.map((image) => (
                        <img key={image.public_id} src={image.url} alt="Post" className="post-image" />
                      ))}
                    </div>
                  )}
                </p>
              </div>
              {post.user && post.user.id === user.id && (
                <div>
                  <IconButton onClick={handleEdit}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              )}
            </div>
          </div>


          {/* Comment form */}
          <form onSubmit={handleCommentSubmit}>
            <label htmlFor="newComment">Add Comment:</label>
            <textarea
              id="newComment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit" disabled={isSubmitting} className="submit-comment-button">
              {isSubmitting ? 'Submitting...' : 'Submit Comment'}
            </button>

          </form>

          {/* Comments section */}
          <div className="comments-section">
            <h3>Comments</h3>
            {isLoading ? (
              <p>Loading comments...</p>
            ) : (
              <div>
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment._id} className="comment-container">
                      <div>
                      <span className="username" style={{ fontWeight: 'bold' }}>{comment.commentor.name}</span>
                        <p className="comment-content">
                          {comment?.content ? comment.content : 'No content available'}
                        </p>
                      </div>
                      {comment.commentor.id === user.id && (
                        <IconButton onClick={() => handleDeleteComment(comment._id)}>
                          <MoreHorizIcon />
                        </IconButton>
                      )}
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

      {/* Delete Comment Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={handleCancelDeleteComment}>
        <DialogTitle>Delete Comment</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this comment?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDeleteComment} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDeleteComment} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostDetail;