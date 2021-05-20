//This action is used for the cart , so adding products , deleting products and saving shipping address and saving the payment method takes place here 
import axios from "axios";
// Axios is a promise based HTTP client for the browser , it makes asynchronous HTTP requests to REST end points and performs CRUD operations 
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";
// Above are cart constants that are fetched in from the Cart consts.js file 

//The first action to be made is add items to cart 
export const addtoCart = (id, qty) => async (dispatch, getState) => {
  // The cart action will make async requests , it takes in two props which are id and quantity of the products 
  const { data } = await axios.get(`/api/products/${id}`);
  // The axios request is made to the api/products route giving the id of the products 

  dispatch({
    // Then the cart add item constant is dispatched to the reducer
    type: CART_ADD_ITEM,
    // The payload will also be dispatched , the payload will contain the product id , product name , product image and the remainig information 
    payload: {
      product: data._id,
      // The product id
      name: data.name,
      // The product name
      image: data.image,
      //The product image
      price: data.price,
      // The product price
      countInStock: data.countInStock,
      // The product count in stock
      qty,
      // The quantity 
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  // Then the local storage will set the items selected by the user into the cart 
};

//The remove from cart action should be created below
export const removeFromCart = (id) => (dispatch, getState) => {
  // Thw removeFromCart takes in the id of the product to be removes from the cart
  dispatch({
    // the action will then dispatch the cart remove item constant and a payload conating the product identification number
    type: CART_REMOVE_ITEM,
    payload: id,
    // The payload should be placed here
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  // The local storage will now show the updated cart products into the cart 
};

//An action for saving the shipping address should be created 
export const saveShippingAddress = (data) => (dispatch) => {
  // The saveShipping adress constant should take in the data of the shipping address form
  dispatch({
    // The carts save shipping address constant is dispatched 
    type: CART_SAVE_SHIPPING_ADDRESS,
    //The payload containg the shipping address form data to the reducer
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
  // Now the local store state will now save the shipping address data for future uses
};

//Another action should be created to store the payment method details into it 
export const savePaymentMethod = (data) => (dispatch) => {
  // The savePaymentMethod will take in a data prop , the data prop will contain the users selected payment method inside it 
  dispatch({
    //Then the carts save peyment method constant would be dispatched 
    type: CART_SAVE_PAYMENT_METHOD,
    //The payload will also be dispathed containing the users preffered payment method to the reducer
    payload: data,
  });
  //lastly the local store will now save the users preffered payment method for users future usage 
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
