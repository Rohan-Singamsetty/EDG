//This screen is the profile screen of the user , here the user can edit thier username, email and password, along side can check thier order details in depth
import React, { useState, useEffect } from "react";
//Importing react elements into the functional component, By useEffect you can tell react that the component needs to do something after it renders, useState is used for component level state management
import { Table, Form, Button, Row, Col } from "react-bootstrap";
// Row and Col devides the web site into a CSS Grid type, Form and button are the basic form components, table is a normal bootstrap table
import { LinkContainer } from "react-router-bootstrap";
//link container is used to wrap elements inside the <LinkContainer> to make it behave like a Link
import { useDispatch, useSelector } from "react-redux";
//useSelector is used to feth the payload value from the reducer,The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions
import Message from "../components/Message";
//Fetching the message component
import Loader from "../components/Loader";
//Fetching the loader component
import { getUserDetails, updateUserProfile } from "../actions/userActions";
// getting the 2 actions from the userActions , one for the user details , one for when the user profile is updated
import { listMyOrders } from "../actions/orderActions";
//the list order action should also be bought in for the users

//This form takes in location(which is used to direct the user when they are logged in) and history(to push the user )
const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  // above is the component level state for storing name , stored in a empty string.
  const [email, setEmail] = useState("");
  // above is the component level state for storing email , stored in a empty string.
  const [password, setPassword] = useState("");
  // above is the component level state for storing password , stored in a empty string.
  const [confirmPassword, setConfirmPassword] = useState("");
  // above is the component level state for storing conform password , stored in a empty string.
  const [message, setMessage] = useState(null);
  // above is the component level state for storing error message , stored as nul default

  const dispatch = useDispatch();
  //The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  //User details should be bought in along side loading and error , details include thier name , email

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //userInfo should be bought in , userInfo is whether the user is an admin or not

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  // This success hits when the user profile as been updated

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;
  //The oderlist my gets the orders of that specific user

  useEffect(() => {
    if (!userInfo) {
      // if the user is not a registered user , push them to the login
      history.push("/login");
    } else {
      if (!user.name) {
        // if the name is not fetched , fetch it again from the action
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        // If everything is good , save the new name and email to the local state
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // if the passwords do not match then display a message saying passwords do not match
      setMessage("Passwords do not match");
    } else {
      // else update the new user information
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {/* so basically two colums would be made , in one column a small form and the other for the orders list  */}
        {message && <Message variant="danger">{message}</Message>}
        {/* if message is true, then display the  message, here message means password not match message */}
        {error && <Message variant="danger">{error}</Message>}
        {/* If error is true then show the error message on the screen */}
        {success && <Message variant="success">Profile Updated</Message>}
        {/* if the success is true show the updated message  */}
        {loading && <Loader />}
        {/* id loading is true , show the loader spinner */}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            {/* The Name heading of the form  */}
            <Form.Control
              type="name"
              placeholder="Enter name"
              // place holder of the form
              value={name}
              // value of the form , which is the previous user name
              onChange={(e) => setName(e.target.value)}
              // when change the name it stores it here in setName
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            {/* The Email heading of the form  */}
            <Form.Control
              type="email"
              placeholder="Enter email"
              // place holder of the form
              value={email}
              // value of the form , which is the previous user email
              onChange={(e) => setEmail(e.target.value)}
              // when change the email it stores it here in setEmail
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            {/* The password heading of the form  */}
            <Form.Control
              type="password"
              placeholder="Enter password"
              // place holder of the form
              value={password}
              // value of the form  password which is invissable
              onChange={(e) => setPassword(e.target.value)}
              // when change the password it stores it here in setPassword
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            {/* The Confirm password heading of the form  */}
            <Form.Control
              type="password"
              placeholder="Confirm password"
              // place holder of the form
              value={confirmPassword}
              // value of the form  second password which is invissable
              onChange={(e) => setConfirmPassword(e.target.value)}
              // when change the password it stores it here in setConfirmPassword
            ></Form.Control>
          </Form.Group>
          {/* Update button  */}
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        {/* Here the second column would be placed , here the orders list will be placed */}
        <h2>My Orders</h2>
        {/* The orders would be places */}
        {loadingOrders ? (
          // If the loading order is true then show the loader
          <Loader />
        ) : errorOrders ? (
          // if the error Orders is true then show the error message
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            {/* The tables should be a striped bordered table  */}
            <thead>
              <th>ID</th>
              {/* The id of the order */}
              <th>DATE</th>
              {/* The date of the order purchased */}
              <th>TOTAL</th>
              {/* The total price of the order */}
              <th>PAID</th>
              {/* The date of the paid order */}
              <th>DELIVERED</th>
              {/* The date of the order that would be delivered */}
              <th></th>
            </thead>
            <tbody>
              {/* The orders from reducer will be mapped */}
              {orders.map((order) => (
                <tr key={order._id}>
                  {/* The order id */}
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  {/* The order placed at date ina substring */}
                  <td>{order.totalPrice}</td>
                  {/* The total price of the orders*/}
                  <td>
                    {order.isPaid ? (
                      // If the order is paid show the paid at date
                      order.paidAt.substring(0, 10)
                    ) : (
                      // or show the "X" mark
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      // If the order is delivered show the delivered at date
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      // or show the "X" mark
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {/* Link container to the order details page  */}
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
//The profileScreen would now be exported to the App.js file 
