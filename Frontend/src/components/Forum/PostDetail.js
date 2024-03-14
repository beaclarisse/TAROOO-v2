import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReplyIcon from '@mui/icons-material/Reply';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';


const PostDetail = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteCommentId, setCommentIdToDelete] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [filter] = useState(new Filter());
  const [replyCommentId, setReplyCommentId] = useState(null);
  const [newReply, setNewReply] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getUser();
  const [repliesVisible, setRepliesVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const toggleRepliesVisibility = () => {
    setRepliesVisible((prev) => !prev);
  };

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
      const postResponse = await axios.get(`http://localhost:3000/api/v1/updatePost/${id}`);
      navigate(`/EditPost/${id}`, { state: { post: postResponse.data } });
    } catch (error) {
      console.error('Error fetching post for editing:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/deletePost/${id}`);
      console.log('Post deleted successfully');
      navigate('/forum');
    } catch (err) {
      console.error(err);
      console.log('Failed to delete post');
    }
  };

  const handleDeleteComment = (commentId) => {
    setCommentIdToDelete(commentId);
    setDeleteDialogOpen(true);
  };

  // const handleDeleteComment = (commentId, commentorId) => {
  //   const currentUser = getUser();
  //   console.log("Current user ID:", currentUser.id);
  //   console.log("Commentor ID:", commentorId);

  //   // Check if the current user is the commentor
  //   if (currentUser && commentorId === currentUser.id) {
  //     setCommentIdToDelete(commentId);
  //     setDeleteDialogOpen(true);
  //   } else {
  //     // Display an error message or handle it as appropriate
  //     console.error("Unauthorized to delete this comment");
  //   }
  // };

  const handleConfirmDeleteComment = async () => {
    try {
      if (deleteCommentId === null) {
        console.error('Comment ID is null');
        return;
      }

      await axios.delete(`http://localhost:3000/api/v1/udelete/${deleteCommentId}`);
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
    setCommentIdToDelete(null);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const currentUser = getUser();
      const filteredComment = filter.clean(newComment);

      const response = await axios.post(
        `http://localhost:3000/api/v1/addComment`,
        {
          postId: id,
          content: filteredComment,
          commentor: currentUser.id,
          containsProfanity: newComment !== filteredComment,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

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
            `http://localhost:3000/api/v1/deleteComment/${response.data.comment._id}`
          );
        }, 5000);
      } else {
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
        `http://localhost:3000/api/v1/addReply/${replyCommentId}`,
        {
          content: newReply,
          rep: currentUser.id,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const newReplyData = response.data.reply || response.data;
      setComments((prevComments) => {
        return prevComments.map((prevComment) => {
          if (prevComment._id === replyCommentId) {
            return {
              ...prevComment,
              replies: [...prevComment.replies, newReplyData],
            };
          }
          return prevComment;
        });
      });

      // Clear the reply input and comment ID
      setNewReply('');
      setReplyCommentId(null);
    } catch (error) {
      console.error('Error adding reply:', error);
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
      } else if (error.request) {
        console.error('No response received from the server');
      }
    }
  };

  const handleLike = async () => {
    try {
      await handleLikePost(id);
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  const handleLikePost = async () => {
    try {
      let response;
      if (isLiked) {
        response = await axios.delete(`http://localhost:3000/api/v1/posts/${id}/like`);
      } else {
        response = await axios.post(`http://localhost:3000/api/v1/posts/${id}/like`);
      }
      const { liked } = response.data;
      setLikeCount((prevCount) => (liked ? prevCount + 1 : prevCount - 1));
      setIsLiked(liked);
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  //     setComments((prevComments) => {
  //       const updatedComments = prevComments.map((prevComment) => {
  //         if (prevComment._id === replyCommentId) {
  //           return {
  //             ...prevComment,
  //             replies: [...prevComment.replies, newReplyData],
  //           };
  //         }
  //         return prevComment;
  //       });
  //       return updatedComments;
  //     });

  //     setNewReply('');
  //     setReplyCommentId(null);
  //   } catch (error) {
  //     console.error('Error adding reply:', error);
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
            {post.user && post.user.avatar && (
              <img src={post.user.avatar} alt="User Avatar" className="user-avatar" />
            )}
          </div>

          {/* Updated Post details section */}
          <div className="post-details-section">
            <div className="post-container">
              <div>
                <span className="username" style={{ fontWeight: 'bold' }}>
                  <h3></h3>Posted by: {post.user && post.user.name}
                </span>
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

              {/* Heart icon */}
              <IconButton onClick={handleLikePost} style={{ color: 'white' }}>
                {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              {/* Heart count */}
              <span style={{ marginLeft: '5px', color: 'white' }}>{likeCount}</span>



              {post.user && post.user.id === user.id && (
                <div>
                  <Link to="/forum">
                    <Button color="inherit" component={Link} to="/forum">
                      <ArrowBackIcon />
                    </Button>
                  </Link>
                  <Link to={`/EditPost/${id}`}>
                    <IconButton style={{ color: 'white' }}>
                      <EditIcon />
                    </IconButton>
                  </Link>

                  <IconButton onClick={handleDelete} style={{ color: 'white' }}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              )}
            </div>
          </div>

          {/* Comments section */}
          <div className="comments-section">
            <h3>Comments</h3>

            {/* Comment form */}
            <form onSubmit={handleCommentSubmit} className="comment-form">
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

            {isLoading ? (
              <p>Loading comments...</p>
            ) : (
              <div>
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment._id} className="comment-container">
                      <div>
                        <span className="username" style={{ fontWeight: 'bold' }}>
                          {comment.commentor?.name}
                        </span>
                        <p className="comment-content">
                          {comment?.content ? comment.content : 'No content available'}

                          <IconButton onClick={() => handleReply(comment._id)} style={{ color: 'white' }}>
                            <ReplyIcon />
                          </IconButton>

                          <IconButton onClick={() => toggleRepliesVisibility(comment._id)} style={{ color: 'white' }}>
                            <DoubleArrowIcon />
                          </IconButton>
                        </p>

                        {replyCommentId === comment._id && (
                          <form onSubmit={handleReplySubmit} className="reply-form" style={{ color: 'dark' }}>
                            <label htmlFor="newReply">Add Reply {user.name}:</label>
                            <input
                              type="text"
                              id="newReply"
                              value={newReply}
                              onChange={(e) => setNewReply(e.target.value)}
                            />
                            <button type="submit">
                              <PublishIcon />
                            </button>

                          </form>
                        )}

                        {repliesVisible && comment.replies && comment.replies.length > 0 && (
                          <div className="replies-container">
                            <hr />
                            <p className="replies-heading">Replies:</p>
                            {comment.replies.map((reply) => (
                              <div key={reply._id} className="reply-container">
                                <span className="username" style={{ fontWeight: 'bold' }}>
                                  {reply.rep && reply.rep.name}
                                </span>
                                <p className="reply-content">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {comment.commentor.id === getUser().id && (
                        <IconButton onClick={() => handleDeleteComment(comment._id, comment.commentor.id)} style={{ color: 'white' }}>
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

const DisplayComment = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/api/v1/updateComment/${comment._id}`, { content: editedComment });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleCancel = () => {
    setEditedComment(comment.content);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedComment(e.target.value);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <TextField
            value={editedComment}
            onChange={handleChange}
            fullWidth
            multiline
            variant="outlined"
          />
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={handleCancel} variant="contained" color="secondary">
            Cancel
          </Button>
        </div>
      ) : (
        <div>

          {comment.content}
          <IconButton onClick={handleEdit} style={{ color: 'white' }}>
            <EditIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default PostDetail;