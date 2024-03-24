import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./VideoListPage.css";
import Header from "../layout/Header";
import { Link } from "react-router-dom";

const VideoListPage = () => {
  const [videos, setVideos] = useState([]);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([
    "Cultivation",
    "Taro Diseases",
    "Preventive Measures",
    "Practices",
    "Benefits",
    "Risks",
  ]);

  const fetchCategoriesAndVideos = async () => {
    setLoading(true);
    setError(null);

    try {
      const categoriesResponse = await axios.get("/api/v1/videos/category");
      const receivedCategories = categoriesResponse.data.categories;

      if (Array.isArray(receivedCategories)) {
        setCategories(receivedCategories);
      } else {
        console.error("Invalid categories data:", receivedCategories);
      }

      const videosResponse = await axios.get(
        `/api/v1/videos/${selectedCategory || "all"}`
      );
      setVideos(videosResponse.data.videos);
    } catch (error) {
      console.error("Error fetching categories and videos:", error);
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVideo = (videoId) => {
    setPlayingVideo((prevPlayingVideo) =>
      prevPlayingVideo === videoId ? null : videoId
    );
  };

  useEffect(() => {
    fetchCategoriesAndVideos();
  }, [selectedCategory]);

  return (
    <div className="root">
      <Header />
      <Fragment
        style={{ background: "#232b2b", color: "#fff", padding: "10px" }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          style={{ marginBottom: "20px", textAlign: "center" }}
        >
          Taro Tube
        </Typography>
        {/* Category Dropdown */}
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Select Category" }}
          style={{
            minWidth: "150px",
            marginRight: "10px",
            backgroundColor: "white",
          }}
        >
          <MenuItem
            value=""
            style={{ backgroundColor: "white", color: "black" }}
          >
            All Categories
          </MenuItem>
          {categories.map((category) => (
            <MenuItem
              key={category}
              value={category}
              style={{ backgroundColor: "white", color: "black" }}
            >
              {category}
            </MenuItem>
          ))}
        </Select>

        {/* Video List */}
        <div className="videoList">
          {/* Loading State */}
          {loading && (
            <CircularProgress
              style={{ margin: "20px ", display: "block" }}
            />
          )}

          {/* Error State */}
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}

          {/* Videos */}
          {videos.map((video) => (
            <div key={video._id} className="videoItem">
              {playingVideo === video._id ? (
                <>
                  <iframe
                    title={video.title}
                    src={`https://www.youtube.com/embed/${video.link}`}
                    frameBorder="0"
                    allowFullScreen
                    style={{
                      width: "100%", // Set width to 100% to fit within the Paper container
                      
                      height: "300px",
                      margin: "10px",
                    }}
                  ></iframe>
                  <Typography>{video.description}</Typography>
                </>
              ) : (
                <>
                  <Link
                    to={`/tarotube/${video._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Paper
                      style={{
                        width: "400px",
                        height: "450px", // Increase height to accommodate the video
                        padding: "10px",
                        margin: "10px",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h6">{video.title}</Typography>

                      <img
                        src={`https://img.youtube.com/vi/${video.link}/0.jpg`}
                        alt={video.title}
                        style={{
                          width: "100%", // Set width to 100% to fit within the Paper container
                          height: "300px", // Adjust height to fit within the Paper container
                          marginBottom: "11px",
                          padding: "10px",
                        }}
                      />
                      <Typography>{video.category}</Typography>
                    </Paper>
                  </Link>
                  <Typography>{video.category}</Typography>
                  <IconButton onClick={() => handleToggleVideo(video._id)}>
                    <PlayArrowIcon style={{ color: "white" }} />
                  </IconButton>
                </>
              )}
            </div>
          ))}
        </div>
      </Fragment>
    </div>
  );
};

export default VideoListPage;
