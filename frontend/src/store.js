//The store is where all the reducers are stored and are being used from the components and screens
import { createStore, combineReducers, applyMiddleware } from "redux";
//The create store ,combine reducers and middle ware is bought in from the redux
import thunk from "redux-thunk";
//Thunk is bought in redux thunx
import { composeWithDevTools } from "redux-devtools-extension";
//The dev tools are bougt in from the reduc dev tools extension
import {
  productListReducer,
  // The product list reducer is bought in
  productDetailsReducer,
  // The product list details reducer is bought in
  productDeleteReducer,
  // The product delete reducer is bought in
  productCreateReducer,
  // The product craete reducer is bought in
  productUpdateReducer,
  // The product update reducer is bought in
  productReviewCreateReducer,
  // The product review creater reducer is bought in
  productTopRatedReducer,
  // The product top rated  reducer is bought in
} from "./reducers/productReducers";
//The reducers for the products are bought here
import { cartReducers } from "./reducers/cartReducers";
//The cart reducer is bought in here
import {
  userLoginReducer,
  // The User login reducer is bought in
  userRegisterReducer,
  // The User register reducer is bought in
  userDetailsReducer,
  // The User details reducer is bought in
  userUpdateProfileReducer,
  // The update update profile list reducer is bought in
  userListReducer,
  // The User list reducer is bought in
  userDeleteReducer,
  // The User delete reducer is bought in
  userUpdateReducer,
  // The User update reducer is bought in
} from "./reducers/userReducers";
//The reducers for the user are bought in
import {
  orderCreateReducer,
  // The Order create reducer is bought in
  orderDetailsReducer,
  // The Order details reducer is bought in
  orderPayReducer,
  // The Order pay reducer is bought in
  orderListMyReducer,
  // The Order list my reducer is bought in
  orderListReducer,
  // The Order list reducer is bought in
  orderDeliverReducer,
  // The Order deliver reducer is bought in
} from "./reducers/orderReducer";
//The reducers for the order are made

//The reducers should be combined and assigned here
const reducer = combineReducers({
  productList: productListReducer,
  //The product list reducer is assigned here
  productDetails: productDetailsReducer,
  //The product details reducer is assigned here
  productDelete: productDeleteReducer,
  //The product delete reducer is assigned here
  productCreate: productCreateReducer,
  //The product create reducer is assigned here
  productUpdate: productUpdateReducer,
  //The product update reducer is assigned here
  productReviewCreate: productReviewCreateReducer,
  //The product review create reducer is assigned here
  productTopRated: productTopRatedReducer,
  //The product top rated reducer is assigned here
  cart: cartReducers,
  //The cart reducer is assigned here
  userLogin: userLoginReducer,
  //The user login reducer is assigned here
  userRegister: userRegisterReducer,
  //The user register reducer is assigned here
  userDetails: userDetailsReducer,
  //The user details reducer is assigned here
  userUpdateProfile: userUpdateProfileReducer,
  //The user update profile reducer is assigned here
  userList: userListReducer,
  //The user list reducer is assigned here
  userDelete: userDeleteReducer,
  //The user delete reducer is assigned here
  userUpdate: userUpdateReducer,
  //The user update reducer is assigned here
  orderCreate: orderCreateReducer,
  //The order create reducer is assigned here
  orderDetails: orderDetailsReducer,
  //The order details reducer is assigned here
  orderPay: orderPayReducer,
  //The order pay reducer is assigned here
  orderDeliver: orderDeliverReducer,
  //The order deliver reducer is assigned here
  orderListMy: orderListMyReducer,
  //The order list my reducer is assigned here
  orderList: orderListReducer,
  //The order  list reducer is assigned here
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? //The local storage state should be made for the cart items
    JSON.parse(localStorage.getItem("cartItems"))
  : //The json should parse the items and get the cart items from it
    [];
//Else get an empty storage

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? //The local storage state should be made for the user information
    JSON.parse(localStorage.getItem("userInfo"))
  : //The json should parse the user info and get the info of the user
    null;
//Else get return a null

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? //The local storage state should be made for the shipping address
    JSON.parse(localStorage.getItem("shippingAddress"))
  : //The json should parse the shipping address and return it
    {};
//Else get an empty storage

//Th inital state should be set
const initialState = {
  //The cart object should created here
  cart: {
    //The cartitems created above should be created here
    cartItems: cartItemsFromStorage,
    //The shipping address should be set and assigned here
    shippingAddress: shippingAddressFromStorage,
  },
  //The user login infrmation should be assigned here
  userLogin: { userInfo: userInfoFromStorage },
};

//The thunk should be assigned to the middlerware
const middleware = [thunk];

//The store should now be created
const store = createStore(
  //The store takes in the reducer
  reducer,
  //The inittal state
  initialState,
  //And lastly the dev tools
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
//The store should be sent to the index.js file
