import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import {
  allPreventives,
  clearErrors,
  deletePreventive,
} from "../../actions/preventiveAction";
import { DELETE_PREVENTIVE_RESET } from "../../constants/preventiveConstants";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, Divider } from "@mui/material";

const PreventivesList = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { loading, error, preventives } = useSelector(
    (state) => state.preventives || {}
  );
  
  const { isDeleted } = useSelector((state) => state.preventive);

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  console.log(preventives)
  useEffect(() => {
    dispatch(allPreventives());

    if (error) {
      notify(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      successMsg("Preventive post deleted successfully");
      navigate("/admin/preventives");
      dispatch({ type: DELETE_PREVENTIVE_RESET });
    }
  }, [dispatch, alert, error, isDeleted, navigate]);

  const deletepPreventiveHandler = (id) => {
    dispatch(deletePreventive(id));
  };

  const getPreventives = () => {
    const data = {
      columns: [
        {
          label: "Preventive ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Disease",
          field: "disease",
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

    if (preventives && preventives.length > 0) {
      preventives.forEach((preventive) => {
        data.rows.push({
          id: preventive._id,
          disease: preventive.disease,
          reference: preventive.reference,
          actions: (
            <Fragment>
              <Link
                to={`/update/preventive/${preventive._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deletepPreventiveHandler(preventive._id)}
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
        <MetaData title={"All Preventive Measures"} />

        <div className="row">
          <div className="col-12 col-md-2">
            <Sidebar />
          </div>

          <div className="col-18 col-md-10">
            <br />
            <br />
            <h1>Preventive Measures</h1>
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
              href="/preventive/new"
            >
              {" "}
              New Preventives
            </Button>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={getPreventives()}
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

export default PreventivesList;
