import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import MetaData from "./layout/MetaData";
import { Grid } from "@mui/material";
import Header from "./layout/Header";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import * as React from "react";
// import "../App.css";

const TaroPreventives = () => {
  const [post, setPost] = useState({});
  const [preventive, setPreventive] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedPreventive, setSelectedPreventive] = React.useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleOpen = (prev) => {
    setSelectedPreventive(prev);
    setOpen(true);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleClose = () => setOpen(false);

  const truncateText = (text, limit) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const getPreventive = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}api/v1/preventive`
      );
      setPost(data.preventive);
      setPreventive(data.preventive);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPreventive();
  }, []);
  console.log(post)
  return (
    <Fragment>
      <Header />
      <br />
      <br />
      <br />
      <Grid>
        <MetaData title={"Learn about Preventive Measures"} />
        <h1 id="products_heading" style={{ textAlign: "center", color: "black" }}>
          <span> Preventive Measures </span>
        </h1>

        <section id="services" className="container mt-5"></section>

        {preventive
          .reduce((rows, prev, index) => {
            if (index % 3 === 0) rows.push([]);
            rows[rows.length - 1].push(prev);
            return rows;
          }, [])
          .map((row, rowIndex) => (
            <Grid
              container
              item
              key={rowIndex}
              spacing={15}
              justifyContent="center"
              marginBlockEnd={8}
            >
              {row.map((prev) => (
                <Grid item key={prev.id} xs={12} sm={6} md={3}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia>
                      <div>
                        <div>
                          <img
                            key={prev?.images[0]?.public_id}
                            src={prev?.images[0]?.url}
                            alt="Post"
                            className="post-image"
                            style={{ width: '100%', height: 'auto' }} // Set width to 100%
                          />
                        </div>
                      </div>
                    </CardMedia>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {prev.disease}
                      </Typography>
                      <Typography variant="body" color="text.secondary">
                        {truncateText(prev.description, 120)}{" "}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleOpen(prev)}>
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>

              ))}
            </Grid>
          ))}

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            <Box sx={{

              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 700,
              maxHeight: "80vh", // Limit height to 80% of viewport height
              bgcolor: darkMode ? "#232b2b" : "white",
              color: darkMode ? "white" : "black",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              overflow: "auto", // Add overflow property
            }}>
              {/* Your text content */}

              <Typography id="transition-modal-title" variant="h4">
                {selectedPreventive && selectedPreventive.disease}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {selectedPreventive && selectedPreventive.description}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Reference: {selectedPreventive && selectedPreventive.reference}
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </Grid>
    </Fragment >
  );
};

export default TaroPreventives;
