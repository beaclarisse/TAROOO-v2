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
  allDiseases,
  clearErrors,
  deleteDisease,
} from "../../actions/diseaseAction";
import { DELETE_DISEASE_RESET } from "../../constants/diseaseConstants";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, Divider } from "@mui/material";
import { Card, Col, Row } from "react-bootstrap";


const DiseasesList = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { loading, error, diseases } = useSelector(
    (state) => state.diseases || {}
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

  console.log(diseases)
  useEffect(() => {
    dispatch(allDiseases());

    if (error) {
      notify(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
        successMsg("Disease deleted successfully");
        navigate("/admin/diseases");
        dispatch({ type: DELETE_DISEASE_RESET });
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

    
      diseases?.forEach((disease) => {
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
                className="btn btn-danger py-1 px-2 ml-1"
                onClick={() => deleteDiseaseHandler(disease._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </Fragment>
          ),
        });
      });
    

    return data;
  };

  
  const fetchData = async (endpoint, setData) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/${endpoint}`);
      setData(data[endpoint]);
      
    } catch (error) {
      console.error(error);
    }
  }
    useEffect(() => {
      fetchData("diseases", getDiseases);
      // fetchAnswer("answers", setAllAnswers )
    }, []);
    console.log(fetchData)

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
            {[{ label: "diseases", data: diseases, link: "/admin/diseases" }].map(
              (item, index) => (
                <Col key={index} xl={3} sm={6} mb={3}>
                  <Card
                    className={`bg-${
                      index % 4 === 0
                        ? "success"
                        : index % 4 === 1
                        ? "danger"
                        : index % 4 === 2
                        ? "info"
                        : "warning"
                    } text-white o-hidden h-100`}
                  >
                    <Card.Body>
                      <div className="text-center card-font-size">
                        {item.label}
                        <br /> <b>{item.data && item.data.length}</b>
                      </div>
                    </Card.Body>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to={item.link}
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </Card>
                </Col>
              )
            )}
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
