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
import Filter from 'bad-words';
import './ConsultDetails.css';

const ConsultDetail = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter] = useState(new Filter());
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

        setTimeout(async () => {
          await axios.delete(
            `http://localhost:3000/api/v1/deleteConsultComment/${response.data.comment._id}`
          );
        }, 5000);
      } else {
        setComments([...comments, response.data.comment]);
      }

      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
      console.log('Axios Error:', error.response);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="consult-chat-container" style={{ background: '#1b1b1b', display: 'flex' }}>
      <Header />
      {[1, 2, 3, 4, 5].map((_, index) => (
        <div key={index} className="space-before-post-container" />
      ))}
      <div className="consult-content-wrapper" style={{ display: 'flex', flexDirection: 'row' }}>
        <div className="post-messages-wrapper" style={{ flex: 1 }}>
          {/* Post details section */}
          <div className="consult-post-details-section">
            <div className="post-container">
              <div>
                <span className="username" style={{ fontWeight: 'bold' }}>User: {post.user && post.user.name}</span>
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
              {/* Comment form */}
              <form onSubmit={handleCommentSubmit} className="comment-form">
                <label htmlFor="newComment">Reply:</label>
                <textarea
                  id="newComment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit" disabled={isSubmitting} className="submit-comment-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>


        {/* Message section */}
        <div className="consult-messages-section" style={{ flex: 1 }}>
          <form onSubmit={handleCommentSubmit} className="consult-comment-form">
            {/* Add your comment/message components here */}
          </form>
          <h3>Messages</h3>
          {isLoading ? (
            <p>Loading message...</p>
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
                  </div>
                ))
              ) : (
                <p>No messages available.</p>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ConsultDetail;
