
import axios from "axios";
import { eventActions, registerActions } from "../Store";
export const listEvents = () => async (dispatch) => {
  try {
    dispatch(eventActions.EVENT_LIST_REQUEST());
    const userInfo=JSON.parse(localStorage.getItem('userInfo'));
    const token=userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,   //only Bearer token is accepted so we send token
      },
    };
  
    const { data } = await axios.get("/api/events", config);
    // console.log(data);
    dispatch(eventActions.EVENT_LIST_SUCCESS(data));
  } catch (error) {
    // console.log("error");
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(eventActions.EVENT_LIST_FAIL(message));
  }

};


// imp variable names declared in backend event model and event controller should be same as declared here 
export const createEventAction=(title_of_event,content,time_of_event,date_of_event,seats_of_event,poster)=> async (dispatch) => {
  try {
    dispatch(eventActions.EVENT_CREATE_REQUEST());

    const userInfo=JSON.parse(localStorage.getItem('userInfo'));
    const token=userInfo.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,   //only Bearer token is accepted so we send token
      },
    };
  
    const { data } = await axios.post(`/api/events/create`,{title_of_event,content,time_of_event,date_of_event,seats_of_event,poster},config);
    dispatch(eventActions.EVENT_CREATE_SUCCESS(data));
    
  } catch (error) {
    console.log("error");
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(eventActions.EVENT_CREATE_FAIL(message));
  }
};


export const listuserCreatedEvents = () => async (dispatch) => {
  try {
    dispatch(eventActions.EVENT_LIST_REQUEST());
    const userInfo=JSON.parse(localStorage.getItem('userInfo'));
    const token=userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,   //only Bearer token is accepted so we send token
      },
    };
  
    const { data } = await axios.get("/api/events/get", config);
    // console.log(data);
    dispatch(eventActions.USER_CREATED_Events(data));
  } catch (error) {
    // console.log("error");
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(eventActions.EVENT_LIST_FAIL(message));
  }

};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch(eventActions.EVENT_DELETE_REQUEST());
    const userInfo=JSON.parse(localStorage.getItem('userInfo'));
    const token=userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,   //only Bearer token is accepted so we send token
      },
    };
  
    const { data } = await axios.delete(`api/events/${id}`, config);
    dispatch(eventActions.EVENT_DELETE_SUCCESS(data));
  } catch (error) {
    // console.log("error");
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(eventActions.EVENT_DELETE_FAIL(message));
  }
};

export const updateEvent = (id,title_of_event,content,time_of_event,date_of_event,seats_of_event,poster) => async (dispatch) => {
  try {
    dispatch(eventActions.EVENT_UPDATE_REQUEST());
    const userInfo=JSON.parse(localStorage.getItem('userInfo'));
    // console.log('userInfo');
    const token=userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,   //only Bearer token is accepted so we send token
      },
    };
  
    const { data } = await axios.put(`/api/events/${id}`,{title_of_event,content,time_of_event,date_of_event,seats_of_event,poster},config);
    dispatch(eventActions.EVENT_UPDATE_SUCCESS(data));
  } catch (error) {
    // console.log("error");
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(eventActions.EVENT_UPDATE_FAIL(message));
  }
};

export const getmailid=(name)=>async(dispatch)=>{
  try{
   
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const {data}= await axios.put("/api/users/getmail",{ name },config);
    
    // const temp=[{id:Math.random().toString(),name:name,eid:data.email}];
    // setData([temp,...edata]);
    // console.log(edata);
    console.log(data.email);
    console.log("name::::");
    dispatch(registerActions.ADD_MAIL_ID({name:name,email:data.email}));
  }catch(error){
        console.error(`Error .${error}`);
  }  
}

export const cleararr=()=>(dispatch)=>{
  dispatch(registerActions.Clear_data());
}

export const rsvp_add_name=(id)=>async(dispatch)=>{
  try {
    const userInfo=JSON.parse(localStorage.getItem('userInfo'));
    
    const token=userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,   //only Bearer token is accepted so we send token
      },
    };
    
    const user_id=JSON.parse(localStorage.getItem('userInfo'))._id;
    // console.log("user_id from frontend");
    // console.log(user_id);
    // const email=JSON.parse(localStorage.getItem('userInfo')).email;
    const { data } = await axios.put(`/api/events/${id}/rsvp`,{user_id},config);
    // const { data } = await axios.put(`/api/events/${id}/rsvp`,{username,email},config);
    // console.log("rsvp");
    // console.log(data);
    // window.location.reload();
  
  } catch (error) {
    console.log("error");
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
  }
}


export const rsvp_remove_name=(id)=>async(dispatch)=>{
  try {
    const userInfo=JSON.parse(localStorage.getItem('userInfo'));
    const token=userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,   //only Bearer token is accepted so we send token
      },
    };
    
    const user_id=JSON.parse(localStorage.getItem('userInfo'))._id;
    const { data } = await axios.put(`/api/events/${id}/remove_rsvp`,{user_id},config);
  
    
  } catch (error) {
    console.log("error");
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
  }
}

export const rsvp_remove_name_from_table=(event_id,removelist)=>async(dispatch)=>{
  try {
    const userInfo=JSON.parse(localStorage.getItem('userInfo'));
    const token=userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,   //only Bearer token is accepted so we send token
      },
    };
    
    const {data}= await axios.put(`/api/events/${event_id}/remove_rsvp_list_event`,{event_id,removelist},config);
  
  } catch (error) {
    console.log("error");
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
  }
}