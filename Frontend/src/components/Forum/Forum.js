import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SaveIcon from '@mui/icons-material/Save';
import CommentIcon from '@mui/icons-material/Comment';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ReactPaginate from 'react-paginate';
import Header from '../layout/Header';
import Loader from '../layout/Loader';
import "../../App.css";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePosts = await axios.get('http://localhost:3000/api/v1/posts');
        setPosts(responsePosts.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handlePageLoad = () => {
      setLoading(false); 
    };

    window.addEventListener('load', handlePageLoad);

    return () => {
      window.removeEventListener('load', handlePageLoad);
    };
  }, []);
  const pageCount = Math.ceil(posts.length / postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleCardClick = (postId) => {
    navigate(`/post/${postId}`);
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
            setUser({ name: "Anonymous" });
            return;
          }
          const responseUser = await axios.get(`http://localhost:3000/api/v1/user/${userId}`);
          setUser(responseUser.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser({ name: "Anonymous" });
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
      <div className="custom-col-md-6 my-3" key={post._id} onClick={() => handleCardClick(post._id)} style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
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
              <span className="ml-1" style={{ color: '#ccc' }}>{commentCount}</span> {/* Display comment count */}
            </div>
          </div>
          {post.avatar && <img src={post.avatar} alt={`${user.name || user.handle}'s avatar`} className="mt-2" style={{ maxWidth: '30px', borderRadius: '50%' }} />}
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
          Post Forum
        </h2>
        <Link to="/AddPost" className="btn btn-primary mt-3" style={{ background: '#232b2b' }}>
          Share Something
        </Link>
        <div className="d-flex flex-column">
          {displayPosts}
          <div className="pagination-box mt-3">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                className={`pagination-number-btn btn btn-sm ${pageNumber === index ? 'active' : ''}`}
                onClick={() => changePage({ selected: index })}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
