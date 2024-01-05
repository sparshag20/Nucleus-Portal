import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Accordion, Badge, Button, Card, Form, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getmailid, listuserCreatedEvents } from '../../../Store/Actions/eventActions'
import { deleteEvent,cleararr } from '../../../Store/Actions/eventActions'
import { toggleActions } from '../../../Store/Store';
import { CSVDownload, CSVLink } from "react-csv";
import '../EditEvents/GetEvents.css'
import "aos/dist/aos.css"
import Aos from "aos";
const GetEvents = () => {
  const rsvp_btn = useSelector((state) => state.toggle.rsvp);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.userCreatedEvents);
  const userLogin = useSelector((state) => state.login.userLogin);
  const [search, setSearch] = useState("");
  const [count_of_rsvp,setCount]=useState(0);
  const [flag, setFlag] = useState(new Map());
  const [down, setDown] = useState(new Map());
  const [datafetched,setdatafetched]=useState(false);
  const [show, setShow] = useState(new Map());
  const [btntext,setBtntext]=useState("Click to Download RSVP Data");
  const { userInfo } = userLogin;
  const exceldata=useSelector((state)=>state.register.mailid);
  
  useEffect(()=>{
    Aos.init({duration:2000})
  },[])
  useEffect(() => {
    dispatch(listuserCreatedEvents());
  }, [userInfo, events]);
     // important putting events inside useEffect so whenever delete takes place events would update and map value would also be updated
  useEffect(()=>{
    download();
  },[exceldata])
  useEffect(()=>{},[datafetched]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteEvent(id));
    }
  }
  
const headers = [
  {
    label:"Name",key:"name"
  },
  {
    label:"Age",key:"eid"
  },
 
]
 
const csvLink = {
  headers:headers,
  data: exceldata,
  filename:"csvfile.csv",
}
  function D(single){
    
    setCount(single.rsvp.length);
    dispatch(cleararr());
    single.rsvp.map( i=>{
      dispatch(getmailid(i));
    })
 }

  function download(){
    if(count_of_rsvp===exceldata.length){
      // console.log("Download function called ");
      // console.log(exceldata);
      setdatafetched(true);
    }
  }


 
  return (
    <>
      <section className='events2'>

      <Form style={{width:"70%",margin:"auto"}}>
      <Form.Group  className="mb-3" controlId="formBasicEmail" >
        <Form.Control type="email" placeholder=" Search Event .....   " 
        onChange={(e) => setSearch(e.target.value)} style={{textAlign:"center",height:"50px", fontSize: "25px",border:"5px solid #44bbb7"}}/>
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
    </Form>

        {events && events
        .filter((filteredEvent)=> filteredEvent.title_of_event.toLowerCase().includes(search.toLowerCase()))
        .reverse()
        .map((single) => (
         <Accordion>        
          <Card data-aos="fade-up" id="card" key={single._id}>
          <Card.Header id='header'>{single.title_of_event}</Card.Header>
            
            <Card.Body>
              <Card.Title id='content'>{single.content}</Card.Title>
              <Card.Text id='text'>
                <b>Date : </b>{single.date_of_event.substring(0, 10)} <br></br>
                <b>Time : </b>{single.time_of_event}
                <Badge pill bg="dark" style={{ marginLeft: "10%", height: "35px", padding: "10px", fontSize: "15px" }}>{single.seats_of_event - single.rsvp.length}  Seats Left </Badge>
              </Card.Text>
              <Button variant="primary" style={{ margin: "1%" }} active href={`/events/${single._id}`}>
                EDIT
              </Button>
              <Button variant="primary" style={{ margin: "1%" }} active onClick={() => deleteHandler(single._id)}>
                Delete
              </Button>
             
              <Button onClick={()=>
              {
                D(single)
                setBtntext("Downloading ..")
                if (down.get(single._id)) {
                  setShow(new Map(down.set(single._id, false)));
                  setDown(new Map(down.set(single._id, false)));
                }
                else {
                  setDown(new Map(down.set(single._id, true)));
                  setShow(new Map(down.set(single._id, true)));
                }
              }}
              >Click to download data .. </Button>
            
              { datafetched && down.get(single._id) &&
                <CSVLink {...csvLink} style={{fontSize:"20px",padding:"10px"}}><i class="fa-sharp fa-solid fa-download"></i></CSVLink>
              }
              <Button variant="success" style={{ margin: "1%" }} onClick={() => {
                if (flag.get(single._id)) {
                  setFlag(new Map(flag.set(single._id, false)));
                }
                else {
                  setFlag(new Map(flag.set(single._id, true)));
                }
              }}>
                View RSVP List
              </Button>

              {flag.get(single._id) &&  //flaf is defined in view rsvp list
                <div>
                  <br></br>
                  <div style={{
                    fontSize: "4vh",
                    fontFamily: "Trebuchet MS", marginLeft:"30%"
                  }}
                  >RSVP List for Event - <b>{single.title_of_event} </b> </div>
                  <Accordion flush >
                  {single.rsvp.map((i, index) => (
                    <>
                    
                    <Accordion.Item eventKey={index} style={{margin:"auto",marginBottom:"0",width:"80%"}}>
                    <Accordion.Header  style={{border:"0.1px solid #000000"}} >
                              {index + 1} - {i}
                      </Accordion.Header>
                      <Accordion.Body style={{border:"0.5px solid #000000", fontSize: "2vh",fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"}}>    
                              <b>Email Address : </b>  
                      </Accordion.Body>    
                      <br></br>
                      </Accordion.Item>
                      
                    </>

                  ))
                  }
                  </Accordion>
                </div>

              }

            </Card.Body>
          </Card>
    
          </Accordion>
        ))}
        <br></br>
        <br></br>
      </section>

    </>
  )
}

export default GetEvents