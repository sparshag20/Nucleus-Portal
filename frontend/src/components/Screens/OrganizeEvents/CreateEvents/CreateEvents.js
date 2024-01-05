import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import ErrorMsg from "../../../ErrorMsg/ErrorMsg"
import SuccessMsg from '../../../ErrorMsg/SuccessMsg';
import Loading from '../../../Loading/Loading';
import { createEventAction, listEvents, listuserCreatedEvents } from '../../../Store/Actions/eventActions';
import classes from './CreateEvents.module.css';
// import { useMediaQuery } from 'react-responsive';
const CreateEvents = () => {
  const events = useSelector((state) => state.event.events);
  useEffect(() => {
    dispatch(listEvents());
  }, [events]);

  const [title_of_event, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [time_of_event, setTime] = useState("");
  const [date_of_event, setDate] = useState("");
  const [seats_of_event, setSeats] = useState("");
  const [dateError, setdateError] = useState(false);
  const success = useSelector((state) => state.event.userEvent.success);
  const loading=useSelector((state)=>state.event.userEvent.loading);
  const dispatch = useDispatch();
 
  useEffect(() => { 
    dispatch(listuserCreatedEvents());
  }, [loading,success]);
  const [postermsg,setPostermsg]=useState();
  const [poster, setPoster] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
  const posterDetails = (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "eventmanage");
      data.append("cloud_name", "dxxu4powb");
      fetch("https://api.cloudinary.com/v1_1/dxxu4powb/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setPoster(data.url.toString());
        })
        .catch((err) => {
        });
    } else {
      return setPostermsg("Please Select a jpeg image");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(title_of_event);
    // console.log(content);
    // console.log(time_of_event);
    // console.log(date_of_event);

    var temp = new Date(date_of_event);
    if (temp < new Date()) {
      setdateError(true);
      return;
    }
    else {
      setdateError(false);
      dispatch(createEventAction(title_of_event, content, time_of_event, date_of_event, seats_of_event,poster));

      resetHandler();   //to clear data after submit is clicked

    }
  }

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setSeats("");
    setTime("");
    setDate("");
    setPoster("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
  };
  return (
    <>
   
      <section style={{ margin: "25px", paddingBottom: "25px" }}>

        {/* If user enters event date which has already passed  */}

        <Card style={{ position: "relative" }}>
        {success && <SuccessMsg msg="Event Created Successfully"></SuccessMsg>}
          <Card.Header>Create a new Event</Card.Header>
          <Card.Body style={{ display: "flex", position: "relative" }}>
            
            <section className={classes.left}>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="title">
                  <Form.Label>Title of the Event</Form.Label>
                  <Form.Control
                    type="title"
                    value={title_of_event}
                    placeholder="Enter the title of event"
                    onChange={(e) => setTitle(e.target.value)}
                    required // important making this box compulsory to fill
                  />
                </Form.Group>
                <br></br>
                <Form.Group controlId="content">
                  <Form.Label>Describe your event </Form.Label>
                  <Form.Control
                    as="textarea"
                    value={content}
                    placeholder="Describe your event "
                    rows={5}  // height of the input box
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </Form.Group>
                <br></br>
                {postermsg && <ErrorMsg msg={postermsg}/>}
                <Form.Group controlId="pic" >
                  <Form.Label className={classes.form_label}>Upload Poster of the Event </Form.Label>
                  <Form.Control
                    onChange={(e) => posterDetails(e.target.files[0])}
                    id="custom-file"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    label="Upload Profile Picture"
                    custom
                  />
                </Form.Group>
                <br></br>
                <Form.Group controlId="">
                  <Form.Label>Total Seats for the Event</Form.Label>
                  <Form.Control
                    type="number"
                    value={seats_of_event}
                    placeholder="Enter total seats"
                    onChange={(e) => setSeats(e.target.value)}
                    required // important making this box compulsory to fill
                  />
                </Form.Group>
                <br></br>
                {dateError && <ErrorMsg msg="You have entered wrong date  Your event date has already passed 😐"></ErrorMsg>}
                <Form.Group controlId="content" style={{ width: "50%" }}>
                  <Form.Label>Date of Event</Form.Label>
                  <br></br>
                  <Form.Control
                    type="date"
                    value={date_of_event}
                    name="date_of_event"
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />

                </Form.Group>
                <br></br>
                <Form.Group controlId="content" style={{ width: "50%" }}>
                  <Form.Label >Time of Event </Form.Label>
                  <br></br>
                  <Form.Control
                    type="time"
                    value={time_of_event}
                    name="time_of_event"
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />

                </Form.Group>
                <br></br>
                {loading && <Loading size={50} />}
                <Button type="submit" variant="primary" onClick={submitHandler}>
                  Create Event
                </Button>
                {/* <Button className="mx-2" onClick={resetHandler} variant="danger"> */}
                <Button className="mx-2" variant="danger" onClick={resetHandler}>
                  Reset Feilds
                </Button>
              </Form>
            </section>
            <section className={classes.right} >

              <div className={classes.img_title}>Poster of the Event</div>
              <br></br>
              <img src={poster} className={classes.posterPic} />
            </section>

          </Card.Body>

          <Card.Footer className="text-muted">
          {success && <SuccessMsg msg="Event Created Successfully"></SuccessMsg>}
            Creating on - {new Date().toLocaleDateString()}
          </Card.Footer>
        </Card>
      </section>
    </>
  )
}

export default CreateEvents
