//This action is used for the orders , so creating orders , deleting orders , viewing orders, listing orders for specific users are done here
import axios from "axios";
// Axios is a promise based HTTP client for the browser , it makes asynchronous HTTP requests to REST end points and performs CRUD operations
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
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "../constants/orderConstants";
//The above constants are used for specific tasks throught the actions which are needed to performed to the reducers

//First action made in the orders actions is the createOrder acition
export const createOrder = (order) => async (dispatch, getState) => {
  // The createOrder will take in a order prop , the order prop will conatin information of the products and orders
  try {
    dispatch({
      // Then the order create request constant is dispatched
      type: ORDER_CREATE_REQUEST,
    });
    //The user information is then fetched from the reducer state , the user information is fetched to see which users order is placed
    const {
      // The user information
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

    // once the authorization takes place , then the orders are dispatched to the backend using the Axios request  api/orders
    const { data } = await axios.post(`api/orders`, order, config);

    //once the orders are bought in they have to dispatched to the reducer
    dispatch({
      // The Orders create success is first dispatched
      type: ORDER_CREATE_SUCCESS,
      //Then the payload containg the the orders information is dispatched
      payload: data,
    });
    //if the the data could not be dipatched an error should be showed
  } catch (error) {
    // The error should now be dispatched
    dispatch({
      // The Orders create fail constant is then dipatched
      type: ORDER_CREATE_FAIL,
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

// This action would fetch the order details of the user using the ID from the props
export const getOrderDetails = (id) => async (dispatch, getState) => {
  // This getOrderDetails action would have a id props value
  try {
    dispatch({
      // First in the try is done , where it would try to dispatch the order details to the reducer
      type: ORDER_DETAILS_REQUEST,
      // Above the request constant for the order details is dispatched
    });

    const {
      // The user information is bought in
      userLogin: { userInfo },
    } = getState();

    // This is the configaration which is used for Post man
    const config = {
      // The post man API takes in the headers
      headers: {
        // First the Content type is applied in
        Authorization: `Bearer ${userInfo.token}`,
        // Then the authorization is applied using the bearer token
      },
    };

    // once the authorization takes place , then the orders details are fetched using the Axios reuqets to the backend to the api/orders/id , here id stands for the users id
    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      // Once the data is brought in sucess constant for the order details constant is dispatched
      type: ORDER_DETAILS_SUCCESS,
      // The data would also be dispatched to the reducer, the data here is the order details which was bought in by the axios request
      payload: data,
    });
    //if the the data could not be dipatched an error should be showed
  } catch (error) {
    dispatch({
      // The Orders details fail constant is then dipatched
      type: ORDER_DETAILS_FAIL,
      //The payload would then contain that error messaged
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : // Returning the error responce for the data
            error.message,
      // Or the normal error message
    });
  }
};

//An action for the payment should be created
export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  // The payOrder will then take 2 props , one for the orderId and the other for the payment result which would be either true or false for now
  try {
    dispatch({
      // First the request constant for the order payment is dispatched as usual
      type: ORDER_PAY_REQUEST,
    });

    const {
      // The user information is bought in
      userLogin: { userInfo },
    } = getState();

    // The post man API takes in the headers
    const config = {
      // The post man API takes in the headers
      headers: {
        // First the Content type is applied in
        "Content-Type": "application/json",
        // Then the authorization is applied using the bearer token
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // once the authorization takes place , then the payment details  are dispatched to the backend using the Axios request  api/order/pay request
    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    //once the orders are bought in they have to dispatched to the reducer
    dispatch({
      // The Orders pay success constant is dispatched
      type: ORDER_PAY_SUCCESS,
      //Then the payload containg the the orders information is dispatched
      payload: data,
    });
    //if the the data could not be dipatched an error should be showed
  } catch (error) {
    // The error should now be dispatched
    dispatch({
      // The Orders create fail constant is then dipatched
      type: ORDER_PAY_FAIL,
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

//An action for the deliver order should be created
export const deliverOrder = (order) => async (dispatch, getState) => {
  // For the deliverOrder action , the order would be taken in as a prop
  try {
    dispatch({
      // Then the orders deliver request is first dispatched
      type: ORDER_DELIVER_REQUEST,
    });
    //The user information is then fetched from the reducer state , the user information is fetched to see which users order is placed
    const {
      // The user information
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

    // once the authorization takes place , then the deliver details  are dispatched to the backend using the Axios request  api/orders/ deliver
    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    );
    //once the order delivery details are bought in they have to dispatched to the reducer
    dispatch({
      // The Orders deliver success consant is then dispatched
      type: ORDER_DELIVER_SUCCESS,
      //Then the payload containg the the orders delivery details is dispatched
      payload: data,
    });
    //if the the data could not be dipatched an error should be showed
  } catch (error) {
    // The error should now be dispatched
    dispatch({
      // The Orders create fail constant is then dipatched
      type: ORDER_DELIVER_FAIL,
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

//An action for listing the orders of a specific user should be made
export const listMyOrders = () => async (dispatch, getState) => {
  //This action would not take in any props
  try {
    dispatch({
      // Then the list my orders constant is dispatched
      type: ORDER_LIST_MY_REQUEST,
    });
    //The user information is then fetched from the reducer state , the user information is fetched to see which users order is placed
    const {
      // The user information
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

    // once the authorization takes place , then the orders are dispatched to the backend using the Axios request  api/orders/myorders
    const { data } = await axios.get(`/api/orders/myorders`, config);

    //once the orders are bought in they have to dispatched to the reducer
    dispatch({
      // The list my orders consant of the success is first dispatched
      type: ORDER_LIST_MY_SUCCESS,
      //Then the payload containg the the orders information is dispatched
      payload: data,
    });
    //if the the data could not be dipatched an error should be showed
  } catch (error) {
    // The error should now be dispatched
    dispatch({
      // The Orders create fail constant is then dipatched
      type: ORDER_LIST_MY_FAIL,
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

//The last actions for thr orders is the to list all the order for the admin
export const listOrders = () => async (dispatch, getState) => {
  // Same as above this action will also not take props in
  try {
    dispatch({
      // Then the order list request constant is dispatched
      type: ORDER_LIST_REQUEST,
    });
    //The user information is then fetched from the reducer state , the user information is fetched to see which users order is placed
    const {
      // The user information
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

    // once the authorization takes place , then the list of orders are dispatched to the backend using the Axios request  api/orders
    const { data } = await axios.get(`/api/orders`, config);

    //once the orders list are bought in they have to dispatched to the reducer
    dispatch({
      // The Orders list success is first dispatched
      type: ORDER_LIST_SUCCESS,
      //Then the payload containg the the orders list is dispatched
      payload: data,
    });
    //if the the data could not be dipatched an error should be showed
  } catch (error) {
    // The error should now be dispatched
    dispatch({
      // The Orders create fail constant is then dipatched
      type: ORDER_LIST_FAIL,
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
