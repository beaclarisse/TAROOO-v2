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
import Filter from 'bad-words';
import { ToastContainer, toast } from 'react-toastify';


const ConsultDetail = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [DeleteCommentId, setDeleteCommentId] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteCommentId, setCommentIdToDelete] = useState(null);
  const [filter] = useState(new Filter());
  const [replyCommentId, setReplyCommentId] = useState(null);
  const [newReply, setNewReply] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const postResponse = await axios.get(`http://localhost:3000/api/v1/consultations/${id}`);
        setPost(postResponse.data);

        const commentsResponse = await axios.get(`http://localhost:3000/api/v1/getConsultComment/${id}`);
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

      const postResponse = await axios.get(`http://localhost:3000/api/v1/updateConsultpost/${id}`);
      navigate(`/edit-post/${id}`, { state: { post: postResponse.data } });
    } catch (error) {
      console.error('Error fetching post for editing:', error);
    }
  };


  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4001/api/v1/deleteConsultPost/${id}`);
      console.log('Post deleted successfully');
    } catch (err) {
      console.error(err);
      console.log('Failed to delete post');
    }
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

      await axios.delete(`http://localhost:3000/api/v1/deleteConsultComment/${deleteCommentId}`);
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
      const filteredComment = filter.clean(newComment);

      const response = await axios.post(
        `http://localhost:3000/api/v1/addConsultComment`,
        {
          postId: id,
          content: filteredComment,
          commentor: currentUser.id,
          // Add a flag to indicate if the comment contains profanity
          containsProfanity: newComment !== filteredComment,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      // If the comment contains profanity, do not add it to the state
      if (newComment !== filteredComment) {
        toast.warning("Your comment contains profanity and will be deleted.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Delayed deletion after 5 seconds
        setTimeout(async () => {
          await axios.delete(
            `http://localhost:3000/api/v1/deleteConsultComment/${response.data.comment._id}`
          );
        }, 5000);
      } else {
        // If the comment is clean, add it to the state
        setComments([...comments, response.data.comment]);
      }

      setNewComment('');
      setReplyCommentId(null);
      setNewReply('');
    } catch (error) {
      console.error('Error creating comment:', error);
      console.log('Axios Error:', error.response);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = (commentId) => {
    setReplyCommentId(commentId);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
  
    try {
      const currentUser = getUser();
      const response = await axios.post(
        `http://localhost:3000/api/v1/addConsultReply/${replyCommentId}`,
        {
          content: newReply,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
  
      const newReplyData = response.data.reply || response.data;
  
      setComments((prevComments) => {
        const updatedComments = prevComments.map((prevComment) => {
          if (prevComment._id === replyCommentId) {
            return {
              ...prevComment,
              replies: [...prevComment.replies, newReplyData],
            };
          }
          return prevComment;
        });
        return updatedComments;
      });
  
      setNewReply('');
      setReplyCommentId(null);
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };
  





  // const handleCommentSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     setIsSubmitting(true);
  //     const currentUser = getUser();

  //     console.log('Current User:', currentUser);

  //     const response = await axios.post(
  //       `http://localhost:3000/api/v1/addComment`,
  //       {
  //         postId: id,
  //         content: newComment,
  //         commentor: currentUser.id,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${currentUser.token}`,
  //         },
  //       }
  //     );

  //     console.log('Response:', response.data);

  //     setComments([...comments, response.data.comment]);
  //     setNewComment('');
  //   } catch (error) {
  //     console.error('Error creating comment:', error);
  //     console.log('Axios Error:', error.response);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <div className="post-detail-container" style={{ background: '#1b1b1b' }}>
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
                  <IconButton onClick={handleEdit} style={{ color: 'white' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={handleDelete} style={{ color: 'white' }}>
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
                          {/* Add a button to trigger the reply */}
                          <button onClick={() => handleReply(comment._id)}>Reply</button>
                        </p>

                        {/* Conditionally render the text field for replies */}
                        {replyCommentId === comment._id && (
                          <form onSubmit={handleReplySubmit}>
                            <TextField
                              id="newReply"
                              label="Reply"
                              variant="outlined"
                              value={newReply}
                              onChange={(e) => setNewReply(e.target.value)}
                            />
                            <button type="submit" disabled={!newReply.trim()} className="submit-reply-button">
                              Submit Reply
                            </button>
                          </form>
                        )}

                        {/* Render replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div>
                            <h4>Replies:</h4>
                            {comment.replies.map((reply) => (
                              <div key={reply._id} className="reply-container">
                                <span className="username">{reply.replyBy.name}</span>
                                <p className="reply-content">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {comment.commentor.id === user.id && (
                        <IconButton onClick={() => handleDeleteComment(comment._id)} style={{ color: 'white' }}>
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

export default ConsultDetail;