//This screen is used as the product update screen , so when the admin clicks the update button on the product list screen , this creen would appear
import axios from "axios";
//Axios fetches the users information and place them inside the user inputs
import React, { useState, useEffect } from "react";
//Importing react elements into the functional component, By useEffect you can tell react that the component needs to do something after it renders, useState is used for component level state management
import { Link } from "react-router-dom";
//Provides declarative , accessible navigation around the application
import { Form, Button } from "react-bootstrap";
//Form and button are the basic form components.
import { useDispatch, useSelector } from "react-redux";
//useSelector is used to feth the payload value from the reducer,The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions
import Message from "../components/Message";
//Fetching the message component
import Loader from "../components/Loader";
//Fetching the loader component
import FormContainer from "../components/FormContainer";
//Fetching the FormContainer component
import { listProductDetails, updateProduct } from "../actions/productActions";
// Both the actions are bought in from the product actions , one to list the product details into the form , another to update the product
import { PRODUCT_UPDATE_REQUEST } from "../constants/productConstants";
// Once the update is complete it should be reset

//This form takes in location(which is used to direct the user when they are logged in) and history(to push the user )
const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  // Id of the product is fetched

  const [name, setName] = useState("");
  // above is the component level state for storing name , stored in a empty string.
  const [price, setPrice] = useState(0);
  // above is the component level state for storing price , stored as 0 by default
  const [image, setImage] = useState("");
  // above is the component level state for storing image , stored in a empty string.
  const [brand, setBrand] = useState("");
  // above is the component level state for storing brand , stored in a empty string.
  const [category, setCategory] = useState("");
  // above is the component level state for storing category , stored in a empty string.
  const [countInStock, setCountInStock] = useState(0);
  // above is the component level state for storing count in stock , stored as 0 by default
  const [description, setDescription] = useState("");
  // above is the component level state for storing description , stored in a empty string.
  const [uploading, setUploading] = useState(false);
  // above is the component level state for storing uploading status , stored as 0 by default

  const dispatch = useDispatch();
  //The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  // fetches all the product deatils including the loading and error details from the reducer

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  // fetches the loading , error , success details when the product has been updated from the reducer

  useEffect(() => {
    if (successUpdate) {
      // if the update has happended then reset the constant and push the admin to the product list page
      dispatch({ type: PRODUCT_UPDATE_REQUEST });
      history.push("/admin/productlist");
    } else {
      // else if the update is not successful then get the that specific product details again inside the input forms
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        // else set the product field by defult again
        setName(product.name);
        // Setting the name
        setPrice(product.price);
        // setting the price
        setImage(product.image);
        // setting the image
        setBrand(product.brand);
        //setting the brand
        setCategory(product.category);
        // setting the category
        setCountInStock(product.countInStock);
        //setting the CIS
        setDescription(product.description);
        //Setting the description
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    // This is handlers hits when an image has been submitted in the hanlder, so the image can be either a file location typed in manually , ot can select it from the computer with the default UI
    const file = e.target.files[0];
    // getting the file manually
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-dat",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      // getting the image from the Api and storing it in the image folder

      setImage(data);
      // setting the image
      setUploading(false);
      // set uploading false
    } catch (error) {
      console.log(error);
      // if there is an error then show the error
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    // when the update button is clicked dispatch the updateProduct handler with all the new values inputted
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      {/* A link to go back to the products list screen only for the admin  */}
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
        {/* Go back button*/}
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {/* edit product form starts here*/}
        {loadingUpdate && <Loader />}
        {/* if loadingUpdate is true then the loader spins  */}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {/* if error update is true then show the error update message */}
        {loading ? (
          <Loader />
        ) : // The loader component only when true
        error ? (
          // The error component only when true
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              {/* The Name heading of the form  */}
              <Form.Control
                type="name"
                placeholder="Enter name"
                // place holder of the form
                value={name}
                // value of the form , which is the previous product name
                onChange={(e) => setName(e.target.value)}
                // when change the name it stores it here in setName
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              {/* The Price heading of the form  */}
              <Form.Control
                type="number"
                placeholder="Enter price"
                // place holder of the form
                value={price}
                // value of the form , which is the previous product price
                onChange={(e) => setPrice(e.target.value)}
                // when change the price it stores it here in setName
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              {/* The Image heading of the form  */}
              <Form.Control
                type="text"
                placeholder="Enter image url"
                // place holder of the form
                value={image}
                // value of the form , which is the previous product image
                onChange={(e) => setImage(e.target.value)}
                // when change the image it stores it here in setName
              ></Form.Control>
              <Form.File
              // The image file of where the user can add the file 
                id="image-file"
                label="Choose File"
                custon
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
              {/* if uploading is true then show loaded */}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              {/* The Brand heading of the form  */}
              <Form.Control
                type="text"
                placeholder="Enter brand"
                // place holder of the form
                value={brand}
                // value of the form , which is the previous product brand
                onChange={(e) => setBrand(e.target.value)}
                // when change the brand it stores it here in setName
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              {/* The Count in stock heading of the form  */}
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                // place holder of the form
                value={countInStock}
                // value of the form , which is the previous product count in stock
                onChange={(e) => setCountInStock(e.target.value)}
                // when change the value it stores it here in setName
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              {/* The category heading of the form  */}
              <Form.Control
                type="text"
                placeholder="Enter category"
                // place holder of the form
                value={category}
                // value of the form , which is the previous product category
                onChange={(e) => setCategory(e.target.value)}
                // when change the category it stores it here in setName
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              {/* The Description heading of the form  */}
              <Form.Control
                type="text"
                placeholder="Enter description"
                // place holder of the form
                value={description}
                // value of the form , which is the previous product description
                onChange={(e) => setDescription(e.target.value)}
                // when change the descriprion  it stores it here in setName
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
              {/* the update button */}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
//Then the productEditScreen is exported to the App.js file
