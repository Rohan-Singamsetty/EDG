//The product component is the how the single product is seen in the home sceen , for this a layoit should be built along side the ratings component inside it
import React from "react";
//Importing react elements into the functional component 
import { Link } from "react-router-dom";
//Provides declarative, accessible navigation around your application.card
import { Card } from "react-bootstrap";
//The cards provide a flexible and extensible content container with variants and oprions
import Rating from "./Rating";
// This is the rating component, which rates a product on a 5 start rating , for now its hard coded , need to change it later

const Product = ({ product }) => {
  //The product component takes in the product itself as props
  return (
    <Card className="my-3 p-3 rounded">
      {/* Inside this card the  product details will be present */}
      <Link to={`/product/${product._id}`}>
        {/* Here the product id will be given as key for the link to the product details page  */}
        <Card.Img src={product.image} variant="top" />
        {/* The product image is present here , when you click on the image , it redirects to the product details page  */}
      </Link>
      <Card.Body>
        {/* This is the card body , it contains the product name , rating and product description  */}
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
            {/* Here when you click the product name , it will redirect to the product details page */}
          </Card.Title>
        </Link>
        <Card.Text as="div">
          {/* This is where the ratings are , they are upto 5 starts which are hard coded now , but will change to customer reviews later  */}
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        {/* The last is the product price , in pounds , need to change in rupees later */}
        <Card.Text as="h3">£{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
//Here we export the Product to home page to display
