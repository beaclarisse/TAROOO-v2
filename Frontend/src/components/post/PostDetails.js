import React, { Fragment, useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Loader from "../layout/Loader";
import Header from "../layout/Header";
import MetaData from "../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
// import { NEW_REVIEW_RESET } from "../../constants/taroConstants";
import {
  getPostDetails
} from "../../actions/taroAction";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const PostDetails = () => {
  // const [quantity, setQuantity] = useState(1);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, disease } = useSelector((state) => state.diseaseDetails);

  useEffect(() => {
    dispatch(getPostDetails(id));
  }, [dispatch, id]);

  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState("");

  // const { error: reviewError, success } = useSelector(
  //   (state) => state.newReview
  // );

  const notify = (message = "") =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div class="container">
            <MetaData title={post.title} />

            <div className="row d-flex justify-content-around">
              <div className="col-12 col-lg-5 img-fluid" id="post_image">
                <Carousel pause="hover">
                  {post.images &&
                    post.images.map((image) => (
                      <Carousel.Item key={image.public_id}>
                        <img
                          className="d-block w-100"
                          src={image.url}
                          alt={post.title}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              </div>

              <div className="col-12 col-lg-5 mt-5">
                <h3>{post.title}</h3>
                <h2>{post.subtitle}</h2>

                <p id="post_id">Post # {post._id}</p>

                <hr />

                <p id="post_category">Category: {post.category}</p>
                 
                <hr />
  
                <h4 className="mt-2">Description:</h4>

                <p>{post.description}</p>

                </div>
              </div>
            </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default PostDetails;
