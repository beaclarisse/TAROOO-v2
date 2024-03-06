import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { registers, clearErrors } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from '../layout/Header'

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { FormGroup } from "react-bootstrap";

function Register() {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState("");

    // const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(
        "/images/default_avatar.jpg"
    );

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm(
        {
            mode: "onChange",
            defaultValues:
            {
                name: name,
                email: email,
                password: password
            }
        }
    );

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }

        if (error) {
            dispatch(clearErrors());
        }
    }, [dispatch, isAuthenticated, error, navigate]);

    const submitHandler = (data) => {
        // e.preventDefault();

        const formData = new FormData();
        formData.set("name", data.name);
        formData.set("email", data.email);
        formData.set("password", data.password);
        formData.set("avatar", avatar);

        dispatch(registers(formData));
    };

    const onChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            // setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    //Avatar Functions
    // const [avatar, setAvatar] = useState(null);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        setAvatarPreview(URL.createObjectURL(file));
        setAvatar(file);
    };

    //Paper CSS/Style
    const paperStyle = {
        padding: 100,
        height: '80vh',
        width: 500,
        margin: "100px auto",
        backgroundColor: "#e2daeb"
    }

    const errorStyle = {
        color: "red"
    }

    return (
        <MDBContainer fluid>
        <Header />
        <MetaData title={"Register User"} />

        <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
            <MDBCardBody>
            <MDBRow>
                <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                
                <form
                    onSubmit={handleSubmit(submitHandler)}
                    encType="multipart/form-data"
                >
                    <FormGroup>
                        <div className="d-flex flex-row align-items-center mb-4 ">
                            <MDBIcon fas icon="user me-3" size='lg'/>
                            <MDBInput label='Your Name' type='text' className='w-100' id='name_field' 
                                onChange={(e) => setName(e.target.value)} fullWidth
                                {...register("name", {
                                required: "Name is required."
                            })}/>
                        </div>
                        {errors.name && <Typography style={errorStyle} variant="body1">{errors.name.message}</Typography>}

                        <div className="d-flex flex-row align-items-center mb-4">
                            <MDBIcon fas icon="envelope me-3" size='lg'/>
                            <MDBInput label='Your Email' type='email' id='email_field'
                                onChange={(e) => setEmail(e.target.value)} fullWidth
                                {...register("email", {
                                    required: "Email is required."
                                })}/>
                        </div>
                        {errors.email && <Typography style={errorStyle} variant="body1">{errors.email.message}</Typography>}

                        <div className="d-flex flex-row align-items-center mb-4">
                            <MDBIcon fas icon="lock me-3" size='lg'/>
                            <MDBInput label='Password' id='password_field'
                                type='password'
                                onChange={(e) => setPassword(e.target.value)} fullWidth
                                {...register("password", {
                                    required: "Password is required."
                                })}/>
                        </div>
                        {errors.password && <Typography style={errorStyle} variant="body1">{errors.password.message}</Typography>}

                        <div className="d-flex flex-row align-items-center mb-4">
                            <MDBIcon fas icon="user me-3" size='lg'/>
                            <MDBInput label='Choose your Profile Image' type="file"
                                            name="avatar"
                                            className="custom-file-input"
                                            id="customFile"
                                            accept="images/*"
                                            onChange={onChange}/>
                        </div>

                        <div className='mb-4'>
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                        </div>

                        <MDBBtn className='mb-4' size='lg' id="register_button" type="submit">Register</MDBBtn>
                    </FormGroup>
                </form>
                </MDBCol>

                <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
                </MDBCol>

            </MDBRow>
            </MDBCardBody>
        </MDBCard>

        </MDBContainer>
    );
}

export default Register;