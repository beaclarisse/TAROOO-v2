import React from "react";
import { Link } from "react-router-dom";

const Disease = ({ disease }) => {
  console.log(disease)
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img className="card-img-top mx-auto" src={disease.images[0].url} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <a href="">{disease.name}</a>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(disease.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({disease.numOfReviews} reviews)</span>
          </div>
          <p className="card-text">${disease.type}</p>
          {/* <BrowserRouter> */}
          <Link
            to={`disease/${disease._id}`}
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
export default Disease;