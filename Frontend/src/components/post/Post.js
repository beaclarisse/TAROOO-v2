import React from "react";
import { Link } from "react-router-dom";

const Post = ({ taro }) => {
  console.log(taro);
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img className="card-img-top mx-auto" src={taro.images[0].url} alt="" />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <a href="#">{taro.title}</a>
          </h5>
          <p className="card-text">Reference: {taro.reference}</p>
          <Link to={`taro/${taro._id}`} id="view_btn" className="btn btn-block">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;