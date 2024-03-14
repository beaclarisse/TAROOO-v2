import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from 'axios';
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import {
  allTaros,
  clearErrors,
  deleteTaro,
} from "../../actions/taroAction";
import { DELETE_TARO_RESET } from "../../constants/taroConstants";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, Divider } from "@mui/material";
// import { Card, Col, Row } from "react-bootstrap";

const PostsList = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { loading, error, taros } = useSelector(
    (state) => state.taros || {}
  );
  
  const { isDeleted } = useSelector((state) => state.taro);

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  console.log(taros)
  useEffect(() => {
    dispatch(allTaros());

    if (error) {
      notify(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      successMsg("Post deleted successfully");
      navigate("/admin/taros");
      dispatch({ type: DELETE_TARO_RESET });
    }
  }, [dispatch, alert, error, isDeleted, navigate]);

  const deleteTaroHandler = (id) => {
    dispatch(deleteTaro(id));
  };

  const getTaro = () => {
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
          label: "Category",
          field: "category",
          sort: "asc",
        },
        {
          label: "Reference",
          field: "reference",
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
      taros.forEach((taro) => {
        data.rows.push({
          id: taro._id,
          title: taro.title,
          reference: taro.reference,
          category: taro.category,
          actions: (
            <Fragment>
              <Link
                to={`/update/taro/${taro._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deleteTaroHandler(taro._id)}
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
                color: "#95bfae",
                backgroundColor: "#95bfae",
                height: 5,
              }}
            />
            <Button
              size="large"
              variant="contained"
              color="primary"
              sx={{ marginBottom: 2 }}
              href="/taro/new"
            >
              {" "}
              New Post
            </Button>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={getTaro()}
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
