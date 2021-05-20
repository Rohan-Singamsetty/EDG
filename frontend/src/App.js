//This file app.js is resopnsible for displaying all the screen files onto the screen
import React from "react";
//Importing react elements into the functional component header file
//This is the file is where all the screens and components are stored for them to be displaye , later this file would be sent in to the index/js file for it to be displayed
import { BrowserRouter as Router, Route } from "react-router-dom";
//this is router which routes the components and screen from one place to another
import { Container } from "react-bootstrap";
//The container is bought in from react bootstrap
import Footer from "./components/Footer";
//importing the footer component onto the screen files
import Header from "./components/Header";
//importing the header component into all the screen files
import HomeScreen from "./screens/HomeScreen";
//The Home screen is bought in from the screens
import ProductScreen from "./screens/ProductScreen";
//The product screen is bought in from the screens
import CartScreen from "./screens/CartScreen";
//The cart screen is bought in from the screens
import LoginScreen from "./screens/LoginScreen";
//The login screen is bought in from the screens
import RegisterScreen from "./screens/RegisterScreen";
//The Register screen is bought in from the screens
import ProfileScreen from "./screens/ProfileScreen";
//The Profile screen is bought in from the screens
import ShippingScreen from "./screens/ShippingScreen";
//The shipping screen is bought in from the screens
import PaymentScreen from "./screens/PaymentScreen";
//The payment screen is bought in from the screens
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
//The place order screen is bought in from the screens
import OrderScreen from "./screens/OrderScreen";
//The  order screen is bought in from the screens
import UserListScreen from "./screens/UserListScreen";
//The user list screen is bought in from the screens
import UserEditScreen from "./screens/UserEditScreen";
//The user edit  screen is bought in from the screens
import ProductListScreen from "./screens/ProductListScreen";
//The product list screen is bought in from the screens
import ProductEditScreen from "./screens/ProductEditScreen";
//The product edit screen is bought in from the screens
import OrderListScreen from "./screens/OrderListScreen";
//The Order list screen is bought in from the screens
//screens

const App = () => {
  return (
    // The routes should be started from here
    <Router>
      <Header />
      {/* The header is placed outside the main tag as it should br present on all screens  */}
      <main className="py-3">
        <Container>
          {/* In the containers all the screens should be placed to be displayed */}
          <Route path="/order/:id" component={OrderScreen} />
          {/* the order screen should be placed here , the path should sent to the order's id  */}
          <Route path="/shipping" component={ShippingScreen} />
          {/* the shipping screen should be placed here , the path should sent to /shipping  */}
          <Route path="/payment" component={PaymentScreen} />
          {/* the shipping screen should be placed here , the path should sent to /payment  */}
          <Route path="/placeorder" component={PlaceOrderScreen} />
          {/* the place order screen should be placed here , the path should sent to /payment order  */}
          <Route path="/login" component={LoginScreen} />
          {/* the login screen should be placed here , the path should sent to /login  */}
          <Route path="/register" component={RegisterScreen} />
          {/* the register screen should be placed here , the path should sent to /register */}
          <Route path="/profile" component={ProfileScreen} />
          {/* the profile screen should be placed here , the path should sent to /profile */}
          <Route path="/product/:id" component={ProductScreen} />
          {/* the products screen should be placed here , the path should sent to the products identification  */}
          <Route path="/cart/:id?" component={CartScreen} />
          {/* the cart screen should be placed here , the path should sent to cart identification */}
          <Route path="/admin/userlist" component={UserListScreen} />
          {/* the user list screen should be placed here , the path should sent to admin to the user list */}
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          {/* the user edit screen should be placed here , the path should sent to admin to the user identification/ list*/}
          <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />
          {/* the product list screen should be placed here , the path should sent to admin to the product list , should be exact  */}
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListScreen}
            exact
          />
          {/* the product list screen should be placed here , the path should sent to admin to the product list  page, should be exact  */}
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          {/* the product edit screen should be placed here , the path should sent to admin to the product edit screen using the dentification number */}
          <Route path="/admin/orderlist" component={OrderListScreen} />
          {/* the order list screen should be placed here , the path should sent to admin to the order list */}
          <Route path="/search/:keyword" component={HomeScreen} exact />
          {/* the Home  screen should be placed here , the path should sent to the seach the keyword */}
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          {/* the Home scteen  should be placed here , the path should sent to the seach the pagenumber */}
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />
          {/* the Home screen  should be placed here , the path should sent to the seach the keyword and page number */}
          <Route path="/" component={HomeScreen} exact />
          {/* the Home screen  should be placed here , the path should sent to the home screem*/}
        </Container>
      </main>
      <Footer />
      {/* //Same as the header , the footer is placed outside the main tag at the bottom so that it is placed at the bottom of all the pages  */}
    </Router>
  );
};

export default App;
//Export the app to the index.js file to be displayed
