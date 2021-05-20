//This reducer will contain the reducers of the users
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_RESET,
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
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} from "../constants/userConstants";
//Importing the user constants for the reducer

//A reducer for making the user login should be made
export const userLoginReducer = (state = {}, action) => {
  //The userLoginReducer will take the action and an empty state
  switch (action.type) {
    //So a switch case has been started with all the cases
    //The first case is the user login request
    case USER_LOGIN_REQUEST:
      //when this case hits it returns loading true
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      //The second case is the success state
      //Here loading would return false
      //And lastly the payload with the data would be bought in from the action
      return { loading: false, userInfo: action.payload };
    //In the order fail case
    case USER_LOGIN_FAIL:
      //Loading would be false
      //and a payload would be passd with the error message from the action
      return { loading: false, error: action.payload };
    //The logout case
    case USER_LOGOUT:
      //Returns an empty state
      return {};
    default:
      //lastly the state is returned
      return state;
  }
};

//A reducer for the user register function should be made
export const userRegisterReducer = (state = {}, action) => {
  //The userRegisterReducer will take the action and an empty state

  switch (action.type) {
    //So a switch case has been started with all the cases
    //The first case is the user register request
    case USER_REGISTER_REQUEST:
      //when this case hits it returns loading true
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      //The second case is the success state
      //Here loading would return false
      //And lastly the payload with the data would be bought in from the action
      return { loading: false, userInfo: action.payload };
    //In the order fail case
    case USER_REGISTER_FAIL:
      //Loading would be false
      //and a payload would be passd with the error message from the action
      return { loading: false, error: action.payload };
    default:
      //lastly the state is returned
      return state;
  }
};

//A reducer for the users details should be made
export const userDetailsReducer = (state = { user: {} }, action) => {
  //The userDetailsReducer will take the action and an empty state
  switch (action.type) {
    //So a switch case has been started with all the cases
    //The first case is the user details request
    case USER_DETAILS_REQUEST:
      //when this case hits it returns loading true
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      //The second case is the success state
      //Here loading would return false
      //And lastly the payload with the data would be bought in from the action
      return { loading: false, user: action.payload };
    //In the order fail case
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    //Loading would be false
    //and a payload would be passd with the error message from the action
    case USER_DETAILS_RESET:
      //The user details reset case
      return { user: {} };
    default:
      //lastly the state is returned
      return state;
  }
};

//A reducer for updating the profile of the user should be made
export const userUpdateProfileReducer = (state = {}, action) => {
  //The userUpdateProfileReducer will take the action and an empty state
  switch (action.type) {
    //So a switch case has been started with all the cases
    //The first case is the user update profile request
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    //when this case hits it returns loading true
    case USER_UPDATE_PROFILE_SUCCESS:
      //The second case is the success state
      //Here loading would return false
      //Success would return true
      //And lastly the payload with the data would be bought in from the action
      return { loading: false, success: true, userInfo: action.payload };
    //In the order fail case
    case USER_UPDATE_PROFILE_FAIL:
      //Loading would be false
      //and a payload would be passd with the error message from the action
      return { loading: false, error: action.payload };
    default:
      //lastly the state is returned
      return state;
  }
};

//A reducer for listing the users should be made
export const userListReducer = (state = { users: [] }, action) => {
  //The userListReducer will take the action and an empty state
  switch (action.type) {
    //So a switch case has been started with all the cases
    //The first case is the user list request
    case USER_LIST_REQUEST:
      //when this case hits it returns loading true
      return { loading: true };
    //The second case is the success state
    case USER_LIST_SUCCESS:
      //Here loading would return false
      //And lastly the payload with the data would be bought in from the action
      return { loading: false, users: action.payload };
    //In the order fail case
    case USER_LIST_FAIL:
      //Loading would be false
      //and a payload would be passd with the error message from the action
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      //The user list reset case
      return { users: [] };
    default:
      //lastly the state is returned
      return state;
  }
};

//A reducer for deleting a user should be made
export const userDeleteReducer = (state = {}, action) => {
  //The userDeleteReducer will take the action and an empty state
  switch (action.type) {
    //So a switch case has been started with all the cases
    //The first case is the user delete request
    case USER_DELETE_REQUEST:
      //when this case hits it returns loading true
      return { loading: true };
    //The second case is the success state
    case USER_DELETE_SUCCESS:
      //Here loading would return false
      //Success would return true
      return { loading: false, success: true };
    //In the order fail case
    case USER_DELETE_FAIL:
      //Loading would be false
      //and a payload would be passd with the error message from the action
      return { loading: false, error: action.payload };
    default:
      //lastly the state is returned
      return state;
  }
};

//A reducer for updating a user should be made
export const userUpdateReducer = (state = { user: {} }, action) => {
  //The userUpdateReducer will take the action and an empty state
  switch (action.type) {
    //So a switch case has been started with all the cases
    //The first case is the user update request
    case USER_UPDATE_REQUEST:
      //when this case hits it returns loading true
      return { loading: true };
    //The second case is the success state
    case USER_UPDATE_SUCCESS:
      //Success would return true
      //Here loading would return false
      return { loading: false, success: true };
    //In the order fail case
    case USER_UPDATE_FAIL:
      //Loading would be false
      //and a payload would be passd with the error message from the action
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      //The user update reser
      return {
        //return the empty state
        user: {},
      };
    default:
      //lastly the state is returned
      return state;
  }
};
