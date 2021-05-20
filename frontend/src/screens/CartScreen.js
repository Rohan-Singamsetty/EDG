//The cart is a shopping cart , here users add products into it , the cart is unlimited , it also allows users to remove items from it and displays the total price of the items
import React, { useEffect } from "react";
//Importing react elements into the functional component, By useEffect you can tell react that the component needs to do something after it renders
import { Link } from "react-router-dom";
//Provides declarative , accessible navigation around the application
import { useDispatch, useSelector } from "react-redux";
// useDispatch and useSelector are react hooks
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
//Above are all components from bootstrap , row and column are used to grid the components , and the rest are regular
import Message from "../components/Message";
//the error message is being exported
import { addtoCart, removeFromCart } from "../actions/cartActions";
//  Add to cart is an action which adds the items the user selects into the local cart state , removeFromCart removes the item from the local cart state

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  //Here the the id of the product would be noted down

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  //QTY represents the number of items present in the cart

  const dispatch = useDispatch();
  //The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  //The selector gets all the products from the reeducer and stores in the same name as cart , cartItems is the payloads with all the products

  useEffect(() => {
    if (productId) {
      dispatch(addtoCart(productId, qty));
    }
    //use effect gets hit when one or more instances are touched , here if the product has an id then only it would be added to the basket
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    //this is the hanlder which would remove items from thw cart , it basically hits the removeFromCart action
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
    //after the cart is ready , a user can proceed to checkout , when they press the proceed to checkout button this would get hit and redirect them to the address form
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {/* the below statment indicates when the cart is empty it would display or show the message  */}
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty<Link to="/"> Go Back</Link>
            {/* When the cart is empty or not, the button is shown which should be clicked when want to return to home screen  */}
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              // So here the cartItem is being mapped , think of that as an arraw and were fetching data from it
              <ListGroup.Item key={item.product}>
                {/* ListGroup will get assigned an id of the item */}
                <Row>
                  <Col md={2}>
                    {/* The small image is placed of the product here */}
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    {/* Whwn clicked on the product , it should direct the users to that specific product screen */}
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  {/* The item price is should be displayed but in a small size */}
                  <Col md={2}>£{item.price}</Col>
                  {/* Here a small dropdown should be displayed , the drop down should contain the how much the quantity is left so that the user can add more of that specific products into the cart */}
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addtoCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {/* so below arrays the count in stock of that product and maps it in the drop down list */}
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  {/* A trah icon should be put here in the future so that the user can remove the product from the cart , for that another reducer and action should be written  */}
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                      // the above code takes the product as a prop and removes it from the cart permenantly
                    >
                      {/* /A trash icon should be put as well*/}
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {/* Beside the  cart list the subtotal and total quantity should be showed*/}
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                {/* above indicates the total Number of products in the cart, for example if the there is one product it should show only one product  */}
                items
              </h2>
              {/* Here the total price of the products should be displayed  */}£
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              {/* Here a button should be placed which when clicked should redirect a user to the checkout section , when the cart is empty the button should be disabled though */}
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
// The cart screen should now be exported to  app.js and the product description screen , so when the user clicks add to cart it should get added
