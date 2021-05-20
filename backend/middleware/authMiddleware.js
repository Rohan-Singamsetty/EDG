//Here the middle ware that should be used to authenticate the user should be made 
import jwt from "jsonwebtoken";
//The json web token is bought in here , the web token is created and assigned when ever a user is created
import asyncHandler from "express-async-handler";
//Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers
import User from "../models/userModel.js";
//Importing the user model with the user table inside 

//A controller should be made for handelling the requests protect request , it protects the route from unregistered users
const protect = asyncHandler(async (req, res, next) => {
  //The protect controller would be async which takes the request and responce object in

  let token;
  //The token should be assigned

  if (
    //If the user are authorized , authorized with the bearer token , then send the make a try and catch inside of it 
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //The try shoulf then get the token from the authorized user
      token = req.headers.authorization.split(" ")[1];
      //IT should then be decoded using the jwt secret from the .env file
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //The user is then found by verifing the users in side of it 
      req.user = await User.findById(decoded.id).select("-password");
      //The next should be returned for the next user
      next();
    } catch (error) {
      //If error exists then send in the errot to the console
      console.error(error);
      //send a not authorized HTTP request : 401
      res.status(401);
      //Show a message also saying that the token failed
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    //If the token is false , meaning not present , then send in a not auhorized HTTP request: 401
    res.status(401);
    //Throw a error meassage to say that no token in there
    throw new Error("Not authorized, no token");
  }
});

//A controller shuold be made for admin to connect with the routes
const admin = (req, res, next) => {
    //The admin controller would not be  async but takes the request and responce object and next obeject in

    //If the user that requests the APi route is an admin then 
  if (req.user && req.user.isAdmin) {
    //Push the user to the next process
    next();
  } else {
    //Else show a not authorized HTTP request : 401
    res.status(401);
    //Show the not authorized message , saying the user is not the admin 
    throw new Error("Not authorized as an admin");
  }
};

//Lastly export the authorization middleware to the routes for then to be used 
export { protect, admin };
