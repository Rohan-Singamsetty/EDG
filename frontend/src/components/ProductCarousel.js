//The product carousel lets us alter the way the products are displayed to the user , here the carousel takes in the top 3 high rated products overall
import React, { useEffect } from "react";
//Importing react elements into the functional component 
import { Link } from "react-router-dom";
//Provides declarative, accessible navigation around your application.card
import { Carousel, Image } from "react-bootstrap";
//The carousel object is bought in along side the image that would be displayed inside the carousel
import { useDispatch, useSelector } from "react-redux";
// useDispatch and useSelector are react hooks
import Loader from "./Loader";
//This this spinning loader, occurs only when the data is not comming from the database
import Message from "./Message";
//The message along side the spinner will display the error in a the message format

import { listTopProducts } from "../actions/productActions";
//The top listed products are the ones with more rating in overall selection

const ProductCarousel = () => {
  const dispatch = useDispatch();
  //The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;
  //The products are an array of 3 top listed products along side any error message or loading which is true or false

  useEffect(() => {
    dispatch(listTopProducts());
    //dispatches the top products
  }, [dispatch]);
  //dispatch should be set as a dependency

  //is loading is true loader is gonna show and an error will show as well
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    //The carousel starts here
    <Carousel pause="hover" className="bg-dark">
      {/* the prducts are mapped and the 3 top rated products are taken below */}
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            {/* Products images should go here */}
            <Image src={product.image} alt={product.name} fluid />
            {/*Carosel caption is a word card */}
            <Carousel.Caption className="carousel-caption">
              <h3>
                {/* Product name and price should go below */}
                {product.name} (£{product.price})
              </h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
//Here we export the ProductCarousel to the home page to be used
