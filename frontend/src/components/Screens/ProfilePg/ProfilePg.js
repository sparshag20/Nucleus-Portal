import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMsg from '../../ErrorMsg/ErrorMsg';
import SuccessMsg from '../../ErrorMsg/SuccessMsg';
import Loading from '../../Loading/Loading';
import { updateProfile } from '../../Store/Actions/userActions';
import Header from '../Header/Header';
import classes from './ProfilePg.module.css'

const ProfilePg = () => {
    const dispatch = useDispatch();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [pic, setPic] = useState(userInfo.pic ? userInfo.pic : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [newpwd, setnewpwd] = useState("");
    const [confpwd, setconfpwd] = useState("");
    const [pwdmsg, setpwdmsg] = useState();
    const [picMessage, setPicMessage] = useState();
    const [cno, setNum] = useState("");
    const [cnoMsg, setcnoMsg] = useState();
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordShown1, setPasswordShown1] = useState(false);
    const success = useSelector((state) => state.register. userUpdate_success);
    const loading = useSelector((state) => state.register. userUpdate_loading);
    const error = useSelector((state) => state.register. userUpdate_error);
    const postDetails = (pics) => {
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "eventmanage");
            data.append("cloud_name", "dxxu4powb");
            // console.log(data);
            fetch("https://api.cloudinary.com/v1_1/dxxu4powb/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data);
                    setPic(data.url.toString());

                })
                .catch((err) => {
                    // console.log(err);
                });
        } else {
            return setPicMessage("Please Select an Image");
        }
    };
    const submitHandler = (e) => {

        if (newpwd !== confpwd) {
            // console.log("not going")
            setcnoMsg("Number is Incorrect");

        } else {
            e.preventDefault();
            dispatch(updateProfile(name, email, pic, newpwd, cno));
        }

    };
    // MEDIA SCREEN
    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 500px)").matches
    )

    useEffect(() => {
        window
            .matchMedia("(max-width: 500px)")
            .addEventListener('change', e => setMatches(e.matches));

    }, []);
    return (
        <div className={classes.body}>
            <Header ></Header>

            <Alert className={classes.head}>
                <Alert.Heading> <b style={{}}> EDIT PROFILE</b> <br></br>
                    You can view and update your profile </Alert.Heading>
            </Alert>
            
            {error && <Alert msg={error}></Alert>}
            {success && <div style={{width:"80%",margin:"auto"}}><br></br><SuccessMsg msg="User Updated Successfully"></SuccessMsg></div>}
            
            <section className={classes.sec1}  >
                <section className={classes.left}>

                    <Form onSubmit={submitHandler} className={classes.form} >
                        <Form.Group >
                            <Form.Label className={classes.form_label}>Update Name </Form.Label>
                            <Form.Control className={classes.form_control}
                                placeholder="Update Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <br></br>
                        <Form.Group  >
                            <Form.Label className={classes.form_label}>Email Address</Form.Label>
                            <Form.Control className={classes.form_control}
                                type="email"
                                value={email}
                                disabled
                            ></Form.Control>

                        </Form.Group>
                        <br></br>
                        {cnoMsg && <ErrorMsg msg={cnoMsg} />}
                        <Form.Group >
                            <Form.Label>Update Contact Number </Form.Label>
                            {matches &&
                                <div style={{ position: "relative", height: "32px", border: "solid #242442 2px", display: "flex" }}>
                                    <div style={{paddingTop:"6px",fontSize:"12px"}}> +91 </div>
                                    <Form.Control className={classes.form_control}
                                        placeholder="Update Number"
                                        value={cno}
                                        onChange={(e) => setNum(e.target.value)}
                                        size="sm"
                                    ></Form.Control>
                                </div>
                            }
                            {!matches &&
                                <div style={{ position: "relative", height: "40px", border: "solid #242442 2px", display: "flex" }}>
                                    <div id={classes["numdiv"]}> +91 </div>
                                    <Form.Control className={classes.form_control}
                                        placeholder="Update Number"
                                        value={cno}
                                        onChange={(e) => setNum(e.target.value)}
                                    ></Form.Control>
                                </div>
                            }
                        </Form.Group>
                        <br></br>
                        <Form.Group className="mb-3"  >
                            <Form.Label className={classes.form_label}><b>Enter New Password</b></Form.Label>
                            {matches &&
                                <div style={{ position: "relative", height: "32px", border: "solid #242442 2px", display: "flex" }}>
                                    <Form.Control
                                        type={passwordShown ? "text" : "password"}
                                        value={newpwd}
                                        placeholder="Password"
                                        onChange={(e) => setnewpwd(e.target.value)}

                                        size="sm"
                                    >
                                    </Form.Control>
                                    <i class="fa-regular fa-eye" onClick={() => setPasswordShown(!passwordShown)} style={{ width: "20%", textAlign: "center", marginRight: "2px", paddingTop: "5px" }}></i>
                                </div>
                            }
                            {!matches &&
                                <div style={{ position: "relative", border: "solid #242442 2px", display: "flex", height: "40px" }}>
                                    <Form.Control
                                        type={passwordShown1 ? "text" : "password"}
                                        value={newpwd}
                                        placeholder="Password"
                                        onChange={(e) => setnewpwd(e.target.value)}
                                        style={{ border: "0px" }}

                                    >
                                    </Form.Control>
                                    <i class="fa-regular fa-eye " onClick={() => setPasswordShown1(!passwordShown1)} style={{ width: "20%", textAlign: "center", marginRight: "10px", paddingTop: "10px" }}></i>
                                </div>
                            }

                        </Form.Group>

                        <Form.Group className="mb-3"  >
                            <Form.Label ><b>Confirm Password</b></Form.Label>
                            {matches &&
                                <div style={{ position: "relative", height: "32px", border: "solid #242442 2px", display: "flex" }}>
                                    <Form.Control
                                        type={passwordShown ? "text" : "password"}
                                        value={confpwd}
                                        placeholder="Password"
                                        onChange={(e) => setconfpwd(e.target.value)}

                                        size="sm"
                                    >
                                    </Form.Control>
                                    <i class="fa-regular fa-eye" onClick={() => setPasswordShown(!passwordShown)} style={{ width: "20%", textAlign: "center", marginRight: "2px", paddingTop: "5px" }}></i>
                                </div>
                            }
                            {!matches &&
                                <div style={{ position: "relative", border: "solid #242442 2px", display: "flex", height: "40px" }}>
                                    <Form.Control
                                        type={passwordShown1 ? "text" : "password"}
                                        value={confpwd}
                                        placeholder="Password"
                                        onChange={(e) => setconfpwd(e.target.value)}
                                        style={{ border: "0px" }}

                                    >
                                    </Form.Control>
                                    <i class="fa-regular fa-eye " onClick={() => setPasswordShown1(!passwordShown1)} style={{ width: "20%", textAlign: "center", marginRight: "10px", paddingTop: "10px" }}></i>
                                </div>
                            }

                        </Form.Group>
                        {picMessage && <ErrorMsg msg={picMessage} />}
                        <Form.Group controlId="pic" >
                            <Form.Label className={classes.form_label}>Change Profile Picture</Form.Label>
                            {!matches &&
                                <Form.Control className={classes.form_control_pic}
                                    onChange={(e) => postDetails(e.target.files[0])}
                                    id="custom-file"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    label="Upload Profile Picture"
                                    custom
                                />}
                            {matches &&
                                <Form.Control className={classes.form_control_pic}
                                    onChange={(e) => postDetails(e.target.files[0])}
                                    id="custom-file"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    label="Upload Profile Picture"
                                    size="sm"
                                    custom
                                />
                            }
                        </Form.Group>
                        <br></br>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                        {loading && <Loading size={50} />}
                    </Form>
                </section>
                <section className={classes.right}>
                    <img className={classes.profilePic} src={pic}></img>
                </section>
                {/* <section>
                    <div className={classes.right} >
                    <img src={pic} alt={name} className={classes.profilePic} />
                    
                    </div>
                </section> */}
            </section>
        </div>
    )
}

export default ProfilePg
