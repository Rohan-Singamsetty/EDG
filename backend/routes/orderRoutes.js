//This would be the routes file to the order routes
import express from "express";
//Express. js is a Node js web application server framework, which is specifically designed for building single-page, multi-page, and hybrid web applications
const router = express.Router();
//The routes is then set from express
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js";
//All the order controllers should be bought in 
import { protect, admin } from "../middleware/authMiddleware.js";
//The protect and admin middleware should also be bought in 

//The first route created should be protected to word the admin and registered users , it should add orders into the system and get order to the system 
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
//The second route created should be protected , meaning only the registred users can view them , it should fetch the order details of that specific user
router.route("/myorders").get(protect, getMyOrders);
//The third route created should be protected , meaning only the registred users can view them , it should fetch the order details of that specific user using the user id 
router.route("/:id").get(protect, getOrderById);
//The fourth route created should be protected , meaning only the registred users can view them , should update the order to be paid when user pays 
router.route("/:id/pay").put(protect, updateOrderToPaid);
//The fifth route created should be protected to word the admin and registered users , it should update the orders to be delievered 
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
//The router is then exported 
