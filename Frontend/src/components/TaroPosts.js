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
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import * as React from "react";

const TaroPosts = () => {
  const [post, setPost] = useState({});
  const [taro, setTaro] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedTaro, setSelectedTaro] = React.useState(null);

  const handleOpen = (pos) => {
    setSelectedTaro(pos);
    setOpen(true);
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

  const getTaro = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}api/v1/taro`
      );
      console.log(data)
      setPost(data.taro)
      setTaro(data.taros);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaro();

  }, []);

  return (
    <Fragment>
      <Header />
      <br />
      <br />
      <br />
      <Grid>
        <MetaData title={"Learn about Taro"} />
        <h1 id="products_heading" style={{ textAlign: "center", color: "black" }}>
          <span> About Taro </span>
        </h1>
        <section id="services" className="container mt-5"></section>

        {taro.reduce((rows, pos, index) => {
          if (index % 3 === 0) rows.push([]);
          rows[rows.length - 1].push(pos);
          return rows;
        }, [])
          .map((row, rowIndex) => (
            <Grid container
              item
              key={rowIndex}
              spacing={15}
              justifyContent="center"
              marginBlockEnd={8}>
              {row.map((pos) => (
                <Grid item key={pos.id} xs={12} sm={6} md={3}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia>
                      <div>
                        <div>
                          <img
                            key={pos?.images[0]?.public_id}
                            src={pos?.images[0]?.url}
                            alt="Post"
                            className="post-image"
                            style={{ width: '100%', height: 'auto' }}
                          />
                        </div>
                      </div>
                    </CardMedia>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {pos.title}
                      </Typography>
                      <Typography variant="body" color="text.secondary">
                        {truncateText(pos.description, 120)} {/* Corrected reference */}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleOpen(pos)}>
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
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 700,
                maxHeight: "80vh", // Limit height to 80% of viewport height
                bgcolor: "white", // Set background color to white
                color: "black", // Set text color to black
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                overflow: "auto",
              }}
            >
              {/* Modal content */}
            

            <Typography id="transition-modal-title" variant="h3" component="h2">
              {selectedTaro && selectedTaro.title}
            </Typography>
            {/* <Typography id="transition-modal-title" variant="h4" component="h3">
                {selectedTaro && selectedTaro.category}
              </Typography> */}
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {selectedTaro && selectedTaro.description}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {selectedTaro && selectedTaro.category}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {selectedTaro && selectedTaro.reference}
            </Typography>
          </Box>
        </Fade>
      </Modal>

    </Grid>
    </Fragment >
  );
};

export default TaroPosts;
