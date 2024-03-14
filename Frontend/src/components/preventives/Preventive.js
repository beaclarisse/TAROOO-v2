import React from "react";
import { Link } from "react-router-dom";

const Preventive = ({ preventive }) => {
  console.log(preventive)
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img className="card-img-top mx-auto" src={preventive.images[0].url} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <a href="">{preventive.disease}</a>
          </h5>
          <p className="card-text">Reference: {preventive.reference}</p>
          {/* <BrowserRouter> */}
          <Link
            to={`preventive/${preventive._id}`}
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
export default Preventive;