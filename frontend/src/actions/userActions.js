import axios from "axios";
// Axios is a promise based HTTP client for the browser , it makes asynchronous HTTP requests to REST end points and performs CRUD operations
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstants";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";
//The above constants are used for specific tasks throught the actions which are needed to performed to the reducers

//An action for the users to login should be made below
export const login = (email, password) => async (dispatch) => {
  // The login will take in a email and password prop , the email and password are the users details

  try {
    dispatch({
      // Then the user login request constant is dispatched
      type: USER_LOGIN_REQUEST,
    });

    // This is the configaration which is used for Post man
    const config = {
      // The post man API takes in the headers
      headers: {
        // First the Content type is applied in
        "Content-Type": "application/json",
      },
    };

    // once the authorization takes place , then the login details are dispatched to the backend using the Axios request  api/users.login
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    //the users login details should be dispatched
    dispatch({
      // The user login success is first dispatched
      type: USER_LOGIN_SUCCESS,
      //The login data should be dispatched to the reducer
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    //the details of the users are set into local storage as well
    //if the the data could not be dipatched an error should be showed
  } catch (error) {
    // The error should now be dispatched
    dispatch({
      // The user login fail constant is then dipatched
      type: USER_LOGIN_FAIL,
      //The payload would then contain tht error messaged
      payload:
        error.response && error.response.data.message
          ? // Returning the error responce for the data
            error.response.data.message
          : // Or the normal error message
            error.message,
    });
  }
};

//An action should be created for the users to logout
export const logout = () => (dispatch) => {
  //the logout doesnt take any props , thid is actually a function
  localStorage.removeItem("userInfo");
  //The user would be removed from the local storage
  dispatch({ type: USER_LOGOUT });
  //The user logout constant is dispatched
  dispatch({ type: USER_DETAILS_RESET });
  //The users details reset constant should be dispatched
  dispatch({ type: ORDER_LIST_MY_RESET });
  //The users orders reset constsnt should be dispatched
  dispatch({ type: USER_LIST_RESET });
  //The users list constant should be dispacthed
};

//An action should be created to give an feature to the users to register
export const register = (name, email, password) => async (dispatch) => {
  // The register will take in 3 props , email , password and the name of the user

  try {
    dispatch({
      // Then the user register request constant is dispatched
      type: USER_REGISTER_REQUEST,
    });

    // This is the configaration which is used for Post man
    const config = {
      // The post man API takes in the headers
      headers: {
        // First the Content type is applied in
        "Content-Type": "application/json",
      },
    };

    // once the authorization takes place , then the users registered details are dispatched to the backend using the Axios request  api/user
    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    //once the users details are bought in they have to dispatched to the reducer
    dispatch({
      // The user register create success is first dispatched
      type: USER_REGISTER_SUCCESS,
      //Then the payload containg the the users information is dispatched
      payload: data,
    });

    dispatch({
      // The user login  success is first dispatched
      type: USER_LOGIN_SUCCESS,
      //Then the payload containg the the users information is dispatched
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    //The users information from the local storage is bought in
    //if the the data could not be dipatched an error should be showed
  } catch (error) {
    // The error should now be dispatched
    dispatch({
      // The users register fail constant is then dipatched
      type: USER_REGISTER_FAIL,
      //The payload would then contain tht error messaged
      payload:
        error.response && error.response.data.message
          ? // Returning the error responce for the data
            error.response.data.message
          : // Or the normal error message
            error.message,
    });
  }
};

//An action for fetching the users details should be bought in for the users profile screen
export const getUserDetails = (id) => async (dispatch, getState) => {
  // The getUserDetails will take in only one prop for the id , the id is the identification number of the user
  try {
    dispatch({
      // Then the user details request constant is dispatched
      type: USER_DETAILS_REQUEST,
    });

    //The user information is then fetched from the reducer state , this is used to check if the user is a registered user or not
    const {
      userLogin: { userInfo },
    } = getState();

    // This is the configaration which is used for Post man
    const config = {
      // The post man API takes in the headers
      headers: {
        // Then the authorization is applied using the bearer token
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // once the authorization takes place , then the user details are dispatched from the backend using the Axios request  api/users/id
    const { data } = await axios.get(`/api/users/${id}`, config);

    //the details of the user are dispatched
    dispatch({
      // The user details success is first dispatched
      type: USER_DETAILS_SUCCESS,
      //The user details are then dispacthed to the reducer
      payload: data,
    });
    //if the the data could not be dipatched an error should be showed
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? // Returning the error responce for the data
          error.response.data.message
        : // Or the normal error message
          error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    // The error should now be dispatched
    dispatch({
      // The user details fail constant is then dipatched
      type: USER_DETAILS_FAIL,
      //The payload would then contain tht error messaged
      payload: message,
    });
  }
};

//An action for updating the user profile should be created
export const updateUserProfile = (user) => async (dispatch, getState) => {
  // The updateUserProfile will take in only one prop for the user, the user is the infromation of the user
  try {
    dispatch({
      // Then the user update request constant is dispatched
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    //The user information is then fetched from the reducer state , this is used to check if the user is an admin or not
    const {
      userLogin: { userInfo },
    } = getState();

    // This is the configaration which is used for Post man
    const config = {
      // The post man API takes in the headers
      headers: {
        // First the Content type is applied in
        "Content-Type": "application/json",
        // Then the authorization is applied using the bearer token
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // once the authorization takes place , then the users updated are dispatched to the backend using the Axios request  api/user/profile
    const { data } = await axios.put(`api/users/profile`, user, config);

    //once the updated users details are bought in they have to dispatched to the reducer
    dispatch({
      // The user update  success is first dispatched
      type: USER_UPDATE_PROFILE_SUCCESS,
      //Then the payload containing the the user profile  is dispatched
      payload: data,
    });
    //if the the data could not be dipatched an error should be showed
  } catch (error) {
    // The error should now be dispatched
    dispatch({
      // The user update fail constant is then dipatched
      type: USER_UPDATE_PROFILE_FAIL,
      //The payload would then contain that error messaged
      payload:
        error.response && error.response.data.message
          ? // Returning the error responce for the data
            error.response.data.message
          : // Or the normal error message
            error.message,
    });
  }
};

//An action for listing the users should be made only for the admin to view
export const listUsers = () => async (dispatch, getState) => {
  try {
    // The listUsers will take in no props
    dispatch({
      // Then the user list request constant is dispatched
      type: USER_LIST_REQUEST,
    });
    //The user information is then fetched from the reducer state , this is used to check if the user is an admin or not
    const {
      userLogin: { userInfo },
    } = getState();

    // This is the configaration which is used for Post man
    const config = {
      // The post man API takes in the headers
      headers: {
        // Then the authorization is applied using the bearer token
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // once the authorization takes place , then the users are dispatched from the backend using the Axios request  api/users
    const { data } = await axios.get(`/api/users`, config);

    //list of users should be dispatched
    dispatch({
      // The user list  success is first dispatched
      type: USER_LIST_SUCCESS,
      //The data is now dispatched to the reducer
      payload: data,
    });
    //if the the data could not be dipatched an error should be showed
  } catch (error) {
    // The error should now be dispatched
    dispatch({
      // The user list fail constant is then dipatched
      type: USER_LIST_FAIL,
      //The payload would then contain tht error messaged
      payload:
        error.response && error.response.data.message
          ? // Returning the error responce for the data
            error.response.data.message
          : // Or the normal error message
            error.message,
    });
  }
};

//An action should be made to delete a user from the system
export const deleteUser = (id) => async (dispatch, getState) => {
  // The deleteUser will take in only one prop for the id , the id is the identification number of the user

  try {
    dispatch({
      // Then the user delete request constant is dispatched
      type: USER_DELETE_REQUEST,
    });

    //The user information is then fetched from the reducer state , this is used to check if the user is an admin or not
    const {
      userLogin: { userInfo },
    } = getState();

    // This is the configaration which is used for Post man
    const config = {
      // The post man API takes in the headers
      headers: {
        // Then the authorization is applied using the bearer token
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // once the authorization takes place , then the users are deleted and are dispatched to the backend using the Axios request  api/products/id
    await axios.delete(`/api/users/${id}`, config);

    //deleting the user should be dispatched
    dispatch({ type: USER_DELETE_SUCCESS });
    //if the the data could not be dipatched an error should be showed
  } catch (error) {
    // The error should now be dispatched
    dispatch({
      // The user delete fail constant is then dipatched
      type: USER_DELETE_FAIL,
      //The payload would then contain tht error messaged
      payload:
        error.response && error.response.data.message
          ? // Returning the error responce for the data
            error.response.data.message
          : // Or the normal error message
            error.message,
    });
  }
};

//An action should be created to update the user details
export const updateUser = (user) => async (dispatch, getState) => {
  // The updateUser will take in only one prop for the user, the user is the user information

  try {
    dispatch({
      // Then the user update request constant is dispatched
      type: USER_UPDATE_REQUEST,
    });
    //The user information is then fetched from the reducer state , this is used to check if the user is an admin or not
    const {
      userLogin: { userInfo },
    } = getState();

    // This is the configaration which is used for Post man
    const config = {
      // The post man API takes in the headers
      headers: {
        // First the Content type is applied in
        "Content-Type": "application/json",
        // Then the authorization is applied using the bearer token
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // once the authorization takes place , then the users are dispatched to the backend using the Axios request  api/user/userid
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);
    //once the users are bought in they have to dispatched to the reducer
    dispatch({ type: USER_UPDATE_SUCCESS });
    //once the users are bought in they have to dispatched to the reducer again with the data
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    // The error should now be dispatched
    dispatch({
      // The user update fail constant is then dipatched
      type: USER_UPDATE_FAIL,
      //The payload would then contain tht error messaged
      payload:
        error.response && error.response.data.message
          ? // Returning the error responce for the data
            error.response.data.message
          : // Or the normal error message
            error.message,
    });
  }
};
