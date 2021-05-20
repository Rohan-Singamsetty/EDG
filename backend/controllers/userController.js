//This file would act as the usercontroller , so it would get the requests from the actions and send them or dispacth them to the routes
import asyncHandler from "express-async-handler";
//Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers
import generateToken from "../utils/generateToken.js";
//The token for fetching a user is bought in
import User from "../models/userModel.js";
//getting the user model

//@@description of this controller Auth user & get token
//@The route of the controller  POST/api/users/login
//@the access to this controller should be Public
const authUser = asyncHandler(async (req, res) => {
  //The authUser controller would be async which takes the request and responce object in
  const { email, password } = req.body;
  //The email and password should be bought in from the body

  const user = await User.findOne({ email });
  //User should be find by the email

  //If the user is true and the passwords matched the password in the database, the data of the user is bought in
  if (user && (await user.matchPassword(password))) {
    res.json({
      //The id of the id
      _id: user._id,
      //The name of the user
      name: user.name,
      //The email of the user
      email: user.email,
      //The is admin of the user
      isAdmin: user.isAdmin,
      //A token generated for the user
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    //else send the 404 : Error fecthing data
    throw new Error("Invalid email or password");
    //And show a message saying invalid email
  }
});

//@description of this controller    Register a new user
//@The route of the controller  POST/api/users
//@the access to this controller should be public , meaning any one see the products
const registerUser = asyncHandler(async (req, res) => {
  //The registerUser controller would be async which takes the request and responce object in

  const { name, email, password } = req.body;
  //The name , email and password is bought in

  const userExists = await User.findOne({ email });
  //If existed users email is bought in

  //If the already exists
  if (userExists) {
    //Send in a 400 staus
    res.status(400);
    //And a message saying user alraedy exists
    throw new Error("User already exists");
  }

  const user = await User.create({
    //The new user is noe created
    name,
    //The name of the user
    email,
    //The email of the user is bought in
    password,
    //The password of the user is bought in
  });

  if (user) {
    //If the user is then bought in
    res.status(201).json({
      _id: user._id,
      //The user id
      name: user.name,
      //The user name
      email: user.email,
      //The email of the user
      isAdmin: user.isAdmin,
      //The isadmin field of the new user
      token: generateToken(user._id),
      //A new user token is created
    });
  } else {
    res.status(400);
    //else send the 404 : Not found request
    throw new Error("Invalid user data");
    //And show a message saying the user invalid data
  }
});

//@description of this controlle   GET user profile
//@The route of the controller    GET /api/users/profile
//@the access to this controller should be private
const getUserProfile = asyncHandler(async (req, res) => {
  //The getUserProfile controller would be async which takes the request and responce object in
  const user = await User.findById(req.user._id);

  if (user) {
    //when the useris found
    res.json({
      //The user id is bought in
      _id: user._id,
      //The name of the user
      name: user.name,
      //The name of the user
      email: user.email,
      //The email of the user
      isAdmin: user.isAdmin,
      //The users is admin field
    });
  } else {
    res.status(401);
    //else send the 404 : Not found request
    //And show a message saying the user were not found
    throw new Error("User not found");
  }
});

//@description of this controller   UPDATE user profile
//@The route of the controller  PUT /api/users/profile
//@the access to this controller should be private
const updateUserProfile = asyncHandler(async (req, res) => {
  //The updateUserProfile controller would be async which takes the request and responce object in
  const user = await User.findById(req.user._id);
  //The user will the find the user id by the request object

  //If the user is true
  if (user) {
    //The user name should be assigned
    user.name = req.body.name || user.name;
    //The user email is assigned
    user.email = req.body.email || user.email;
    //The password of the user is assigned
    if (req.body.password) {
      user.password = req.body.password;
    }

    //The updated users information is bought in
    const updatedUser = await user.save();

    //A responce object the should be sent to the user
    res.json({
      //The id of the updated user
      _id: updatedUser._id,
      //The name of the updated user
      name: updatedUser.name,
      //The email of the updated user
      email: updatedUser.email,
      //The is admin field of the updated user
      isAdmin: updatedUser.isAdmin,
      //A new token is then created
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    //else send the 401 : Not found request
    throw new Error("User not found");
    //And show a message saying the user were not found
  }
});

//@description of this controller GET all users
//@The route of the controller GET /api/users
//@the access to this controller should be  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  //The getUsers controller would be async which takes the request and responce object in

  const users = await User.find({});
  //The users are bought in
  res.json(users);
  //SEND THE users TO THE RESPONCE OBJECT , WHICH MEANS TO SHOW THE ORDER IN THE
});

//@description of this controller  Delete user
//@The route of the controller   DELETE /api/users/:ID
//@the access to this controller should be  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  //The deleteUser controller would be async which takes the request and responce object in
  const user = await User.findById(req.params.id);
  //The order will the find the user id by the request object

  //If the user is found , i.e. is true
  if (user) {
    //The user is then removed
    await user.remove();
    //then the user are sent to the responce object
    res.json({ message: "User removed" });
  } else {
    //else send the 404 : Not found request
    res.status(404);
    //And show a message saying the orders were not found
    throw new Error("User not found");
  }
});

//@description of this controller GET user by ID
//@The route of the controller GET /api/users/:id
//@the access to this controller should be  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  //The getUserById controller would be async which takes the request and responce object in
  const user = await User.findById(req.params.id).select("-password");
  //The user is the bought in by checking the matching password

  //If the user is true , meaning the user is in the database
  if (user) {
    //SEND THE user TO THE RESPONCE OBJECT , WHICH MEANS TO SHOW THE ORDER IN THE
    res.json(user);
  } else {
    //else send the 404 : Not found request
    res.status(404);
    //And show a message saying the orders were not found
    throw new Error("User not found");
  }
});

//@description of this controller UPDATE user
//@The route of the controller PUT /api/users/:id
//@the access to this controller Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  //The updateUser controller would be async which takes the request and responce object in
  const user = await User.findById(req.params.id);
  //The order will the find the user id by the request object

  //If the user is available
  if (user) {
    //The name of the user is bought in
    user.name = req.body.name || user.name;
    //The email of the user is bought in
    user.email = req.body.email || user.email;
    //The is admin value of the user is bought in
    user.isAdmin = req.body.isAdmin;

    //Then the updated user is saved in
    const updatedUser = await user.save();

    res.json({
      //The responce object would be sent in
      _id: updatedUser._id,
      //The id of the updated user
      name: updatedUser.name,
      //The name of the user
      email: updatedUser.email,
      //The email of the user
      isAdmin: updatedUser.isAdmin,
      //The is admin field of the admin
    });
  } else {
    res.status(401);
    //else send the 404 : Not found request
    throw new Error("User not found");
    //And show a message saying the users were not found
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
//Then all the controllers would be sent to the routes
