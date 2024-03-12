import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './VideoListPage.css';
import Header from '../layout/Header';
import { Link } from 'react-router-dom';

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
      <Header />
      <Paper style={{ background: '#232b2b', color: '#fff', padding: '10px' }}>
        {/* Category Dropdown */}
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Select Category' }}
          style={{ minWidth: '150px', marginRight: '10px' }}
        >
         <MenuItem value="" style={{ backgroundColor: 'black', color: 'white' }}>
            All Categories
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category} style={{ backgroundColor: 'black', color: 'white' }}>
              {category}
            </MenuItem>
          ))}
        </Select>

        {/* Video List */}
        <div className="videoList">
          {/* Loading State */}
          {loading && <CircularProgress style={{ margin: '20px auto', display: 'block' }} />}

          {/* Error State */}
          {error && <Typography variant="body1" color="error">{error}</Typography>}

          {/* Videos */}
          {videos.map((video) => (
            <div key={video._id} className="videoItem">
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
                  <Link to={`/tarotube/${video._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Paper style={{ padding: '10px', margin: '10px', textAlign: 'center' }}>
                      <Typography variant="h6">{video.title}</Typography>
                      <img
                        src={`https://img.youtube.com/vi/${video.link}/0.jpg`}
                        alt={video.title}
                        style={{ width: '100%', height: 'auto', marginBottom: '8px' }}
                      />
                      <Typography>{video.category}</Typography>
                    </Paper>
                  </Link>
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
