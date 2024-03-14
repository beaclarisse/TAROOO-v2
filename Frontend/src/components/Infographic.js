import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SaveIcon from '@mui/icons-material/Save';
import CommentIcon from '@mui/icons-material/Comment';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ReactPaginate from 'react-paginate';
import Header from './layout/Header';
import Loader from './layout/Loader';
import "../App.css";

const Infographic = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePosts = await axios.get('http://localhost:3000/api/v1/Infographic');
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

  const handleCardClick = (infoId) => {
    navigate(`/Infographic/${infoId}`);
  };


  const DisplayPost = ({ info }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          // Check if info is defined and has a 'user' property
          if (!info?.user) {
            setUser({ name: "Anonymous" });
            return;
          }

          // Assuming the user ID is stored in info.user, fetch user data
          const userId = info.user;
          const responseUser = await axios.get(`http://localhost:3000/api/v1/user/${userId}`);
          setUser(responseUser.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser({ name: "Anonymous" });
        }
      };

      fetchUserData();
    }, [info]);

    if (!user) {
      return null;
    }
    return (
      <div className="custom-col-md-6 my-3" key={info._id} onClick={() => handleCardClick(info._id)} style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
        <div className="card mb-3 rounded" style={{ width: '18rem', background: '#232b2b', color: '#fff' }}>
          {/* Render each image from the images array */}
          {info.images.map((image, index) => (
            <img key={index} src={image.url} alt={`Image ${index + 1}`} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
          ))}
          <div className="card-body">
            <h5 className="card-title" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{info.title}</h5>
          </div>
        </div>
      </div>
    );
  };
  
  const displayPosts = [...posts]
    .reverse()
    .slice(pageNumber * postsPerPage, (pageNumber + 1) * postsPerPage)
    .map((post) => (<DisplayPost key={post._id} info={post} />));




  return (
    <div className="d-flex flex-column vh-100" style={{ backgroundColor: '#1b1b1b', color: '#fff' }}>
      <Header />

      <div className="flex-grow-1 p-4 rounded">
        <h2 align="center" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Brochures
        </h2>
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

export default Infographic;
