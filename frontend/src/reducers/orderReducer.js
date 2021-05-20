//This reducer will conatin all the order information including the images and more information
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
//Importing the order constants for the reducer

//A reducer should made for creating an order
export const orderCreateReducer = (state = {}, action) => {
  //The orderCreateReducerwill take the action and an empty state
  switch (action.type) {
    //So a switch case has been started with all the cases
    //The first case is the order create request
    case ORDER_CREATE_REQUEST:
      return {
        //when this case hits it returns loading true
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      //The second case is the success state
      return {
        //Here loading would return false
        loading: false,
        //Success would return true
        success: true,
        //And lastly the payload with the data would be bought in from the action
        order: action.payload,
      };
    //In the order fail case
    case ORDER_CREATE_FAIL:
      return {
        //Loading would be false
        loading: false,
        //and a payload would be passd with the error message from the action
        error: action.payload,
      };
    default:
      //lastly the state is returned
      return state;
  }
};

//A reducer should made for getting the order details
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  //The orderDetailsReducer take the state containing  the items and shipping address
  action
) => {
  switch (action.type) {
    //So a switch case has been started with all the cases
    //The first case is the order details request
    case ORDER_DETAILS_REQUEST:
      return {
        //when this case hits it returns loading true
        ...state,
        //And the exisiting state is returned
        loading: true,
      };
    //The second case is the success state
    case ORDER_DETAILS_SUCCESS:
      return {
        //Here loading would return false
        loading: false,
        //And lastly the payload with the data would be bought in from the action
        order: action.payload,
      };
    //In the order fail case
    case ORDER_DETAILS_FAIL:
      return {
        //Loading would be false
        loading: false,
        //and a payload would be passd with the error message from the action
        error: action.payload,
      };
    default:
      //lastly the state is returned
      return state;
  }
};

//A reducer should made for getting thr order payment
export const orderPayReducer = (state = {}, action) => {
  //The orderPayReducer take the action and an empty state
  switch (action.type) {
    //So a switch case has been started with all the cases
    //The first case is the order pay request
    case ORDER_PAY_REQUEST:
      return {
        //when this case hits it returns loading true
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      //The second case is the success state
      return {
        //Here loading would return false
        loading: false,
        //Success would return true
        success: true,
      };
    //In the order fail case
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        //Loading would be false
        error: action.payload,
        //and a payload would be passd with the error message from the action
      };
    //The last case is the order pay reset
    case ORDER_PAY_RESET:
      //Return the empty state
      return {};
    default:
      //lastly the state is returned
      return state;
  }
};

//A reducer for getting the order deliver details should be made
export const orderDeliverReducer = (state = {}, action) => {
  //The orderDeliverReducer take the action and an empty state
  switch (action.type) {
    //So a switch case has been started with all the cases
    //The first case is the order deliver request
    case ORDER_DELIVER_REQUEST:
      return {
        //when this case hits it returns loading true
        loading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      //The second case is the success state
      return {
        //Here loading would return false
        loading: false,
        //Success would return true
        success: true,
      };
    //In the order fail case
    case ORDER_DELIVER_FAIL:
      return {
        //Loading would be false
        loading: false,
        //and a payload would be passd with the error message from the action
        error: action.payload,
      };
    //The last case is the reset case
    case ORDER_DELIVER_RESET:
      //It should return the empty state
      return {};
    default:
      //lastly the state is returned
      return state;
  }
};

//A reducer is created to list the users specific order details
export const orderListMyReducer = (state = { orders: [] }, action) => {
  //The orderListMyReducer take the action and an empty state
  switch (action.type) {
    //So a switch case has been started with all the cases
    //The first case is the order list my request
    case ORDER_LIST_MY_REQUEST:
      return {
        //when this case hits it returns loading true
        loading: true,
      };
    case ORDER_LIST_MY_SUCCESS:
      //The second case is the success state
      return {
        //Here loading would return false
        loading: false,
        //Success would return true
        orders: action.payload,
        //And lastly the payload with the data would be bought in from the action
      };
    //In the order fail case
    case ORDER_LIST_MY_FAIL:
      return {
        //Loading would be false
        loading: false,
        //and a payload would be passd with the error message from the action
        error: action.payload,
      };
    //The lasy case is the reset case
    case ORDER_LIST_MY_RESET:
      return { orders: [] };
    //Returning the empty orders state
    default:
      //lastly the state is returned
      return state;
  }
};

//The last reducer to make is the orders list reducer for the admin
export const orderListReducer = (state = { orders: [] }, action) => {
  //The orderListReducer will take the action and an empty state
  switch (action.type) {
    //So a switch case has been started with all the cases
    //The first case is the order list request
    case ORDER_LIST_REQUEST:
      return {
        //when this case hits it returns loading true
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      //The second case is the success state
      return {
        //Here loading would return false
        loading: false,
        //And lastly the payload with the data would be bought in from the action
        orders: action.payload,
      };
    //In the order fail case
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        //Loading would be false
        error: action.payload,
        //and a payload would be passd with the error message from the action
      };
    default:
      //lastly the state is returned
      return state;
  }
};
