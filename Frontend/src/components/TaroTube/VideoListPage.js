import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LinkIcon from '@mui/icons-material/Link';
import './VideoListPage.css';

const VideoListPage = () => {
  const [videos, setVideos] = useState([]);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState([]);

  const handleToggleVideo = (videoId) => {
    setPlayingVideo(playingVideo === videoId ? null : videoId);
  };

  const handleToggleDescription = (videoId) => {
    setExpandedDescriptions((prev) =>
      prev.includes(videoId) ? prev.filter((id) => id !== videoId) : [...prev, videoId]
    );
  };

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

  return (
    <Paper className="root" style={{ background: 'white' }}>
      <div className="videoList">
        {/* Other videos */}
        {videos.map((video) => (
          <div key={video._id} className={`videoItem ${playingVideo === video._id ? 'playing' : ''}`}>
            <Typography variant="h6" className="videoTitle" onClick={() => handleToggleVideo(video._id)}>
              {video.title}
            </Typography>
            <div className="videoIframeContainer">
              {playingVideo === video._id && (
                <iframe
                  title={video.title}
                  src={`https://www.youtube.com/embed/${video.link}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            {playingVideo === video._id && (
              <div className="videoDetails">
                <div className="videoDescription">
                  <Typography>{video.description}</Typography>
                  <span
                    className="seeMoreButton"
                    onClick={() => handleToggleDescription(video._id)}
                  >
                    See More
                  </span>
                </div>
                <div className="commentSection">
                  <IconButton className="likesIcon">
                    <ThumbUpIcon />
                  </IconButton>
                  <IconButton className="linkButton">
                    <LinkIcon />
                  </IconButton>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default VideoListPage;
