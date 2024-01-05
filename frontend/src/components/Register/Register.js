import { useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"

import React from 'react'
import ErrorMsg from "../ErrorMsg/ErrorMsg"
import Loading from "../Loading/Loading"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toggleActions } from '../Store/Store';
import { register } from '../Store/Actions/userActions';
const Register = ({ title, children }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [errormsgpwd, setErrormsg] = useState(null);
    const navigate = useNavigate();
    const userRegister = useSelector((state) => state.register.userRegister);
    const { loading, error, userInfo } = userRegister;

    const dispatch = useDispatch();
    const submitHandler = async (par) => {
        par.preventDefault()  //imp line for submit form
        // console.log(email,password);
        if (password !== confirmpassword) {
            setErrormsg("Passwords do not match");
        } else {
            dispatch(register(name, email, password));
        }
        // sending data to API
    }

    useEffect(() => {
        if (userInfo) {
            dispatch(toggleActions.login());
            navigate("/login");
        }
    }, [navigate, userInfo]);

    const LoginPage = () => {
        dispatch(toggleActions.login());
    }

    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 500px)").matches
    )

    useEffect(() => {
        window
            .matchMedia("(max-width: 500px)")
            .addEventListener('change', e => setMatches(e.matches));


    }, []);
    return (
        <>
            <section className='Register_pg'>
                <section id="cardt">Register  </section><br></br><br></br><br></br>
                {/* <MainScreen title="LOGIN PAGE" > */}
                <div>
                    {/* if error message present  */}
                    {errormsgpwd && <ErrorMsg variant="danger">{errormsgpwd}</ErrorMsg>}
                    {error && <ErrorMsg msg={error}></ErrorMsg>}
                    {loading && <Loading />}

                    <Form onSubmit={submitHandler} style={{ paddingLeft: "6px", paddingRight: "6px", paddingBottom: "10px" }}>

                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <div style={{ border: "solid #242442 2px", position: "relative", height: "7vh", borderRadius: "0px 0px 20px 20px", borderWidth: "0 0.1px 5px 0px", display: "flex" }}>
                                {!matches && <i class="fa-solid fa-user fa-2x" style={{ marginLeft: "2%" }}></i>}
                                {matches && <i class="fa-solid fa-user fa-2x" style={{ position: "absolute", width: "20%", marginLeft: "2%", padding: "2%" }}></i>}
                                {!matches && <Form.Control placeholder="Enter Name " onChange={(e) => setName(e.target.value)} style={{ fontSize: "20px", position: "absolute", width: "90%", height: "100%", marginLeft: "10%", borderRadius: "0px 0px 20px 0px" }}
                                />
                                }
                                {matches && <Form.Control placeholder="Enter Name " onChange={(e) => setName(e.target.value)} style={{ fontSize: "15px", position: "absolute", width: "85%", height: "100%", marginLeft: "15%", borderRadius: "0px 0px 20px 0px" }} />
                                }
                            </div>

                        </Form.Group>


                        <Form.Group className="mb-1" controlId="formBasicEmail">
                            <div style={{ border: "solid #242442 2px", position: "relative", height: "7vh", borderRadius: "0px 0px 20px 20px", borderWidth: "0 0.1px 5px 0px", display: "flex" }}>
                                {!matches && <i class="fa-solid fa-user fa-2x" style={{ marginLeft: "2%" }}></i>}
                                {matches && <i class="fa-solid fa-user fa-2x" style={{ position: "absolute", width: "20%", marginLeft: "2%", padding: "2%" }}></i>}
                                {!matches && <Form.Control placeholder="Enter Email Address " onChange={(e) => setEmail(e.target.value)} style={{ fontSize: "20px", position: "absolute", width: "90%", height: "100%", marginLeft: "10%", borderRadius: "0px 0px 20px 0px" }}
                                />
                                }
                                {matches && <Form.Control placeholder="Enter Email Address " onChange={(e) => setEmail(e.target.value)} style={{ fontSize: "15px", position: "absolute", width: "85%", height: "100%", marginLeft: "15%", borderRadius: "0px 0px 20px 0px" }} />
                                }
                            </div>

                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicPassword" style={{ paddingTop: "20px" }}>
                            <div style={{ border: "solid #242442 2px", position: "relative", height: "7vh", borderRadius: "0px 0px 20px 20px", borderWidth: "0 0.1px 5px 0px", display: "flex" }}>
                                {!matches && <i class="fa-solid fa-lock fa-2x" style={{ marginLeft: "2%" }}></i>}
                                {matches && <i class="fa-solid fa-lock fa-2x" style={{ position: "absolute", width: "20%", marginLeft: "2%", padding: "2%" }}></i>}

                                {matches && <Form.Control type="password" placeholder="Password" onChange={(p) => setPassword(p.target.value)} style={{ fontSize: "15px", position: "absolute", width: "85%", height: "100%", marginLeft: "15%", borderRadius: "0px 0px 20px 0px" }}
                                />}
                                {!matches && <Form.Control type="password" placeholder="Password" onChange={(p) => setPassword(p.target.value)} style={{ fontSize: "20px", position: "absolute", width: "90%", height: "100%", marginLeft: "10%", borderRadius: "0px 0px 20px 0px" }}
                                />}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicPassword" style={{ paddingTop: "20px" }}>
                            <div style={{ border: "solid #242442 2px", position: "relative", height: "7vh", borderRadius: "0px 0px 20px 20px", borderWidth: "0 0.1px 5px 0px", display: "flex" }}>
                                {!matches && <i class="fa-solid fa-lock fa-2x" style={{ marginLeft: "2%" }}></i>}
                                {matches && <i class="fa-solid fa-lock fa-2x" style={{ position: "absolute", width: "20%", marginLeft: "2%", padding: "2%" }}></i>}

                                {matches && <Form.Control type="password" placeholder="Password" onChange={(p) => setConfirmPassword(p.target.value)} style={{ fontSize: "15px", position: "absolute", width: "85%", height: "100%", marginLeft: "15%", borderRadius: "0px 0px 20px 0px" }}
                                />}
                                {!matches && <Form.Control type="password" placeholder="Password" onChange={(p) => setConfirmPassword(p.target.value)} style={{ fontSize: "20px", position: "absolute", width: "90%", height: "100%", marginLeft: "10%", borderRadius: "0px 0px 20px 0px" }}
                                />}
                            </div>
                        </Form.Group>
                        <br></br>
                         <Button variant="primary" type="submit" size="lg" style={{ marginLeft: "20%" }}>
                            Create Account
                        </Button>

                    </Form>
                    <Row className="py-3" style={{ padding: "40px" }} >
                        <Col>Already an Account ? <Link to="/login" onClick={LoginPage} style={{ color: "rgb(80, 80, 240)", textDecoration: "underline" }}>Login Here</Link></Col>
                    </Row>
                </div>
                {/* </MainScreen> */}

            </section>
        </>
    )
}

export default Register
