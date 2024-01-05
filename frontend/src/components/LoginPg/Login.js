import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux'
import { toggleActions, loginActions } from '../Store/Store';
import { login } from '../Store/Actions/userActions';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.login.userLogin);
  const { loading, error, userInfo } = userLogin;
  // const err=useSelector((state)=>state.login.error);
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 500px)").matches
  )

  useEffect(() => {
    window
      .matchMedia("(max-width: 500px)")
      .addEventListener('change', e => setMatches(e.matches));

  }, []);

  useEffect(() => {
    if (userInfo) {
      navigate("/landingscreen");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (par) => {

    par.preventDefault()  //imp line for submit form
    // console.log(email,password);

    // sending data to API
    dispatch(login(email, password));
  }

  // Calling Store Redux to toggle between login and register page
  const registerPage = () => {
    dispatch(toggleActions.register());
  }

  return (
    <>
      <section className='Login_pg'>
        <section id="cardt">Sign In </section><br></br><br></br><br></br>
        <div>
          {error && <ErrorMsg msg="Incorrect Username or Password" />}
          {loading && <Loading />}

          <Form onSubmit={submitHandler} style={{ paddingLeft: "10px", paddingRight: "10px" }}>

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
            <Form.Group className="mb-2" controlId="formBasicPassword" style={{ paddingTop: "20px" }}>
              <div style={{ border: "solid #242442 2px", position: "relative", height: "7vh", borderRadius: "0px 0px 20px 20px", borderWidth: "0 0.1px 5px 0px", display: "flex" }}>
                {!matches && <i class="fa-solid fa-lock fa-2x" style={{ marginLeft: "2%" }}></i>}
                {matches && <i class="fa-solid fa-lock fa-2x" style={{ position: "absolute", width: "20%", marginLeft: "2%", padding: "2%" }}></i>}

                {matches && <Form.Control type="password" placeholder="Password" onChange={(p) => setPassword(p.target.value)} style={{ fontSize: "15px", position: "absolute", width: "85%", height: "100%", marginLeft: "15%", borderRadius: "0px 0px 20px 0px" }}
                />}
                {!matches && <Form.Control type="password" placeholder="Password" onChange={(p) => setPassword(p.target.value)} style={{ fontSize: "20px", position: "absolute", width: "90%", height: "100%", marginLeft: "10%", borderRadius: "0px 0px 20px 0px" }}
                />}
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit

            </Button>

          </Form>
          <Row className="py-3" style={{ padding: "40px" }} >
            <Col>New Customer ? <Link to="/register" onClick={registerPage} style={{ color: "rgb(80, 80, 240)", textDecoration: "underline" }}>Register Here</Link></Col>
          </Row>
        </div>

      </section>
    </>
  );
}

export default Login
