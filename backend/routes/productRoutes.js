//This would be the routes file to the products routes
import express from "express";
//Express. js is a Node js web application server framework, which is specifically designed for building single-page, multi-page, and hybrid web applications
const router = express.Router();
//The routes is then set from express
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
//All the product controllers should be bought in
import { protect, admin } from "../middleware/authMiddleware.js";
//The protect and admin middleware should also be bought in

//The first route created should be protected to word the admin and registered users , it should create the product , and one shoud get the product
router.route("/").get(getProducts).post(protect, admin, createProduct);
//The second route created should be protected , meaning only the registred users can view them , it should create the product reviews
router.route("/:id/reviews").post(protect, createProductReview);
//The third route created should not protected as any one can view the top products , it should get the top products
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  //The products here are bought in by thier ID
  .delete(protect, admin, deleteProduct)
  //the delete deletes the product , should be admin only
  .put(protect, admin, updateProduct);
//this is a put request that should update a products information , only admin should do this

export default router;
//The router is then exported
