import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Carousel } from "react-bootstrap";
import { Box, Typography, Button, Divider } from '@mui/material';

import {
    getAdminDiseases,
    clearErrors,
    deleteDisease,
} from "../../actions/diseaseAction";

import { DELETE_DISEASE_RESET } from "../../constants/diseaseConstants";
import { color } from "@mui/system";

const DiseasesList = () => {
    const dispatch = useDispatch();

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

    let navigate = useNavigate();

    const { loading, error, diseases } = useSelector((state) => state.diseases);

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.disease
    );

    useEffect(() => {
        dispatch(getAdminDiseases());

        if (error) {
            notify(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            notify(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            notify("Disease deleted successfully");
            navigate("/disease");
            dispatch({ type: DELETE_DISEASE_RESET });
        }
    }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

    if (diseases) {
        diseases.forEach((disease) => {
            console.log(disease);
        });
    } else {
        console.log("Disease is undefined");
    }

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
                    label: "Part",
                    field: "part",
                    sort: "asc",
                },

                {
                    label: "Image",
                    field: "image",
                    sort: "asc",
                },

                {
                    label: "Actions",
                    field: "actions",
                },
            ],

            rows: [],
        };

        diseases.forEach((disease) => {
            data.rows.push({
                id: disease._id,

                name: disease.name,

                part: disease.part,

                image: (
                    <Fragment>
                        <Carousel pause="hover">
                            {disease.images &&
                                disease.images.map((image) => (
                                    <Carousel.Item key={image.public_id}>
                                        <img
                                            className="d-block w-100"
                                            src={image.url}
                                            alt={disease.name}
                                            width="10px"
                                            height={"100px"}
                                        />
                                    </Carousel.Item>
                                ))}
                        </Carousel>
                    </Fragment>
                ),

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
                            onClick={() => deleteServiceHandler(service._id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                ),
            });
        });

        return data;
    };

    const deleteDiseaseHandler = (id) => {
        dispatch(deleteDisease(id));
    };

    return (

        <Box sx={{ height: 730, width: "90%", paddingTop: 5 }} backgroundColor="#f4effc">
            <Fragment>
                <MetaData title={"All Diseases"} />

                <div className="row">
                    <div className="col-12 col-md-2">
                        <Sidebar />
                    </div>

                    <div className="col-12 col-md-10">
                        <br /><br />
                        <h1>Diseases</h1>
                        <hr
                            style={{
                                color: "#2f3c4c",
                                backgroundColor: "#2f3c4c",
                                height: 5
                            }}
                        />
                        <Button size="large" variant="contained" color="primary"
                            sx={{ marginBottom: 2 }} href="/service/new"> New Disease</Button>
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
        </Box >
    );
};

export default DiseasesList;