//This is the cart reducerwhere all the reducer fucntionality is done 
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";
//Importing the cart constants for the reducer

//A reducer for the cart should be made here
export const cartReducers = (
  //The cart reducer would take in the local state
  state = { cartItems: [], shippingAddress: {} },
  //The local state will have the cart items and shipping address inside it
  action
) => {
  //A switch statment should be made for all the constants that should be used
  switch (action.type) {
    // The first case is the add to cart constant
    case CART_ADD_ITEM:
      // The items would be bought in from the actions payload data
      const item = action.payload;

      //The existing items are found in the state
      const existItem = state.cartItems.find((x) => x.product === item.product);

      // if the there are existing items in the cart
      if (existItem) {
        //Replace the stste with the products alrady in the cart and remove the previoud
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
        //Else if the the items dont exixts in the cart then show the exisiting state and the items in side it
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    //The next case would be the remove items constant
    case CART_REMOVE_ITEM:
      return {
        // Keep the existing state and then filter that item which was meant to be deleted and remove the item
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    //The next case would be the saving the shipping address
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        //keep the existing state and get the shipping address from the action which was dispatched 
        ...state,
        shippingAddress: action.payload,
      };
      //The last case would be the save payment case which wouold save the payment address 
    case CART_SAVE_PAYMENT_METHOD:
      return {
        //getting the existing state
        ...state,
        //The payment method is getting fecthed from the actions data
        paymentMethod: action.payload,
      };
    default:
      //Returning the default state 
      return state;
  }
};
