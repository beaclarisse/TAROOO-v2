import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import Header from '../../layout/Header';
import "../../../App.css";

const AdminForum = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePosts = await axios.get('http://localhost:3000/api/v1/admin/posts');
        setPosts(responsePosts.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleCardClick = (postId) => {
    navigate(`/post/${postId}`); 
  };

  return (
    <div className="admin-forum-container">
      <Header />
      <div className="admin-forum-content">
        <h2 className="admin-forum-title">Admin Forum List</h2>
        {/* <Link to="/AddPost" className="admin-forum-add-post-button">
          Add New Post
        </Link> */}
        <div className="admin-forum-posts">
          {posts
            .slice(pageNumber * postsPerPage, (pageNumber + 1) * postsPerPage)
            .map((post) => (
              <div key={post._id} className="admin-forum-post" onClick={() => handleCardClick(post._id)}>
                <h3 className="admin-forum-post-title">{post.title}</h3>
                <p className="admin-forum-post-content">{post.content}</p>
                <div className="admin-forum-post-icons">
                  <FavoriteIcon color="error" fontSize="small" />
                  <CommentIcon fontSize="small" />
                 
                </div>
              </div>
            ))}
        </div>
        <div className="admin-forum-pagination">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              className={`admin-forum-pagination-btn ${pageNumber === index ? 'active' : ''}`}
              onClick={() => changePage({ selected: index })}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminForum;
