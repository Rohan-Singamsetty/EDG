//This action is used for the products , so creating products , editing products , listing products for the admin , getting the top products and deleting products
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "../constants/productConstants";
//The above constants are used for specific tasks throught the actions which are needed to performed to the reducers
import axios from "axios";
// Axios is a promise based HTTP client for the browser , it makes asynchronous HTTP requests to REST end points and performs CRUD operations


//An action should be created to list the products into the home screen
export const listProducts = (keyword = "", pageNumber = "") => async (
  // The listProducts will take in a keyword prop for the search box and page number prop for the pagination function
  dispatch
) => {
  try {
    // Then the product list request constant is dispatched
    dispatch({ type: PRODUCT_LIST_REQUEST });

    // once the authorization takes place , then the products are dispatched from the backend using the Axios request  api/product
    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    );

    //once the products are bought in they have to dispatched to the reducer
    dispatch({
      // The products list success is first dispatched
      type: PRODUCT_LIST_SUCCESS,
      //Then the payload containg the the product information is dispatched
      payload: data,
    });
    //if the the data could not be dipatched an error should be showed
  } catch (error) {
    // The error should now be dispatched
    dispatch({
      // The product list fail constant is then dipatched
      type: PRODUCT_LIST_FAIL,
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

//An action to list the product details of a single product should be made for the product description screen
export const listProductDetails = (id) => async (dispatch) => {
  // The listProductDetails will take in only one prop for the id , the id is the identification number of the product
  try {
    // Then the product details request constant is dispatched
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    // no authorization takes place as this is for every one , then the products details are dispatched from the backend using the Axios request api/products/id
    const { data } = await axios.get(`/api/products/${id}`);

    //once the products description are bought in they have to dispatched to the reducer
    dispatch({
      // The products details success is first dispatched
      type: PRODUCT_DETAILS_SUCCESS,
      //Then the payload containg the the product information is dispatched
      payload: data,
    });
    //if the the data could not be dipatched an error should be showed
  } catch (error) {
    // The error should now be dispatched
    dispatch({
      // The products details list fail constant is then dipatched
      type: PRODUCT_DETAILS_FAIL,
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

//An action for deleting the products should be created for the admin
export const deleteProduct = (id) => async (dispatch, getState) => {
  // The deleteProduct will take in only one prop for the id , the id is the identification number of the product
  try {
    dispatch({
      // Then the product delete request constant is dispatched
      type: PRODUCT_DELETE_REQUEST,
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

    // once the authorization takes place , then the products are deleted are dispatched to the backend using the Axios request  api/products/id
    await axios.delete(`/api/products/${id}`, config);

    //deleting the product should be dispatched
    dispatch({
      // The product delete success is first dispatched
      type: PRODUCT_DELETE_SUCCESS,
    });
    //if the the data could not be dipatched an error should be showed
  } catch (error) {
    // The error should now be dispatched
    dispatch({
      // The product delete fail constant is then dipatched
      type: PRODUCT_DELETE_FAIL,
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

//An action should be created , for creating a product only for admin
export const createProduct = () => async (dispatch, getState) => {
  // The createProduct will take no props in as this is creating a product
  try {
    dispatch({
      // Then the product create request constant is dispatched
      type: PRODUCT_CREATE_REQUEST,
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

    // once the authorization takes place , then the products are created and are dispatched to the backend using the Axios request  api/products
    const { data } = await axios.post(`/api/products`, {}, config);

    //creating the product should be dispatched
    dispatch({
      // The product create success is first dispatched
      type: PRODUCT_CREATE_SUCCESS,
      //Then the payload containg the the new product information is dispatched
      payload: data,
    });
    //if the the data could not be dipatched an error should be showed
  } catch (error) {
    // The error should now be dispatched
    dispatch({
      // The product create fail constant is then dipatched
      type: PRODUCT_CREATE_FAIL,
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

//An action for updating a product should be made , only admin should be able to do that
export const updateProduct = (product) => async (dispatch, getState) => {
  // The updateProduct will take in only one prop for the product , the product is the product information
  try {
    dispatch({
      // Then the product update request constant is dispatched
      type: PRODUCT_UPDATE_REQUEST,
    });

    //The user information is then fetched from the reducer state , this is used to check if the user is an admin or not
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
    // once the authorization takes place , then the products updated products are dispatched to the backend using the Axios request  api/products/id
    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );
    //updating the product should be dispatched
    dispatch({
      // The product update success is first dispatched
      type: PRODUCT_UPDATE_SUCCESS,
      //Then the payload containg the the updated product information is dispatched
      payload: data,
    });
    //if the the data could not be dipatched an error should be showed
  } catch (error) {
    // The error should now be dispatched
    dispatch({
      // The product update fail constant is then dipatched
      type: PRODUCT_UPDATE_FAIL,
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

//An action for creating a product review should be made
export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  // The createProductReview will take in two props , one for the product identificcation number and one for the review for that specific product
  try {
    dispatch({
      // Then the product create review request constant is dispatched
      type: PRODUCT_CREATE_REVIEW_REQUEST,
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
    // once the authorization takes place , then the reviews  are dispatched to the backend using the Axios request  api/products/id/review
    await axios.post(`/api/products/${productId}/reviews`, review, config);

    //creating the product reviews should be dispatched
    dispatch({
      // The product create success success is first dispatched
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    });
    //if the the data could not be dipatched an error should be showed
  } catch (error) {
    // The error should now be dispatched
    dispatch({
      // The product create review fail constant is then dipatched
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? // Returning the error responce for the data
            error.response.data.message
          : // Or the normal error message
            error.message,
    });
  }
};

//An action should be made to fetch the top listed products
export const listTopProducts = () => async (dispatch) => {
  // The listTopProducts will take no props in
  try {
    // Then the top products request constant is dispatched
    dispatch({ type: PRODUCT_TOP_REQUEST });
    //  then the top products are dispatched to the backend using the Axios request  api/products/top
    const { data } = await axios.get(`/api/products/top`);

    //getting the top  product should be dispatched
    dispatch({
      // The top products success is first dispatched
      type: PRODUCT_TOP_SUCCESS,
      //Then the payload containg the top product information is dispatched
      payload: data,
    });
    //if  the data could not be dipatched an error should be showed
  } catch (error) {
    // The error should now be dispatched
    dispatch({
      // The top products fail constant is then dipatched
      type: PRODUCT_TOP_FAIL,
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
