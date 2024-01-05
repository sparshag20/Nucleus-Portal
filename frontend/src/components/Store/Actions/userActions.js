  import axios from "axios";
  import { loginActions, registerActions } from '../Store';
  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch(loginActions.USER_LOGIN_REQUEST());
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );
      // console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(loginActions.USER_LOGIN_SUCCESS(data));
  
      
    } catch (error) {
      dispatch(
        loginActions.USER_LOGIN_FAIL(
          error.response && error.response.data.message
          ? error.response.data.message
          : error.message));
    }
  };
  export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch(loginActions.USER_LOGOUT);
  };

  export const register = (name, email, password) => async (dispatch) => {
    try {
      dispatch(registerActions.USER_REGISTER_REQUEST());
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/api/users",
        { name,email, password },
        config
      );
  
      dispatch(registerActions.USER_REGISTER_SUCCESS(data));
  
      dispatch(registerActions.USER_REGISTER_SUCCESS(data));
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
    
        dispatch(registerActions.USER_REGISTER_FAIL(error.response && error.response.data.message
          ? error.response.data.message
          : error.message),
      );
    }
  };
  
  export const updateProfile = (name, email, pic,password,contact )  => async (dispatch) => {
    try {
      dispatch(registerActions.USER_UPDATE_REQUEST());
      const userInfo=JSON.parse(localStorage.getItem('userInfo'));
      // console.log(userInfo.token);
      const config = {
        headers: {
          "Content-type": "application/json",
           Authorization: `Bearer ${userInfo.token}`
        },
      };
      // console.log("update");
      const { data } = await axios.put(
        "api/users/profile",
        {name, email, pic,password,contact},
        config
      );
      
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(registerActions.USER_UPDATE_SUCCESS());
    } catch (error) {
    
        dispatch(registerActions.USER_UPDATE_FAIL(error.response && error.response.data.message
          ? error.response.data.message
          : error.message),
      );
    }
  };
  
  
  
