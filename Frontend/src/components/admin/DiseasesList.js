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
    allDiseases,
    clearErrors,
    deleteDisease,
  } from "../../actions/diseaseAction";
import { DELETE_DISEASE_RESET } from "../../constants/diseaseConstants";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, Divider } from "@mui/material";

const DiseasesList = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { loading, error, diseases } = useSelector(
    (state) => state.allDiseases || {}
  );

  const { isDeleted } = useSelector((state) => state.disease);

  const errMsg = (message = "") =>
  toast.error(message, {
    position: toast.POSITION.BOTTOM_CENTER,
  });

    const successMsg = (message = "") =>
  toast.success(message, {
    position: toast.POSITION.BOTTOM_CENTER,
  });


  useEffect(() => {
    dispatch(allDiseases());

    if (error) {
      notify(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
        successMsg("Disease deleted successfully");
        navigate("/admin/diseases");
        dispatch({ type: DELETE_POST_RESET });
      }
    }, [dispatch, alert, error, isDeleted, navigate]);
  
    const deleteDiseaseHandler = (id) => {
        dispatch(deleteDisease(id));
      };

  const getDiseases = () => {
    const data = {
      columns: [
        {
          label: "Disease ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Reference",
          field: "part",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    if (diseases && diseases.length > 0) {
      diseases.forEach((disease) => {
        data.rows.push({
          id: disease._id,
          name: disease.name,
          part: disease.part,
          actions: (
            <Fragment>
              <Link
                to={`/update/disease/${disease._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deleteDiseaseHandler(disease._id)}
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

//   const deleteDiseaseHandler = (id) => {
//     dispatch(deleteDisease(id));
//   };

  return (
    <Box
      sx={{ height: 730, width: "90%", paddingTop: 5 }}
      style={{ background: "white" }}    
    >
      <Fragment>
        <MetaData title={"All Diseases"} />

        <div className="row">
          <div className="col-12 col-md-2">
            <Sidebar />
          </div>

          <div className="col-12 col-md-10">
            <br />
            <br />
            <h1>Diseases</h1>
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
              href="/disease/new"
            >
              {" "}
              New Disease
            </Button>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={getDiseases()}
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

export default DiseasesList;
