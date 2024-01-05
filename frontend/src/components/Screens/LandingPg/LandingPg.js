import React, { useEffect } from 'react'
import { Accordion } from 'react-bootstrap'
import ViewEvents from '../EventsComp/ViewEvents/ViewEvents'
import Header from '../Header/Header'
import classes from './LandingPg.module.css'
import { useNavigate } from 'react-router-dom';
import 'animate.css';
import { useSelector } from 'react-redux'
const LandingPg = () => {
  const userInfo = useSelector((state) => state.login.userLogin);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);
  return (
    <div className='q'>
      <Header ></Header>
      <section className={classes.sec1} >
        <section id={classes.tit_sec} className='animate__animated animate__bounceInUp' style={{animationDuration: "2s"}}>
          <section id={classes.tit_sec_title}  ><b>Welcome to Portal</b><br></br><br></br><div id={classes['sub_tit']}>Forget filling forms just take part with click of a button</div><br></br></section>
        </section>
      </section>
      <section className={classes.sec2}></section>
      <ViewEvents></ViewEvents>
    </div>
  )
}

export default LandingPg
