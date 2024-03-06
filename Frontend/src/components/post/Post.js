import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  console.log(post)
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img className="card-img-top mx-auto" src={post.images[0].url} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <a href="">{post.title}</a>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(post.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({post.numOfReviews} reviews)</span>
          </div>
          <p className="card-text">${post.subtitle}</p>
          {/* <BrowserRouter> */}
          <Link
            to={`post/${post._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
          {/* </BrowserRouter> */}
        </div>
      </div>
    </div>
  );
};
export default Post;