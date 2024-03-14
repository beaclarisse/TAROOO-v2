import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import Header from '../../layout/Header';

const AdminForum = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePosts = await axios.get('http://localhost:3000/api/v1/posts');
        const sortedPosts = responsePosts.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/admin/deletePost/${postId}`);
   
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const DisplayPost = ({ post }) => {
    const [user, setUser] = useState(null);
    const [commentCount, setCommentCount] = useState(0);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          let userId;
          if (typeof post.user === 'object') {
            setUser(post.user);
            return;
          } else if (mongoose.Types.ObjectId.isValid(post.user)) {
            userId = post.user;
          } else {
            setUser({ name: 'Anonymous' });
            return;
          }
          const responseUser = await axios.get(`http://localhost:3000/api/v1/user/${userId}`);
          setUser(responseUser.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser({ name: 'Anonymous' });
        }
      };

      fetchUserData();
    }, [post.user]);

    useEffect(() => {
      const fetchCommentCount = async () => {
        try {
          const responseComments = await axios.get(`http://localhost:3000/api/v1/getComment/${post._id}`);
          setCommentCount(responseComments.data.comments.length);
        } catch (error) {
          console.error('Error fetching comment count:', error);
        }
      };

      fetchCommentCount();
    }, [post._id]);

    if (!user) {
      return null;
    }

    return (
        <div className="card mb-3 rounded" style={{ width: '100%', height: '7rem', background: '#232b2b', color: '#fff' }}>
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{post.title}</h5>
              <p className="card-text" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{post.content}</p>
              {Array.isArray(post.tags) && post.tags.length > 0 && (
                <div className="tags-container" style={{ fontStyle: 'italic', color: '#ccc' }}>
                  {post.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="icon-container d-flex align-items-center">
              <DeleteIcon color="white" fontSize="small" className="mr-2" onClick={() => handleDeletePost(post._id)} />
              <CommentIcon color="white" fontSize="small" />
              <span className="ml-1" style={{ color: '#ccc' }}>{commentCount}</span>
            </div>
          </div>
          {post.avatar && <img src={post.avatar} alt={`${user.name || user.handle}'s avatar`} className="mt-2" style={{ maxWidth: '30px', borderRadius: '50%' }} />}
        </div>
    );
  };

  const displayPosts = Array.isArray(posts) && posts.length > 0 ? (
    posts.map((post) => <DisplayPost key={post._id} post={post} />)
  ) : (
    <div>No posts available</div>
  );

  return (
    <div className="d-flex flex-column vh-100" style={{ backgroundColor: '#1b1b1b', color: '#fff' }}>
      <Header />
      <div className="flex-grow-1 p-4 rounded">
        <h2 align="center" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Admin Forum Lists</h2>
        <div className="d-flex flex-column">
          {displayPosts}
        </div>
      </div>
    </div>
  );
};

export default AdminForum;
