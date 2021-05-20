//The order screen is the screen returned after all the checkout steps are completed , the order proccess is the screen where the user is promted to pay the money in thier preffered payment selection that they choose before in the step 3
import React, { useState, useEffect } from "react";
//Importing react elements into the functional component, By useEffect you can tell react that the component needs to do something after it renders, useState is used for component level state management
import axios from "axios";
//The axios is used to make the payment method possible through
import { PayPalButton } from "react-paypal-button-v2";
//The paypal button is downloaded from react paypal
import { Link } from "react-router-dom";
//Link helps to turn normal steps into links
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
// Row and Col devides the web site into a CSS Grid type, Image, card and button are the basic form components.
import { useDispatch, useSelector } from "react-redux";
//useSelector is used to feth the payload value from the reducer,The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions
import Message from "../components/Message";
//Importing the message component
import Loader from "../components/Loader";
//Importing the loader component
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
//Getting the order deatils , the payment used by the user and the delivery of the order
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
//once the delivery and payment are done they should be updated accordingly for the next order

//The OrderScreen takes in location(which is used to direct the user when they are logged in) and history(to push the user )
const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;
  //Getting the id of the users order

  const [sdkReady, setSdkReady] = useState(false);
  // above is the component level state for storing sdk(used for debit and credit card services) , stored as default

  const dispatch = useDispatch();
  //The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  //above should get the order details of the user from the reducer , alon side whether it is loading or not

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  //The loading should be get from the order pay reducer, loading is the loading for the payment if it dosent work

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;
  // the users delivery details will be bought in from the orderDeliver reducer

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //lastly the users login infor should be bought in from the userLogin reducer

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    // if the page is not loading then add the decimals to the total price

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    // and round up the total prie so that no .999999 comes in
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    //for security purposes , if the user is not a registered user , push them back to the login screen

    //Below the paypal script should be displayed
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      // The paypal config number should be getched using axios get request
      const script = document.createElement("script");
      // The pay pal script api is then bought in the paypal offical website
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      //the client id is also bought in from the  the paypal login website
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
        //The sdk is then true when its not loading
      };
      document.body.appendChild(script);
      // The script is then loader
    };

    if (!order || successPay || successDeliver) {
      // if the payment, payment delievry is successful then the order payment reset and order delivery rest  should be pressed for the next ordwer
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      // when the payment has not been made the paypal window should be shown untill payment completed
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
        // Else then the paypal button should dissapear
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };
  // If the payment is successful then the order will bw paid by and will be marked in the orders list

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };
  //The the delievr handler will then dispatch the delivery details to the deliverOrder action

  return loading ? (
    <Loader />
  ) : // If loading is true the loader should be displayed
  error ? (
    // If the error is true the error should be displayed
    <Message variant="danger">{error}</Message>
  ) : (
    //else the order screen should be displayed
    <>
      <h1>Order {order._id}</h1>
      {/* The order id would be displayed as the heading of the screen */}
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              {/* The shipping address should be displayed here*/}
              <p>
                {/* The users name should be displayed here  */}
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                {/* The users email should be displayed here, as well as a mail link to the address */}
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>

              <p>
                {/* The shipping address is displayed here */}
                <strong>Address:</strong>
                {/* The shipping address */}
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {/* The shipping addressc city  */}
                {order.shippingAddress.postalCode},{" "}
                {/* The shipping address postal code */}
                {order.shippingAddress.country}
                {/* The shipping address country */}
              </p>
              {order.isDelivered ? (
                // If the order has been delivered display a message displaying the order has been delivered at this time and day
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                  {/* Delivered at  */}
                </Message>
              ) : (
                // If not delivered indicate that it has not been delivered
                <Message variant="danger"> Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              {/* The users preffered payment method should be displayed here*/}
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
                {/* The payment method */}
              </p>
              {order.isPaid ? (
                // If he order is paid display a paid on message along with the payment date and time
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                // if the order is not paid , display a message displaying the not paid
                <Message variant="danger"> Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {/* The ordered products the the user ordered should be listed here like the cart */}
              {order.orderItems.length === 0 ? (
                // If the products are nill, show a message saying no products
                <Message>Order is empty</Message>
              ) : (
                // or else display the cart items below one by one
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          {/* The image of the cart items */}
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          {/* // The name of the products */}
                          {/* The link to that specific product */}
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                            {/* The products name */}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {/* The price of the products measured by thier quantity  */}
                          {item.qty} x £{item.price} = £{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            {/* The order summary on the 2nd column of the page */}
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
                {/* An order summary title should appear here */}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  {/* The items price  */}
                  <Col>£{order.itemsPrice}</Col>
                  {/* The items price*/}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  {/* The shipping price  */}
                  <Col>Shipping</Col>
                  <Col>£{order.shippingPrice}</Col>
                  {/* The shipping price  */}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  {/* The tax price of the product */}
                  <Col>£{order.taxPrice}</Col>
                  {/* The price */}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  {/* The total price of the products in the system */}
                  <Col>£{order.totalPrice}</Col>
                  {/* The price */}
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                // If the orders price is  paid then the button should not be displayed
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {/* The loading should be displayed */}
                  {!sdkReady ? (
                    // if the sdk is not ready then the loader should be displayed
                    <Loader />
                  ) : (
                    // else the paypal button should be displayed
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {/* if the delievred item is not displayed then laoder should be displayed  */}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  // if order is not delivered then the button only to the admin should be showed to the
                  <ListGroup.Item>
                    {/* The the button should be displayed */}
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                      // the deliverHander will mark the order as delievred
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
// The OrderScreen is then exported to the app.js
