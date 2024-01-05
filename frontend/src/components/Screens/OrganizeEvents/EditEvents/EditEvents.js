import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMsg from '../../../ErrorMsg/ErrorMsg';
import { updateEvent } from '../../../Store/Actions/eventActions';
import classes from './EditEvents.module.css';
const EditEvents = ({ match }) => {
  let { id } = useParams();
  const [title_of_event, setTitle] = useState("");
  const [postermsg, setPostermsg] = useState();
  const [content, setContent] = useState("");
  const [time_of_event, setTime] = useState("");
  const [date_of_event, setDate] = useState("");
  const [dateError, setdateError] = useState(false);
  const [seats_of_event, setSeats] = useState("");
  const [poster, setPoster] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetching = async () => {
      // console.log(id);
      const { data } = await axios.get(`/api/events/${id}`);
      // console.log(data);
      setTitle(data.title_of_event);
      setContent(data.content);
      setTime(data.time_of_event);
      setDate(data.date_of_event.substring(0, 10));
      setSeats(data.seats_of_event);
      setPoster(data.poster);
    };
    fetching();
  }, []);
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

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setTime("");
    setDate("");
    setSeats("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    var temp = new Date(date_of_event);
    if (temp < new Date()) {
      setdateError(true);
      return;
    }
    else {
      setdateError(false);
      dispatch(updateEvent(id, title_of_event, content, time_of_event, date_of_event, seats_of_event, poster));
      // console.log({ id });
      resetHandler();
      navigate('/organizeevent');
    }
  };

  const cancelHandler = () => {
    navigate('/organizeevent');
  }

  // MEDIA SCREEN
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 900px)").matches
  )

  useEffect(() => {
    window
      .matchMedia("(max-width: 900px)")
      .addEventListener('change', e => setMatches(e.matches));

  }, []);
  return (
    <section style={{ margin: "25px", paddingBottom: "25px" }}>

      {/* If user enters event date which has already passed  */}

      <Card>
        <Card.Header>Edit your event </Card.Header>
        <Card.Body className={classes.card_body}>
          <section className={classes.left}>
            <Form onSubmit={updateHandler}>
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
                  rows={7}  // height of the input box
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </Form.Group>
              <br></br>
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
                  placeholder="Enter tota; seats"
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
              {matches && <br></br>}
              {!matches &&
                <>

                  {/* {loading && <Loading size={50} />} */}
                  <Button type="submit" variant="primary" onClick={updateHandler}>
                    Update Event
                  </Button>
                  {/* <Button className="mx-2" onClick={resetHandler} variant="danger"> */}
                  <Button className="mx-2" variant="primary" onClick={resetHandler}>
                    Reset Feilds
                  </Button>
                  <Button className="mx-2" variant="danger" onClick={cancelHandler}>
                    Cancel
                  </Button>
                </>
              }
            </Form>
          </section>
          <section className={classes.right}>
            <img className={classes.poster} src={poster} alt="Unable to load"></img>
            {matches && <br></br>}
            {matches &&
              <>

              <div style={{display:"flex"}}>
                
                <Button type="submit" variant="primary" size="sm" style={{height:"3vh",fontSize:"1.5vh"}}onClick={updateHandler}>
                  Update
                </Button>
                {/* <Button className="mx-2" onClick={resetHandler} variant="danger"> */}
                <Button className="mx-2" variant="primary" size="sm" style={{height:"3vh",fontSize:"1.5vh"}}onClick={resetHandler}>
                  Reset
                </Button>
                <Button className="mx-2" variant="danger" size="sm" style={{height:"3vh",fontSize:"1.5vh"}}onClick={cancelHandler}>
                  Cancel
                </Button>
                
                </div>
                <br></br>
              </>
            }
          </section>

        </Card.Body>

        <Card.Footer className="text-muted">
          Editing on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </section>
  )
}

export default EditEvents
