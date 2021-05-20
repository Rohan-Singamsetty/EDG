//This is the product description screen , this screen will contain information about the product , like description , price reviews and add in cart and more
import React, { useEffect, useState } from "react";
//Importing react elements into the functional component, By useEffect you can tell react that the component needs to do something after it renders, useState is used for component level state management
import { Link } from "react-router-dom";
//Provides declarative , accessible navigation around the application
import { useDispatch, useSelector } from "react-redux";
//useSelector is used to feth the payload value from the reducer,The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
//The bootstrap elements are bought in from the react bootstrap
import Rating from "../components/Rating";
//The rating component is bought in
import Loader from "../components/Loader";
//Fetching the loader component
import Message from "../components/Message";
//Fetching the message component
import Meta from "../components/Meta";
//The meta is bought in
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
// The list product details and create product reviews should be bought in
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
// Product review reset costant should be bought in

//This screen takes in location(which is used to direct the user when they are logged in) and history(to push the user )
const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  // above is the component level state for storing quantity, default to be 1
  const [rating, setRating] = useState(0);
  // above is the component level state for storing rating , default to 0
  const [comment, setComment] = useState("");
  // above is the component level state for storing comment , stored in a empty string.

  const dispatch = useDispatch();
  //The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  // fetches all the product deatils including the loading and error details from the reducer

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //userInfo should be bought in , userInfo is whether the user is an admin or not

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;
  // loading, error and success of when the product review is created

  useEffect(() => {
    if (successProductReview) {
      // if the product review is put in then make an alert saying review submitted and set the rating and comment back to 0
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      // dispatch the constant
    }
    dispatch(listProductDetails(match.params.id));
    // list the product details after the review is submitted
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  //Add to cart pushes the user to the cart

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
  // This submithandler is pushed when a review is added into the product system

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        {/* To go back to the home screen a back button should be put */}
        Go Back
      </Link>
      {loading ? (
        // If loading is true then show the loader
        <Loader />
      ) : error ? (
        // If message is true show the error message 
        <Message variant="danger">{error} </Message>
      ) : (
        // no loader , no message , then show the remaining
        <>
          <Meta title={product.name} />
          {/* The tile would be the product name */}
          <Row>
            <Col md={6}>
              {/*Three coulmns , the first column with image and alt is the name  */}
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  {/* The product name should be shown in the second column */}
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                  // The rating of the product should be shown below 
                    value={product.rating}
                    // The value of the rating is applied here
                    text={`${product.numReviews} reviews`}
                    // The number of reviews is displayed here
                  />
                </ListGroup.Item>
                {/* The price if the products is displayed here */}
                <ListGroup.Item>Price: £{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  {/* The description of the product should here */}
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              {/* The last column should display the add to cart button , stock, price and quantity */}
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      {/* The price of the product */}
                      <Col>Price:</Col>
                      <Col>
                        <strong>£{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      {/* The status of the product */}
                      <Col>
                      {/* if the product is in stock , show in stock or show out of the stock */}
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    // the below is the quatity of the product
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        {/*  PRODUCT QUANTITY */}
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            // On count set the the set quantity value 
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                                // Array the drop down list with how many products are there in the system
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                    // This is the ass to cart button which add the product in to the basket , if no stock of the product then the button should be disabled 
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                    {/* Add to cart button */}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {/* IN the first column below the big image the reviews component should be showed*/}
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              {/* If reviews are 0 then show no reviews message*/}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  // If reviews are present then map the reviews 
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    {/* The name of the user who game the review*/}
                    <Rating value={review.rating} />
                    {/* The value of the rating , which is onethe scale of 1 to 5 */}
                    <p>{review.createdAt.substring(0, 10)}</p>
                    {/* The date of the review created */}
                    <p>{review.comment}</p>
                    {/* The comment of the user who gave the review */}
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {/* A small form should be created to enter the form deatils  */}
                  {errorProductReview && (
                    // If the errorProductReview is true then show the error message
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    // Only registered user acan be able to rate and review a product , so check should happen
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        {/* The rating form should be placed here */}
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          // The set rating is assigned the new value 
                        >
                          <option value="">Select...</option>
                          {/* A drop doen menu should be made , 1 to 5 , poor to excellent*/}
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        {/* Here the regustered user can also add a comment about the product */}
                        <Form.Label>Comment</Form.Label>
                        {/* The heading of the comment */}
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          // The comment value
                          onChange={(e) => setComment(e.target.value)}
                          // The new comment value should be set to the setComment local state
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        {/* The submit button */}
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      {/* If the user is not registred then the user should  login only then there are able to login, and a registered user is only able to give a review and rating only once */}
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
//The Product screen is then exported to App.js file
