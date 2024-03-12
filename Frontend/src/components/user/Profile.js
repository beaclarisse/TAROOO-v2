import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import Header from '../layout/Header'
import Sidebar from "../admin/Sidebar";
import { Box } from "@mui/material";

const Profile = () => {
    const { user, loading } = useSelector((state) => state.auth);

    return (
        <Fragment>
            {user.role !== "admin" && (
                <Box style={{ background: '#1b1b1b', paddingTop: 2 }}>
                    <div className="container">
                        <div className="col-12 col-md-2">
                            <Header />
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-2"></div>
                            <div className="col-12 col-md-10">
                                <MetaData title={"Your Profile"} />
                                <h1 style={{ marginTop: '40px' }}>Profile</h1>
                                <hr
                                    style={{
                                        color: "#67568C",
                                        backgroundColor: "#67568C",
                                        height: 5,
                                        marginBottom: 30
                                    }}
                                />
                                <div className="row justify-content-around user-info">
                                    <div className="col-12 col-md-3">
                                        <figure className="avatar avatar-profile">
                                            <img
                                                className="rounded-circle img-fluid"
                                                src={user.avatar.url}
                                                alt={user.name}
                                            />
                                        </figure>
                                        <Link
                                            to="/profile/update"
                                            className="btn btn-primary btn-block my-5"
                                            style={{ background: '#67568C' }}
                                        >
                                            Edit Profile
                                        </Link>
                                    </div>

                                    <div className="col-12 col-md-5">
                                        <h4>Full Name</h4>
                                        <p>{user.name}</p>
                                        <h4>Email Address</h4>
                                        <p>{user.email}</p>
                                        <h4>Joined On</h4>
                                        <p>{String(user.createdAt).substring(0, 10)}</p>
                                        
                                        <Link
                                            to="/password/update"
                                            className="btn btn-primary btn-block mt-3"
                                            style={{ background: '#67568C' }}
                                        >
                                            Change Password
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            )}

            {user.role == "admin" && (
                <Box sx={{ height: 660, width: "100%", paddingTop: 5 }} style={{ background: 'white' }}>
                    <Fragment>
                        <div className="row">
                            <div className="col-12 col-md-2">
                                <Sidebar />
                            </div>
                            <div className="col-12 col-md-10">
                                <MetaData title={"Your Profile"} />
                                <br /><br />
                                <h1>Profile</h1>
                                <hr
                                    style={{
                                        color: "#67568C",
                                        backgroundColor: "#67568C",
                                        height: 5
                                    }}
                                />
                                <div className="row justify-content-around mt-5 user-info">
                                    <div className="col-12 col-md-3">
                                        <figure className="avatar avatar-profile">
                                            <img
                                                className="rounded-circle img-fluid"
                                                src={user.avatar.url}
                                                alt={user.name}
                                            />
                                        </figure>

                                        <Link
                                            to="/profile/update"
                                            id="edit_profile"
                                            className="btn btn-primary btn-block my-5"
                                        >
                                            Edit Profile
                                        </Link>
                                    </div>

                                    <div className="col-12 col-md-5">
                                        <h4>Full Name</h4>

                                        <p>{user.name}</p>

                                        <h4>Email Address</h4>

                                        <p>{user.email}</p>

                                        <h4>Joined On</h4>

                                        <p>{String(user.createdAt).substring(0, 10)}</p>

                                        {user.role !== "admin" && (
                                            <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                                                My Orders
                                            </Link>
                                        )}

                                        <Link
                                            to="/password/update"
                                            className="btn btn-primary btn-block mt-3"
                                        >
                                            Change Password
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                </Box>

            )}
        </Fragment>
    );
};

export default Profile;