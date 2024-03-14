import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../layout/Header';
import Pagination from '@mui/material/Pagination';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";

const TaroTubePage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [allVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 10;

  const fetchVideo = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/v1/tarotube/${id}`);
      setVideo(response.data.video);
      const allVideosResponse = await axios.get('/api/v1/AllVids');
      setAllVideos(allVideosResponse.data.videos);
    } catch (error) {
      console.error('Error fetching video:', error);
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = allVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div className="root">
        <Header />
        <Paper style={{ background: '#232b2b', color: '#fff' }}>
          <CircularProgress style={{ margin: '20px auto', display: 'block' }} />
        </Paper>
      </div>
    );
  }

  if (error) {
    return (
      <div className="root">
        <Header />
        <Paper style={{ background: '#232b2b', color: '#fff' }}>
          <Typography variant="body1" color="error">{error}</Typography>
        </Paper>
      </div>
    );
  }

  return (
    <div className="root">
      <Header />
      <Paper style={{ background: '#232b2b', color: '#fff', adding: '20px', textAlign: 'center' }}>
        {video && (
          <>
          <div style={{ marginBottom: '30px' }}></div>
            <iframe
              title={video.title}
              width="900"
              height="600"
              src={`https://www.youtube.com/embed/${video.link}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Typography variant="h6">{video.title}</Typography>
              <Typography>{video.description}</Typography>
            </div>

            <Link to="/VideoListPage">
              <Button color="inherit" component={Link} to="/VideoListPage">
                <ArrowBackIcon />
              </Button>
            </Link>

            {/* Display all videos as related videos */}
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {currentVideos.map((relatedVideo) => (
                <div key={relatedVideo._id} style={{ margin: '10px', width: 'calc(20% - 20px)' }}>
                  <iframe
                    title={relatedVideo.title}
                    width="120"
                    height="90"
                    src={`https://www.youtube.com/embed/${relatedVideo.link}`}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                  <Typography variant="caption">{relatedVideo.title}</Typography>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={Math.ceil(allVideos.length / videosPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                style={{ background: '#232b2b' , color : '#fff'}}
              />
            </div>
          </>
        )}
      </Paper>
    </div>
  );
};

export default TaroTubePage;
