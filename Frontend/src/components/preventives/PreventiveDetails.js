import React, { Fragment, useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Loader from "../layout/Loader";
import Header from "../layout/Header";
import MetaData from "../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import {
  getPreventiveDetails,
} from "../../actions/preventiveAction";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const PreventiveDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, preventive } = useSelector((state) => state.preventiveDetails);

  useEffect(() => {
    dispatch(getPreventiveDetails(id));
  }, [dispatch, id]);

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
        <div className="container">
          <MetaData title={preventive.name} />
  
          <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="preventive_image">
              <Carousel pause="hover">
                {preventive.images &&
                  preventive.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img
                        className="d-block w-100"
                        src={image.url}
                        alt={preventive.title}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
  
            <div className="col-12 col-lg-5 mt-1">
              <h3>{preventive.disease}</h3>
  
              <p id="preventive_id">Post # {preventive._id}</p>
  
              <hr />
  
              <p id="preventive_reference">Reference: {preventive.reference}</p>
  
              <hr />
  
              <h4 className="mt-2">Description:</h4>
  
              <p>{preventive.description}</p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default PreventiveDetails;