import { useEffect, useState } from 'react';
import Header from '../layout/Header';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [editedPost, setEditedPost] = useState({ title: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const response = await axios.get('/your-endpoint-for-logged-in-user');
        const loggedInUserId = response.data.id;

        const postResponse = await axios.get(`/api/v1/posts/${id}`);
        setPost(postResponse.data);

        if (!postResponse.data || postResponse.data.userId !== loggedInUserId) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    getLoggedInUser();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      await axios.put(`/api/v1/posts/${id}`, editedPost);

      console.log('Post updated successfully');
      navigate(`/post/${id}`);
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <Header />
      <div className="forum-container">
        <br />
        <h2 className="posts-header" align="center" backgroundColor="white">Edit Post</h2>
        {post && (
          <form onSubmit={handleFormSubmit}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={editedPost.title}
              onChange={handleInputChange}
              required
            />
            <br />
            <label>Content:</label>
            <textarea
              name="content"
              value={editedPost.content}
              onChange={handleInputChange}
              required
            ></textarea>
            <br />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Save Changes'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditPost;
