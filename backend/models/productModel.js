//This is the product model file , the product file is the database model which is sent using the mongoose scehema model method
import mongoose from "mongoose";
//mongoose will be used as a tool  to connect the database , mongoose allows to create models and schemas for different resources in the database

//The reviews schema should be created now
const reviewSchema = mongoose.Schema(
  {
    //Name of the user who gives the review, required is set to true
    name: { type: String, required: true },
    //rating of the user who gives the review, required is set to true
    rating: { type: Number, required: true },
    //comment of the user who gives the review, required is set to true
    comment: { type: String, required: true },
    //user type  of the user who gives the review, required is set to true
    user: {
      //The user value would be set as a object model
      type: mongoose.Schema.Types.ObjectId,
      //Required would be set to true
      required: true,
      //The reference of the user is USER
      ref: "User",
    },
  },
  {
    //Time stamps of the review , the time , date when the review was created
    timestamps: true,
  }
);

//The product model should be created here
const productSchema = mongoose.Schema(
  {
    //The type of the user of the product
    user: {
      //The user type is set with the object id
      type: mongoose.Schema.Types.ObjectId,
      //The user is required true
      required: true,
      //The reference of the user is set to true
      ref: "User",
    },
    //The name of the product
    name: {
      //should be put as a string
      type: String,
      //required to be true
      required: true,
    },
    //The image of the product
    image: {
      //should be put as a string
      type: String,
      //required to be true
      required: true,
    },
    //The brand of the product
    brand: {
      //should be put as a string
      type: String,
      //required to be true
      required: true,
    },
    //The category of the product
    category: {
      //should be put as a string
      type: String,
      //required to be true
      required: true,
    },
    //The description of the product
    description: {
      //should be put as a string
      type: String,
      //required to be true
      required: true,
    },
    //The reviews of the product are set to the reviews schema
    reviews: [reviewSchema],
    //The rating of the product
    rating: {
      type: Number,
      //should be put as a number
      required: true,
      //required to be true
      default: 0,
      //default should be 0
    },
    //The number of reviews  of the product
    numReviews: {
      //should be put as a number
      type: Number,
      //required to be true
      required: true,
      //default should be 0
      default: 0,
    },
    //The price of the product
    price: {
      //should be put as a number
      type: Number,
      //required to be true
      required: true,
      //default should be 0
      default: 0,
    },
    //The count in stock  of the product
    countInStock: {
      //should be put as a number
      type: Number,
      //required to be true
      required: true,
      //default should be 0
      default: 0,
    },
  },
  {
        //Time stamps of the product , the time , date when the product was created 
    timestamps: true,
  }
);
//The product is now stored inside the Product constant
const Product = mongoose.model("Product", productSchema);

//IT should be then exported to the controller 
export default Product;
