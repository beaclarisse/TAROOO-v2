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

const TaroDiseases = () => {
  const [disease, setDisease] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedDisease, setSelectedDisease] = React.useState(null);

  const handleOpen = (dis) => {
    setSelectedDisease(dis);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

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

  const getDisease = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}api/v1/diseases`
      );
      setDisease(data.disease);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDisease();
  }, []);

  return (
    <Fragment>
      <Header />
      <br />
      <br />
      <br />
      <Grid>
        <MetaData title={"Learn about Taro Diseases"} />
        <h1 id="products_heading" style={{ textAlign: "center" }}>
          <span> Taro Diseases </span>
        </h1>
        <section id="services" className="container mt-5"></section>

        {disease
          .reduce((rows, dis, index) => {
            if (index % 4 === 0) rows.push([]);
            rows[rows.length - 1].push(dis);
            return rows;
          }, [])
          .map((row, rowIndex) => (
            <Grid
              container
              item
              key={rowIndex}
              spacing={2}
              justifyContent="center"
            >
              {row.map((dis) => (
                <Grid item key={dis.id} xs={12} sm={6} md={3}>
                  <Card sx={{ maxWidth: 345 }}>
                    {/* Card content goes here */}
                    <CardMedia
                      sx={{ height: 140 }}
                      image="../images/taro.jpg"
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {dis.name}
                      </Typography>
                      <Typography variant="body" color="text.secondary">
                        {dis.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleOpen(dis)}>
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
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h3"
                component="h2"
              >
                {selectedDisease && selectedDisease.name}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {selectedDisease && selectedDisease.description}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {selectedDisease && selectedDisease.part}
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </Grid>
    </Fragment>
  );
};

export default TaroDiseases;
