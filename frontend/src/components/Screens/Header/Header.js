import React, { useEffect, useState } from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/nhrybbrv.png'
// import {logout} from '../Store/Actions/userActions';
import { logout } from '../../Store/Actions/userActions';
import './Header.css'
const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.login.userLogin)
  const temp= JSON.parse(localStorage.getItem('userInfo'));
  const pic=temp.pic;
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);
  const logHandler=()=>{
    dispatch(logout());
    
  }
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 990px)").matches
  )
  
  useEffect(() => {
    window
      .matchMedia("(min-width: 990px)")
      .addEventListener('change', e => setMatches(e.matches));
    
    
  }, []);
 

  return (
    <Navbar expand="lg" id='navt' >
      <Navbar.Brand id='Navbar_brand' style={{backgroundImage:`url(${logo})`}}></Navbar.Brand>
      <Navbar.Toggle id="toggle"/>
      <Navbar.Collapse>
        <Container style={{marginTop:"2%"}}>
          <Nav className="me-auto" id="mea" >
            <Nav.Link href="/landingscreen" id="topic" >Home</Nav.Link>
            <Nav.Link href="/organizeevent" id="topic"> + Host Event </Nav.Link>
            <Nav.Link href="/profile" id="topic" style={{display:"flex"}}> + Profile {matches&& <Image  roundedCircle src={pic} style={{marginLeft:"12px",marginTop:"-10px",height:"48px",width:"55px",border:"2px solid #ffffff"}}></Image> }</Nav.Link>
            <Nav.Link href="/" id="ltopic" onClick={logHandler}>+ Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar.Collapse>
      {/* trbl */}



    </Navbar>
  );
}

export default Header