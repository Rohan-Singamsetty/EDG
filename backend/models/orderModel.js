//This is the order model file , the model file is the database model which is sent using the mongoose scehema model method
import mongoose from "mongoose";
//mongoose will be used as a tool  to connect the database , mongoose allows to create models and schemas for different resources in the database

//The order model should be created here
const orderSchema = mongoose.Schema(
  {
    //The user who ordered the product
    user: {
      //The type of user , it can be either the admin him self or the user
      //The user is set into the object id
      type: mongoose.Schema.Types.ObjectId,
      //The required should be set to true
      required: true,
      //the reference of the user should be set as user to identify them
      ref: "User",
    },
    //a field for the list of item the user ordered
    orderItems: [
      {
        //The name of the product , should be put as a string and required to be true
        name: { type: String, required: true },
        //The quantity of the product , should be put as a string and required to be true
        qty: { type: Number, required: true },
        //The image of the product , should be put as a string and required to be true
        image: { type: String, required: true },
        //The price of the product , should be put as a string and required to be true
        price: { type: Number, required: true },
        //The product of the product , should be put as a string and required to be true
        product: {
          //The product type should be set as a object
          type: mongoose.Schema.Types.ObjectId,
          //Required should be set to true
          required: true,
          //The reference of the product should be set to product
          ref: "Product",
        },
      },
    ],
    //a field for the shipping address of user who ordered the products
    shippingAddress: {
      //The address of the user , should be put as a string and required to be true
      address: { type: String, required: true },
      //The city of the user , should be put as a string and required to be true
      city: { type: String, required: true },
      //The postal code of the user , should be put as a string and required to be true
      postalCode: { type: String, required: true },
      //The country of the user , should be put as a string and required to be true
      country: { type: String, required: true },
    },
    //The payment method of the user
    paymentMethod: {
      //should be put as a string
      type: String,
      //required to be true
      required: true,
    },
    //The payment result of the user
    paymentResult: {
      //The id of the payment result , should be string , not required
      id: { type: String },
      //The status of the payment result , should be string , not required
      status: { type: String },
      //The update_time of the payment result , should be string , not required
      update_time: { type: String },
      //The email address of the payment result of the user , should be string , not required
      email_address: { type: String },
    },
    //The tax price of the order
    taxPrice: {
      //should be put as a number
      type: Number,
      //required to be true
      required: true,
      //The default value should be set to 0
      default: 0.0,
    },
    //The shipping price of the order
    shippingPrice: {
      //should be put as a number
      type: Number,
      //required to be true
      required: true,
      //The default value should be set to 0
      default: 0.0,
    },
    //The total price of the order
    totalPrice: {
      //should be put as a number
      type: Number,
      //required to be true
      required: true,
      //The default value should be set to 0
      default: 0.0,
    },
    //The is paid value of the order
    isPaid: {
      //should be put as a boolean value , true or false
      type: Boolean,
      //required to be true
      required: true,
      //The default value should be false
      default: false,
    },
    //The is paid at value of the order
    paidAt: {
      //The value should a date object
      type: Date,
    },
    //The is delivered value of the order
    isDelivered: {
      //should be put as a boolean value , true or false
      type: Boolean,
      //required to be true
      required: true,
      //The default value should be false
      default: false,
    },
    //The is deliveredAt value of the order
    deliveredAt: {
      //The value should a date object
      type: Date,
    },
  },
  {
    //Time stamps of the order , the time , date when the order was created 
    timestamps: true,
  }
);
//The order is now stored inside the Order constant
const Order = mongoose.model("Order", orderSchema);

//IT should be then exported to the controller 
export default Order;
