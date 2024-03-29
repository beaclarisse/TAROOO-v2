import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { newTaro, clearErrors } from "../../actions/taroAction";
import { NEW_TARO_RESET } from "../../constants/taroConstants";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  FormGroup,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: title,
      reference: reference,
      description: description,
      category: category,
    },
  });

  const categories = ["About", "Benefit"];

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const {
    loading = false,
    error,
    success,
  } = useSelector((state) => state.newTaro || {});

  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      toast("Error", "Error");
      dispatch(clearErrors());
    }

    if (success) {
      toast("New Post!", "Success");
      navigate("/admin/taros");

      message("Post created successfully");

      dispatch({ type: NEW_TARO_RESET });
    }
  }, [dispatch, error, success, navigate]);

  console.log(success);
  const submitHandler = (data) => {
    const formData = new FormData();

    formData.set("title", data.title);
    formData.set("reference", data.reference);
    formData.set("description", data.description);
    formData.set("category", data.category);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(newTaro(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);

          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setImagesPreview(URL.createObjectURL(file));
    imagesPreview(file);
  };

  //Paper CSS/Style
  const paperStyle = {
    padding: 40,
    height: "100vh",
    width: 1000,
    margin: "100px auto",
    backgroundColor: "#f5f5f5",
  };

  const errorStyle = {
    color: "red",
  };

  const gridStyle = {
    paddingRight: 60,
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <MetaData title={"New Post"} />
          <Grid style={gridStyle}>
            <Paper elevation={10} style={paperStyle}>
              <Typography variant="h3" align="center" padding="10px">
                New Post
              </Typography>
              <form
                onSubmit={handleSubmit(submitHandler)}
                encType="multipart/form-data"
              >
                <FormGroup>
                  <Stack spacing={1} alignItems="center">
                    {/* <TextField
                      label="Category"
                      fullWidth
                      disabled
                      variant="standard"
                    ></TextField> */}
                    <Select
                      labelId="category"
                      label="Category"
                      id="category_field"
                      onChange={(e) => setCategory(e.target.value)}
                      fullWidth
                      {...register("category", {
                        required: "Category is required.",
                      })}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.types && (
                      <Typography style={errorStyle} variant="body1">
                        {errors.types.message}
                      </Typography>
                    )}

                    <TextField
                      label="Title"
                      variant="standard"
                      id="title_field"
                      type="title"
                      onChange={(e) => setTitle(e.target.value)}
                      fullWidth
                      {...register("title", {
                        required: "Title is required.",
                      })}
                    />
                    {errors.name && (
                      <Typography style={errorStyle} variant="body1">
                        {errors.name.message}
                      </Typography>
                    )}

                    <TextField
                      id="description_field"
                      label="Description"
                      multiline
                      rows={4}
                      fullWidth
                      onChange={(e) => setDescription(e.target.value)}
                      {...register("description", {
                        required: "Description is required.",
                      })}
                    />
                    {errors.description && (
                      <Typography style={errorStyle} variant="body1">
                        {errors.description.message}
                      </Typography>
                    )}

                    <TextField
                      label="Reference"
                      variant="standard"
                      id="subtitle_field"
                      type="string"
                      onChange={(e) => setReference(e.target.value)}
                      fullWidth
                      {...register("reference", {
                        required: "Reference is required.",
                      })}
                    />
                    {errors.reference && (
                      <Typography style={errorStyle} variant="body1">
                        {errors.reference.message}
                      </Typography>
                    )}

                    <div className="custom-file">
                      <input
                        type="file"
                        name="avatar"
                        className="custom-file-input"
                        id="customFile"
                        accept="images/*"
                        onChange={onChange}
                        multiple
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Upload Image
                      </label>
                    </div>
                    <Button
                      id="register_button"
                      type="submit"
                      size="large"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Create Post
                    </Button>
                  </Stack>
                </FormGroup>
              </form>
            </Paper>
          </Grid>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPost;
