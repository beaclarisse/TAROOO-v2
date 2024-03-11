import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CircularProgress from '@mui/material/CircularProgress';
import './VideoListPage.css';
import Header from '../layout/Header';
// import Sidebar from "/src/components/layout/Sidebar";

const VideoListPage = () => {
  const [videos, setVideos] = useState([]);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([
    'Cultivation',
    'Taro Diseases',
    'Preventive Measures',
    'Practices',
    'Benefits',
    'Risks',
  ]);

  const fetchCategoriesAndVideos = async () => {
    setLoading(true);
    setError(null);

    try {
      const categoriesResponse = await axios.get('/api/v1/videos/category');
      const receivedCategories = categoriesResponse.data.categories;

      if (Array.isArray(receivedCategories)) {
        setCategories(receivedCategories);
      } else {
        console.error('Invalid categories data:', receivedCategories);
      }

      const videosResponse = await axios.get(`/api/v1/videos/${selectedCategory || 'all'}`);
      setVideos(videosResponse.data.videos);
    } catch (error) {
      console.error('Error fetching categories and videos:', error);
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVideo = (videoId) => {
    setPlayingVideo((prevPlayingVideo) => (prevPlayingVideo === videoId ? null : videoId));
  };

  useEffect(() => {
    fetchCategoriesAndVideos();
  }, [selectedCategory]);

  return (
    <div className="root"> 
      {/* <Sidebar /> */}
      <Header />
      <Paper style={{ background: 'white' }}>
        {/* Category Dropdown */}
        <div className={`categoryDropdown ${selectedCategory ? '' : ''}`}>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={`videoList ${selectedCategory ? 'small' : ''}`}>
          {/* Loading State */}
          {loading && <CircularProgress style={{ margin: '20px auto', display: 'block' }} />}

          {/* Error State */}
          {error && <Typography variant="body1" color="error">{error}</Typography>}

          {/* Video List */}
          {videos.map((video) => (
            <div key={video._id} className="videoItem">
              {/* Video content... */}
              {playingVideo === video._id ? (
                <>
                  <iframe
                    title={video.title}
                    width="800"
                    height="450"
                    src={`https://www.youtube.com/embed/${video.link}`}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                  <Typography>{video.description}</Typography>
                </>
              ) : (
                <>
                  <Typography variant="h6">{video.title}</Typography>
                  <Typography>{video.category}</Typography>
                  <IconButton onClick={() => handleToggleVideo(video._id)}>
                    <PlayArrowIcon />
                  </IconButton>
                </>
              )}
            </div>
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default VideoListPage;
