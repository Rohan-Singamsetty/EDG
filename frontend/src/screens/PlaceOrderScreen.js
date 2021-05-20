//The place order screen is the fourth step of the checkout step process, here the order details , the total price including the tax , and shipping should be calculated along side the payment method working fully interated pay pal sandbox
import React, { useEffect } from "react";
//Importing react elements into the functional component, By useEffect you can tell react that the component needs to do something after it renders
import { Link } from "react-router-dom";
//Link helps to turn normal steps into links
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
// Row and Col devides the web site into a CSS Grid type, Image, card and button are the basic form components.
import { useDispatch, useSelector } from "react-redux";
//useSelector is used to feth the payload value from the reducer,The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions
import Message from "../components/Message";
//Importing the message component
import CheckoutSteps from "../components/CheckoutSteps";
//Importing the checkout steps
import { createOrder } from "../actions/orderActions";
//The createOrder action stores the orders in side it

//History is to push a user
const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  //The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions

  const cart = useSelector((state) => state.cart);
  // getting the products which were present in the cart

  // Calculate prices, this is a helper method which would round up the prices , for example if the price of a product was 29.999999 , round up the value to 29.9
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // should calculate the price of the products in the cart
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // shipping price should only hit when the products price individually hit more than 100 pounds
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  // tax price should be calculated based on 15 % of the total products price
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  // the total price should display items price, the shipping price and the tax price
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  // the details of the order are fetched from the orderCreate reducer

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);
  // so if the order information is successful , then push the user to the order screen

  const placeOrderHandler = () => {
    // when the order has been made and payment is successful then dispatching the values of orderItem and prices to the createOrder action
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        // the products that the user buys
        shippingAddress: cart.shippingAddress,
        // The address of the user
        paymentMethod: cart.paymentMethod,
        // The payment methos selected
        itemsPrice: cart.itemsPrice,
        // The price of the products
        shippingPrice: cart.shippingPrice,
        //The price of the shipping
        taxPrice: cart.taxPrice,
        //The tax price
        totalPrice: cart.totalPrice,
        // The total price
      })
    );
  };

  return (
    <>
      {/* Checkout steps should be displayed on the top , this is the 4rth checkout step */}
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {/* Should first show the shipping address address which was entered in the second checkout step */}
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {/* The users city name and address*/}
                {cart.shippingAddress.postalCode}, {/* The users postel code */}
                {cart.shippingAddress.country}
                {/* The users country entered */}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              {/* Now the payment method should be displayed , the payment method that the user has inputted in the checkout step 3*/}
              <strong>Method: </strong>
              {/* The payment method that the user has selected */}
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {/* The ordered products the the user ordered should be listed here like the cart */}
              {cart.cartItems.length === 0 ? (
                // If the products are nill, show a message saying no products
                <Message>Your cart is empty</Message>
              ) : (
                // or else display the cart items below one by one
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          {/* The image of the cart items */}
                          <Image
                            src={item.image}
                            alt={item.name}
                            // The name of the products
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          {/* A link to the products information screen if clicked on it  */}
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {/* the product price depending apon the quantity of products */}
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
            <ListGroup variant="flush">
              <ListGroup.Item>
                {/* The order summary on the 2nd column of the page */}
                <h2>Order Summary</h2>
                {/* An order summary title should appear here */}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  {/* The cost of the total items that the user bought */}
                  <Col>£{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  {/* The shipping cost of the product that the user has bought  */}
                  <Col>£{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  {/* The tax price of the products that the user bought  */}
                  <Col>£{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  {/* The total price of the products including the tax price, shipping price and products price*/}
                  <Col>£{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {/* The error message is showed now  when an error is showed*/}
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                  // When the place order is pressed the placeOrder handler is pressed
                >
                  {" "}
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
//The PlaceOrderScreen is exported to app.js
