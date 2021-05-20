//The shipping screen is the second step in the checkout process , the shipping screen takes the users address details and places them along the order details to send them to admin in the order deatails list
import React, { useState } from "react";
//Importing react elements into the functional component,useState is used for component level state management
import { Form, Button } from "react-bootstrap";
// Form and button are the basic form components.
import { useDispatch, useSelector } from "react-redux";
//useSelector is used to feth the payload value from the reducer,The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions
import FormContainer from "../components/FormContainer";
//Fetching the FormContainer component
import CheckoutSteps from "../components/CheckoutSteps";
//Fetching the checkout steps from the CheckoutSteps components
import { saveShippingAddress } from "../actions/cartActions";
//the saveShippingAddress records the shipping address of the user when entered

//The shipping takes in the history(to push the user)
const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  //The selector gets the shipping address of the user so that to fill in the form now later shopping

  const [address, setAddress] = useState(shippingAddress.address);
  // above is the component level state for storing the address ,first time no address would appear but later the address from the previous order would appear
  const [city, setCity] = useState(shippingAddress.city);
  // above is the component level state for storing the city ,first time no city would appear but later the city from the previous order would appear
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  // above is the component level state for storing the postel code ,first time no postal code would appear but later the postal code from the previous order would appear
  const [country, setCountry] = useState(shippingAddress.country);
  // above is the component level state for storing the country ,first time no country would appear but later the country from the previous order would appear

  const dispatch = useDispatch();
  //The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };
  //The submit handler is pressed once the form is submitted , which then will save the shiping address in the saveAddressAction and then push the user to the payment screen
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      {/* As this the only ht e checkout step 2, only 2 checkout steps should be shown  */}
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        {/* on submitting the form the submitHandler is pressed  */}
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          {/* The form field for the address should be filled here */}
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            // After the first input the default input should be the first input
            required
            //The form field should aslo be required
            onChange={(e) => setAddress(e.target.value)}
            // on change the address should be assigned to the adress local field
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          {/* The form field for the city should be filled here */}
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            // After the first input the default input should be the first input
            required
            //The form field should aslo be required
            onChange={(e) => setCity(e.target.value)}
            // on change the address should be assigned to the city local field
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          {/* The form field for the postal code should be filled here */}
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            // After the first input the default input should be the first input
            required
            //The form field should aslo be required
            onChange={(e) => setPostalCode(e.target.value)}
            // on change the postal code should be assigned to the postal local field
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          {/* The form field for the country should be filled here */}
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            // After the first input the default input should be the first input
            required
            //The form field should aslo be require
            onChange={(e) => setCountry(e.target.value)}
            // on change the postal code should be assigned to the country local field
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
        {/* The continue button should be here */}
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
// The Shipping screen would now be sent to the app.js page
