//This file would act as the orderController , so it would get the requests from the actions and send them or dispacth them to the routes
import asyncHandler from "express-async-handler";
//Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers
import Order from "../models/orderModel.js";
//getting the order model

//@description    Create new products
//@The route is a  POST /api/orders
//@access should be Private , meaning only the logged in user would be able to view it
//A controller to add the order details should be made
const addOrderItems = asyncHandler(async (req, res) => {
  //The addOrderItems would be async and take in the request and responce obhect
  const {
    //The constant that would be added is the order items
    orderItems,
    //The shipping adress of the user
    shippingAddress,
    //The payment method of the user
    paymentMethod,
    //The price of the items
    itemsPrice,
    //The tac price of the products
    taxPrice,
    //The shipping price of the products
    shippingPrice,
    //And lastly the total price of the products
    totalPrice,
    //This should be sent by the request object to the body
  } = req.body;

  //If there are there has been an order but there are no items in the order
  if (orderItems && orderItems.length === 0) {
    //Give a 400 Bad Request
    res.status(400);
    //Show an error saying no order items were there and return it
    throw new Error("No order items");
    return;
    //else get the order details and send it to the order
  } else {
    const order = new Order({
      orderItems,
      //The shipping adress of the user
      user: req.user._id,
      //The id of the user who placed the order
      shippingAddress,
      //Ths shipping address of the user
      paymentMethod,
      //The payment method of the user
      itemsPrice,
      //The items price of the products
      taxPrice,
      //The tax price of the products
      shippingPrice,
      //The shipping price of the products
      totalPrice,
      //The total price of the products
    });
    //Once the order details are gathered
    //The details of the orders should be passed to the a constant to send it to the route
    const createdOrder = await order.save();
    //then send a 201 status , 201 is created successfully status
    res.status(201).json(createdOrder);
  }
});

// @description is Get order by ID
// @The route of the controller is to  GET /api/orders/:id
// @the access to this controller should be private
//The controller should get the users id , thats why this a get request
const getOrderById = asyncHandler(async (req, res) => {
  //The getOrderById controller would be async which takes the request and responce object in
  const order = await Order.findById(req.params.id).populate(
    //The order will the find the user id by the request object and fill in the type of user, name , and email
    "user",
    "name email"
  );

  //if the order is true then
  if (order) {
    //SEND THE ORDER TO THE RESPONCE OBJECT , WHICH MEANS TO SHOW THE ORDER IN THE
    res.json(order);
  } else {
    //else send the 404 : Not found request
    res.status(404);
    //And show a message saying the orders were not found
    throw new Error("Order not found");
  }
});

// @description of this controller is to Update order to paid
// @The route of the controller is to   GET /api/orders/:id/pay
// @the access to this controller should be private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  //The updateOrderToPaid controller would be async which takes the request and responce object in
  const order = await Order.findById(req.params.id);
  //The order will the find the user id by the request object

  //If there is present
  if (order) {
    //Set the orders is paid to be truw
    order.isPaid = true;
    //Then set the orders paid at date to the date this request is sent
    order.paidAt = Date.now();
    //The payment result
    order.paymentResult = {
      id: req.body.id,
      //The id of the paid user
      status: req.body.status,
      //The HTTP status
      update_time: req.body.update_time,
      //The orders updated time
      email_address: req.body.payer.email_address,
      //The users email
    };

    //if the order is updated , then save in a a constant for it to be sent
    const updatedOrder = await order.save();
    //SEND THE UPDATED order TO THE RESPONCE OBJECT , WHICH MEANS TO SHOW THE ORDER IN THE
    res.json(updatedOrder);
  } else {
    //else send the 404 : Not found request
    res.status(404);
    //And show a message saying the orders were not found
    throw new Error("Order not found");
  }
});

// @description of this controller    Update order to delivered
// @the route of the controller  GET /api/orders/:id/deliver
// @the access to this controller should be private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  //The updateOrderToDelivered controller would be async which takes the request and responce object in
  const order = await Order.findById(req.params.id);
  //The order will the find the user id by the request object

  //if the order is true then
  if (order) {
    //Set the orderers delivered at to be true
    order.isDelivered = true;
    //And set the orders delivered at date to the date it has been marked
    order.deliveredAt = Date.now();

    //if the order is updated , then save in a a constant for it to be sent
    const updatedOrder = await order.save();
    //SEND THE updated order TO THE RESPONCE OBJECT , WHICH MEANS TO SHOW THE ORDER IN THE
    res.json(updatedOrder);
  } else {
    //else send the 404 : Not found request
    res.status(404);
    //And show a message saying the orders were not found
    throw new Error("Order not found");
  }
});

// @description of this controller    GET logged in user orders
// @The route of the controller   GET /api/orders/myorders
// @the access to this controller should be private
const getMyOrders = asyncHandler(async (req, res) => {
  //The getMyOrders controller would be async which takes the request and responce object in
  const orders = await Order.find({ user: req.user._id });
  //The order will the find the user id by the request object

  //SEND THE ORDER TO THE RESPONCE OBJECT , WHICH MEANS TO SHOW THE ORDER IN THE
  res.json(orders);
});

// @description of this controller    GET all orders
// @The route of the controller   GET /api/orders
// @the access to this controller should be private
const getOrders = asyncHandler(async (req, res) => {
  //The getOrders controller would be async which takes the request and responce object in
  const orders = await Order.find({}).populate("user", "id name");
  //The order will the find the user id by the request object and fill in the type of user and the id of the user
  //SEND THE ORDER TO THE RESPONCE OBJECT , WHICH MEANS TO SHOW THE ORDER IN THE
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
//Then all the controllers would be sent to the routes
