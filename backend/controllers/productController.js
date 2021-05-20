//This file would act as the productController , so it would get the requests from the actions and send them or dispacth them to the routes
import asyncHandler from "express-async-handler";
//Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers
import Product from "../models/productModel.js";
//getting the product model

//@description of this controller   Fetch all products
//@The route of the controller  GET /api/products
//@the access to this controller should be public , meaning any one see the products
const getProducts = asyncHandler(async (req, res) => {
  //The getProducts controller would be async which takes the request and responce object in
  const pageSize = 8;
  //The page size is set here
  const page = Number(req.query.pageNumber) || 1;
  //The page , is more that 8 put the page nuber divided by 8 or then 1

  //The keyword should be here , keyword should be set for the search functionlity
  const keyword = req.query.keyword
    ? //If there was a word in the search bar
      {
        //Then take that keyword in to the name
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : //Or keep it empty
      {};

  //th count is set to the products to count the document s with the keyword in place
  const count = await Product.countDocuments({ ...keyword });
  //The products are now bought in from the find method using the keyword limiting the page sizes
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  //then the products , pages , page are cent to the responce object
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@description of this controller Fetch single product
//@The route of the controller  GET /api/products/:id
// @the access to this controller should be public
const getProductById = asyncHandler(async (req, res) => {
  //The getProductById controller would be async which takes the request and responce object in
  const product = await Product.findById(req.params.id);
  //The product will the find the user id by the request object and fill in the type of user, name , and email
  if (product) {
    //if the order is true then
    //SEND THE product TO THE RESPONCE OBJECT , WHICH MEANS TO SHOW THE ORDER IN THE
    res.json(product);
  } else {
    //else send the 404 : Not found request
    res.status(404);
    //And show a message saying the orders were not found
    throw new Error("Product not found");
  }
});

//@description of this controller   Delete a product
//@The route of the controller  GET /api/products/:id
// @the access to this controller should be private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  //The deleteProduct controller would be async which takes the request and responce object in
  const product = await Product.findById(req.params.id);
  //The product will the find the user id by the request object
  //if the product is true then
  if (product) {
    //the product should be removed in the system
    await product.remove();
    //SEND THE product TO THE RESPONCE OBJECT , WHICH MEANS remove the product
    res.json({ message: "Product removed" });
  } else {
    //else send the 404 : Not found request
    res.status(404);
    //And show a message saying the orders were not found
    throw new Error("Product not found");
  }
});

// @description of this controller Create a product
// @The route of the controller is to   POST /api/products
// @the access to this controller should be private/Admin
const createProduct = asyncHandler(async (req, res) => {
  //The createProduct controller would be async which takes the request and responce object in
  //The new product should be created
  const product = new Product({
    //The name of the product
    name: "Sample name",
    //The price of the product , which should be 0 by default
    price: 0,
    //The user id of the product
    user: req.user._id,
    //the image of the product
    image: "/images/sample.jpg",
    //The brand of the product
    brand: "Sample brand",
    //The category of the product
    category: "Sample category",
    //The count in stock of the product, default should be 0
    countInStock: 0,
    //The number of review of the products , default should be 0
    numReviews: 0,
    //The description of the product
    description: "Sample description",
  });
  //The product is then saved
  const createdProduct = await product.save();
  //a 201 status is then given : meaning the created successfully
  res.status(201).json(createdProduct);
});

// @description of this controller    Update a product
// @The route of the controller    PUT /api/products/:id
// @the access to this controller should be private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  //The updateProduct controller would be async which takes the request and responce object in
  const {
    //The name of the product
    name,
    //The price of the product
    price,
    //The description of the product
    description,
    //The image of the product
    image,
    //The brand of the product
    brand,
    //The category of the product
    category,
    //The count un stock of the product
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);
  //The product will the find the user id by the request object and fill in the type of user, name , and email

  if (product) {
    product.name = name;
    //The product name is assigned
    product.price = price;
    //The product price should be assigned
    product.description = description;
    //The product description should be assigned
    product.image = image;
    //The product image should be assigned
    product.brand = brand;
    //The product brand should be assigned
    product.category = category;
    //The product category should be assigned
    product.countInStock = countInStock;
    //The product count in stock should be assigned

    //The product is then saved
    const updatedProduct = await product.save();
    //SEND THE updatedProduct TO THE RESPONCE OBJECT , WHICH MEANS TO SHOW THE ORDER IN THE
    res.json(updatedProduct);
  } else {
    //else send the 404 : Not found request
    res.status(404);
    //And show a message saying the orders were not found
    throw new Error("Product not found");
  }
});

// @description of this controller    Create new review
// @The route of the controller is to  POST /api/products/:id/reviews
// @the access to this controller should be private/Admin
const createProductReview = asyncHandler(async (req, res) => {
  //The createProductReview controller would be async which takes the request and responce object in
  const { rating, comment } = req.body;
  //The rating and comment of the product are bought in from thr request of the body

  const product = await Product.findById(req.params.id);
  //The product will the find the user id by the request object and fill in the type of user, name , and email

  //if the product is true
  if (product) {
    //Then assign the products review if they user already reviewd the specific product then
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    //If the user alredy reviewed the product
    if (alreadyReviewed) {
      //Give a 400 Bad Request
      res.status(400);
      //And show a message saying the products were alraedy reviewed
      throw new Error("Product already reviewed");
    }

    //The review is created
    const review = {
      //The name of user who madde the review
      name: req.user.name,
      //The rating of the user given
      rating: Number(rating),
      //The comment of the user
      comment,
      //The users identification number
      user: req.user._id,
    };

    //The reviews of the products are pushed
    product.reviews.push(review);
    //The length of the products reviews
    product.numReviews = product.reviews.length;

    //The product reviews should be made here
    product.rating =
      //The products rating are measured , by adding the rating in
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    //The products are then saved to
    await product.save();
    //Then a 201 request it sent : 201 is a added request
    res.status(201).json({ message: "Review added" });
    //Then the message is created
  } else {
    //else send the 404 : Not found request
    res.status(404);
    //And show a message saying the orders were not found
    throw new Error("Product not found");
  }
});

// @description of this controller    Get top rated products
// @The route of the controller is to    GET /api/products/top
// @the access to this controller should be public
const getTopProducts = asyncHandler(async (req, res) => {
    //The getTopProducts controller would be async which takes the request and responce object in 
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  //The top products are sorted on the top three , which limits to 3
    //SEND THE products TO THE RESPONCE OBJECT , WHICH MEANS TO SHOW THE ORDER IN THE 
  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
//Then all the controllers would be sent to the routes

