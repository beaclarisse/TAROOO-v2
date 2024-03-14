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

const TaroPosts = ({ match }) => {
  const [post, setPost] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleOpen = (pos) => {
    setSelectedPost(pos);
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
    bgcolor: "black",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const getPost = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}api/v1/post`
      );
      setPost(data.post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <Fragment>
      <Header />
      <br />
      <br />
      <br />
      <Grid container>
        <MetaData title={"Learn about Taro"} />
        <h1 id="products_heading" style={{ textAlign: "center" }}>
          <span> About Taro </span>
        </h1>
        <section id="services" className="container mt-5"></section>

        {post &&
          post.length > 0 &&
          post
            .reduce((rows, pos, index) => {
              if (index % 3 === 0) rows.push([]);
              rows[rows.length - 1].push(pos);
              return rows;
            }, [])
            .map((row, rowIndex) => (
              <Grid
                container
                item
                key={rowIndex}
                spacing={15}
                justifyContent="center"
              >
                {row.map((pos) => (
                  <Grid item key={pos.id} xs={12} sm={6} md={3}>
                    <Card sx={{ maxWidth: 345, height: "100%" }}>
                      {/* Card content goes here */}
                      <CardMedia
                        sx={{ height: 140 }}
                        image="../images/taro.jpg"
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {pos.title}
                        </Typography>
                        <Typography variant="body" color="text.secondary">
                          {truncateText(dis.description, 120)} {pos.description}
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
                ...style,
                bgcolor: "#232b2b",
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h3"
                component="h2"
              >
                {selectedPost && selectedPost.title}
              </Typography>
              <Typography
                id="transition-modal-title"
                variant="h4"
                component="h3"
              >
                {selectedPost && selectedPost.subtitle}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {selectedPost && selectedPost.description}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {selectedPost && selectedPost.category}
              </Typography>
            </Box>
          </Fade>
        </Modal>

      </Grid>
    </Fragment>
  );
};

export default TaroPosts;
