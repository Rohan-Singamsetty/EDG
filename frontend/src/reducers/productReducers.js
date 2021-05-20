//This reducer will contain the reducers of the products
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
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "../constants/productConstants";
//Importing the product constants for the reducer

//A reducer for listing the products for the home page should be made
export const productListReducer = (state = { products: [] }, action) => {
  //The productListReducer will take the action and an empty state
  switch (action.type) {
    //So a switch case has been started with all the cases
    //The first case is the product list request
    case PRODUCT_LIST_REQUEST:
      //when this case hits it returns loading true and returns the empty state of products
      return { loading: true, products: [] };
    //The second case is the success state
    case PRODUCT_LIST_SUCCESS:
      return {
        //Here loading would return false
        loading: false,
        //And lastly the payload with the data would be bought in from the action
        products: action.payload.products,
        pages: action.payload.pages,
        //And lastly the payload with the data would be bought in from the action  this is the pages
        page: action.payload.page,
      };
    //In the product fail case
    case PRODUCT_LIST_FAIL:
      //Loading would be false
      //and a payload would be passd with the error message from the action
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//A reducer for getting the products description should be made
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  //The productDetailsReducer will take the action and an empty state
  //So a switch case has been started with all the cases
  switch (action.type) {
    //The first case is the product details create request
    case PRODUCT_DETAILS_REQUEST:
      //when this case hits it returns loading true
      //and state
      return { loading: true, ...state };
    //The second case is the success state
    case PRODUCT_DETAILS_SUCCESS:
      //Success would return true
      //Here loading would return false
      //And lastly the payload with the data would be bought in from the action
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      //In the product fail case
      //Loading would be false
      //and a payload would be passd with the error message from the action
      return { loading: false, error: action.payload };
    default:
      //lastly the state is returned
      return state;
  }
};

//A reducer for the deleting a product should be made
export const productDeleteReducer = (state = {}, action) => {
  //The productDeleteReducer will take the action and an empty state
  switch (action.type) {
    //So a switch case has been started with all the cases
    //The first case is the product delete request
    case PRODUCT_DELETE_REQUEST:
      //when this case hits it returns loading true
      return { loading: true };
    //The second case is the success state
    case PRODUCT_DELETE_SUCCESS:
      //Here loading would return false
      //Success would return true
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      //Loading would be false
      //and a payload would be passd with the error message from the action
      return { loading: false, error: action.payload };
    default:
      //lastly the state is returned
      return state;
  }
};

//a reducer for creating the product should be made
export const productCreateReducer = (state = {}, action) => {
  //The productCreateReducer will take the action and an empty state
  switch (action.type) {
    //So a switch case has been started with all the cases
    //The first case is the product create request
    case PRODUCT_CREATE_REQUEST:
      //when this case hits it returns loading true
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      //The second case is the success state
      //Here loading would return false
      //Success would return true
      //And lastly the payload with the data would be bought in from the action
      return { loading: false, success: true, product: action.payload };
    //In the order fail case
    case PRODUCT_CREATE_FAIL:
      //Loading would be false
      //and a payload would be passd with the error message from the action
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      //lastly the state is returned
      return state;
  }
};

//A reducer to update a product should be made here
export const productUpdateReducer = (state = { product: {} }, action) => {
  //The productUpdateReducer will take the action and an empty state
  switch (action.type) {
    //So a switch case has been started with all the cases
    //The first case is the product update request
    case PRODUCT_UPDATE_REQUEST:
      //when this case hits it returns loading true
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      //The second case is the success state
      //Here loading would return false
      //Success would return true
      //And lastly the payload with the data would be bought in from the action
      return { loading: false, success: true, product: action.payload };
    //In the order fail case
    case PRODUCT_UPDATE_FAIL:
      //Loading would be false
      //and a payload would be passd with the error message from the action
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      //The update reset case would have an empty state of the products
      return { product: {} };
    default:
      //lastly the state is returned
      return state;
  }
};

//A reducer for the reviews of the product should be made
export const productReviewCreateReducer = (state = {}, action) => {
  //The productReviewCreateReducer will take the action and an empty state
  switch (action.type) {
    //So a switch case has been started with all the cases
    //The first case is the create review request
    case PRODUCT_CREATE_REVIEW_REQUEST:
      //when this case hits it returns loading true
      return { loading: true };
    //The second case is the success state
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      //Here loading would return false
      //Success would return true
      return { loading: false, success: true };
    //In the order fail case
    case PRODUCT_CREATE_REVIEW_FAIL:
      //Loading would be false
      //and a payload would be passd with the error message from the action
      return { loading: false, error: action.payload };
    //The last case is the reset
    case PRODUCT_CREATE_REVIEW_RESET:
      //It returns the empty state
      return {};
    default:
      //lastly the state is returned
      return state;
  }
};

//A reducer for getting the top rated products should be made
export const productTopRatedReducer = (state = { products: [] }, action) => {
  //The productTopRatedReducer will take the action and an empty state
  switch (action.type) {
    //So a switch case has been started with all the cases
    //The first case is the product top request
    case PRODUCT_TOP_REQUEST:
      //when this case hits it returns loading true
      return { loading: true, products: [] };
    //The second case is the success state
    case PRODUCT_TOP_SUCCESS:
      //Here loading would return false
      return { loading: false, products: action.payload };
    //And lastly the payload with the data would be bought in from the action
    case PRODUCT_TOP_FAIL:
      //In the order fail case
      //and a payload would be passd with the error message from the action
      return { loading: false, error: action.payload };
    default:
      //lastly the state is returned
      return state;
  }
};
