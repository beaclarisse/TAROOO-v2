import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ReactPaginate from 'react-paginate';
import Header from '../layout/Header';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const UserPostList = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [user, setUser] = useState(null);
  const postsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const config = { withCredentials: true };
        const response = await axios.get("http://localhost:3000/api/v1/user", config);
        setUser(response.data.user);
        fetchData(response.data.user._id);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const fetchData = async (userId) => {
    try {
      const responsePosts = await axios.get(`http://localhost:3000/api/v1/user/forumList/${userId}`);
      setPosts(responsePosts.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const DisplayPost = ({ post }) => {
    return (
      <div className="custom-col-md-6 my-3" key={post._id} onClick={() => handlePostClick(post._id)} style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
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
              <FavoriteIcon color="error" fontSize="small" className="mr-2" />
              <CommentIcon color="white" fontSize="small" />
            </div>
          </div>
          {post.avatar && <img src={post.avatar} alt={`${post.user.name || 'Anonymous'}'s avatar`} className="mt-2" style={{ maxWidth: '30px', borderRadius: '50%' }} />}
        </div>
      </div>
    );
  };

  const displayPosts = [...posts]
    .reverse()
    .slice(pageNumber * postsPerPage, (pageNumber + 1) * postsPerPage)
    .map((post) => <DisplayPost key={post._id} post={post} />);

  return (
    <div className="d-flex flex-column vh-100" style={{ backgroundColor: '#1b1b1b', color: '#fff' }}>
      <Header />
      <div className="flex-grow-1 p-4 rounded">
        <h2 align="center" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Your Posts
        </h2>
        <Link to="/create-post" className="btn btn-primary mt-3" style={{ background: '#232b2b' }}>
          Create New Post
        </Link>
        <div className="d-flex flex-column">
          {displayPosts}
          <div className="pagination-box mt-3">
            <ReactPaginate
              previousLabel={<NavigateBeforeIcon />}
              nextLabel={<NavigateNextIcon />}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={'pagination'}
              previousLinkClassName={'pagination-link'}
              nextLinkClassName={'pagination-link'}
              disabledClassName={'pagination-disabled'}
              activeClassName={'pagination-active'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPostList;
