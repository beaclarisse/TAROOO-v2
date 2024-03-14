import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Header from '../layout/Header'
import Grid from '@mui/material/Grid';
import './VideoBrowse.css';

const VideoBrowse = () => {
  const [videos, setVideos] = useState([]);
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoDescription, setNewVideoDescription] = useState('');
  const [newVideoLink, setNewVideoLink] = useState('');
  const [category, setCategory] = useState(''); // Added category state

  const categories = [
    'Cultivation',
    'Taro Diseases',
    'Preventive Measures',
    'Practices',
    'Benefits',
    'Risks',
  ]
  let navigate = useNavigate()

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('/api/v1/AllVids');
      setVideos(response.data.videos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleAddVideo = async () => {
    try {
      const videoId = extractYouTubeVideoId(newVideoLink);

      if (videoId) {
        await axios.post('/api/v1/AddVids', {
          title: newVideoTitle,
          description: newVideoDescription,
          category: category, // Use the category state
          link: videoId,
        });

        setNewVideoTitle('');
        setNewVideoDescription('');
        setNewVideoLink('');
        fetchVideos();
      } else {
        console.error('Invalid YouTube video URL');
      }
    } catch (error) {
      console.error('Error adding video:', error);
    }
  };

  const extractYouTubeVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = url.match(regex);

    return match ? match[1] : null;
  };

  const videosPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await axios.delete(`/api/v1/vid/${videoId}`);
      fetchVideos();
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };


  return (
    <Paper className="root" style={{ background: "white" }}>
      <Header />
      <Typography variant="h4">TaroTube</Typography>
      <form fontSize={20} className="form fw-bold my-2" sx={{ fontWeight: 'bold' }}>
        <TextField
          label="Title"
          fullWidth
          value={newVideoTitle}
          onChange={(e) => setNewVideoTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={newVideoDescription}
          onChange={(e) => setNewVideoDescription(e.target.value)}
        />
        <div className="form-group">
          <label htmlFor="category_field">Category</label>
          <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(category => (
              <option key={category} value={category} >{category}</option>
            ))}
          </select>
        </div>
        <TextField
          label="YouTube Video URL"
          fullWidth
          value={newVideoLink}
          onChange={(e) => setNewVideoLink(e.target.value)}
        />
        <br />
        <br />
        <Button variant="contained" color="primary" onClick={handleAddVideo}>
          Add Video
        </Button>
      </form>
      <div className="videosList">
        <List>
          {videos.slice((currentPage - 1) * videosPerPage, currentPage * videosPerPage)
            .map((video) => (
              <ListItem key={video._id} className="videoItem">
                <div className="videoIframeContainer">
                  <iframe
                    title={video.title}
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.link}`}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
                <Typography variant="h6">{video.title}</Typography>
                <Typography>{video.description}</Typography>
                <IconButton onClick={() => handleDeleteVideo(video._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
        </List>
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(videos.length / videosPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </div>
    </Paper>
  );
};

export default VideoBrowse;
