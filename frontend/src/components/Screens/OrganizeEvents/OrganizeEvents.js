import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toggleActions } from '../../Store/Store';
import CreateEvents from './CreateEvents/CreateEvents';
import Header from '../Header/Header'
import classes from '../OrganizeEvents/OrganizeEvents.module.css';
import GetEvents from './EditEvents/GetEvents';
import { Link, useNavigate } from 'react-router-dom';
const OrganizeEvents = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const create = useSelector((state) => state.toggle.create);
  const createEvent=()=>{
    console.log(create);
    dispatch(toggleActions.createstate());
  }
  const userInfo=localStorage.getItem('userInfo');
  useEffect(()=>{
    if(!userInfo){
      navigate("/login");
    }
  },[navigate,userInfo])

  return (
    <>
      <Header></Header>
      <section className={classes.sec1}>
        <section id={classes.tit_sec}>
          <section id={classes.tit_sec_title}>CREATE <br></br>UPDATE & DELETE EVENTS </section>
        </section>
      </section>
      <section className={classes.sec3}></section>
      <section className={classes.sec2}>
        <div id={classes.sec2_tit}>Your Events  : </div>
        <div id={classes.sec2_sub_tit}>You can edit , update and delete events only which are created by you </div>
        <section className={classes.d_grid}>
          {!create && <Button variant="secondary" id={classes.createbtn} onClick={createEvent}>
            Click to Create Event
          </Button>
          }
         {create && <Button variant="secondary" id={classes.createbtn} onClick={createEvent}>
            Cancel creating event 
          </Button>} 
          {create && <CreateEvents/>}
          
        </section>
        <GetEvents></GetEvents>
      
      </section>
        
    </>
  )
}

export default OrganizeEvents
