//This home screen is the main page of the application , when a user opens the website , they will first get redirected to this website
import React, { useEffect } from "react";
//Importing react elements into the functional component, By useEffect you can tell react that the component needs to do something after it renders
import { Link } from "react-router-dom";
//Provides declarative , accessible navigation around the application
import { useDispatch, useSelector } from "react-redux";
//Importing react elements into the functional component,useSelector is used to feth the peyload value from the reducer
import { Row, Col } from "react-bootstrap";
// Row and Col devides the web site into a CSS Grid type
import Product from "../components/Product";
//Fetching the product card
import Message from "../components/Message";
//Fetching the message component
import Loader from "../components/Loader";
//Fetching the loader component
import Paginate from "../components/Paginate";
//need to fetch paginate for later purposes
import Meta from "../components/Meta";
//Meta data is fetched
import { listProducts } from "../actions/productActions";
//Fetching the products list from the actions
import ProductCarousel from "../components/ProductCarousel";
//Fetching the Carousel component

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  //Keyword is going to be used to search a products name for the carousel

  const pageNumber = match.params.pageNumber || 1;
  //Gets how many pages are in the application (this is brought in from the api)

  const dispatch = useDispatch();
  //The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  //Above the useSelctor to fetch the product list reducer and get the loading , error, products, page and pages

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  //dispatch gets the products from the listProducts from actions.

  return (
    <>
      <Meta />
      {/* the below statment says if the search is entered the product carousel should dissapear or esle a go back button should disapear */}
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
        // Above is the go back button
      )}
      <h1>Latest products</h1>
      {/* Below a if loading or message the both components dissapear or esle the products will be shown  */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {/* Here the products are gonna be mapped and be sent into the products cards component created */}
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                {/* Below is the product cards */}
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {/* if there are more than 8 products on the homepage the pagination component will hit and start putting the products onto the other pages  */}
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
//The home screen will then be imported to the app.js
