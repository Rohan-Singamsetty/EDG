//This would be the routes file to the user routes
import express from "express";
//Express. js is a Node js web application server framework, which is specifically designed for building single-page, multi-page, and hybrid web applications
const router = express.Router();
//The routes is then set from express
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
//All the user controllers should be bought in
import { protect, admin } from "../middleware/authMiddleware.js";
//The protect and admin middleware should also be bought in

//The first route created should be protected to word the admin and registered users , it should get the users and register a user
router.route("/").post(registerUser).get(protect, admin, getUsers);
//The second route created should be protected to word the admin and registered users , login an authorized user
router.post("/login", authUser);
router
  .route("/profile")
  //The third route created should be protected and get the users profile
  .get(protect, getUserProfile)
  //And get the updated users profile
  .put(protect, updateUserProfile);
router
  .route("/:id")
  //The fourth route created should be protected to word the admin and registered users , it should delete a user
  .delete(protect, admin, deleteUser)
  //The fourth route created should be protected to word the admin and registered users , it should get a user by id
  .get(protect, admin, getUserById)
  //The fourth route created should be protected to word the admin and registered users , it should update a user
  .put(protect, admin, updateUser);

export default router;
//The router is then exported
