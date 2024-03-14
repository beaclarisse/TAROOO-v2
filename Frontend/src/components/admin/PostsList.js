import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import {
  allPosts,
  clearErrors,
  deletePost,
} from "../../actions/taroAction";
import { DELETE_POST_RESET } from "../../constants/taroConstants";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, Divider } from "@mui/material";
// import { Card, Col, Row } from "react-bootstrap";

const PostsList = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { loading, error, taros } = useSelector(
    (state) => state.allPosts || {}
  );
  
  const { isDeleted } = useSelector((state) => state.post);

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  // const { error: deleteError, isDeleted } = useSelector(
  //     (state) => state.post
  // );

  useEffect(() => {
    dispatch(allPosts());

    if (error) {
      notify(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      successMsg("Post deleted successfully");
      navigate("/admin/posts");
      dispatch({ type: DELETE_POST_RESET });
    }
  }, [dispatch, alert, error, isDeleted, navigate]);

  const deletePostHandler = (id) => {
    dispatch(deletePost(id));
  };

  const setPosts = () => {
    const data = {
      columns: [
        {
          label: "Post ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Title",
          field: "title",
          sort: "asc",
        },
        {
          label: "Subtitle",
          field: "subtitle",
          sort: "asc",
        },
        {
          label: "Category",
          field: "category",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    if (taros && taros.length > 0) {
      taros.forEach((post) => {
        data.rows.push({
          id: post._id,
          title: post.title,
          subtitle: post.subtitle,
          category: post.category,
          actions: (
            <Fragment>
              <Link
                to={`/update/post/${post._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deletePostHandler(post._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </Fragment>
          ),
        });
      });
    }

    return data;
  };

  // const deletePostHandler = (id) => {
  //     dispatch(deletePost(id));
  // };

  const fetchData = async (endpoint, setData) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/${endpoint}`);
      setData(data[endpoint]);
      // setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData("posts", setPosts);
  }, []);

  return (
    <Box
      sx={{ height: 730, width: "90%", paddingTop: 5 }}
      style={{ background: "white" }}
    >
      <Fragment>
        <MetaData title={"All Posts"} />

        <div className="row">
          <div className="col-12 col-md-2">
            <Sidebar />
          </div>
          <div className="col-18 col-md-10">
            <br />
            <br />
            <h1>Posts</h1>
            <hr
              style={{
                color: "#000000",
                backgroundColor: "#000000",
                height: 5,
              }}
            />
            <Button
              size="large"
              variant="contained"
              color="primary"
              sx={{ marginBottom: 2 }}
              href="/post/new"
            >
              {" "}
              New Post
            </Button>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setPosts()}
                className="px-3"
                bordered
                striped
                hover
                noBottomColumns
              />
            )}
          </div>
        </div>
      </Fragment>
    </Box>
  );
};

export default PostsList;
