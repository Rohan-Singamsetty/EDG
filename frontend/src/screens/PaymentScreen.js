//The Payment screen displays the payment options where the user can select in the payment process
import React, { useState } from "react";
//Importing react elements into the functional component, useState is used for component level state management
import { Form, Button, Col } from "react-bootstrap";
// Row and Col devides the web site into a CSS Grid type, Form and button are the basic form components.
import { useDispatch, useSelector } from "react-redux";
//useSelector is used to feth the payload value from the reducer,The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions
import FormContainer from "../components/FormContainer";
//Fetching the FormContainer component
import CheckoutSteps from "../components/CheckoutSteps";
//Fetching the checkoutsteps component
import { savePaymentMethod } from "../actions/cartActions";
//The savePaymentMethod action is bought in

//History is to push a user
const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  //Above useSelector is being used to fetch the shipping addres of the user

  if (!shippingAddress) {
    history.push("/shipping");
  }
  // If the shipping address is not present then send the user to the shipping screen

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  // above is the component level state for storing the seleted payment method and storing them in a empty string(Default for now is paypal)

  const dispatch = useDispatch();
  //The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  //the submit handler will fire when the user submits thier preffered payment method and will get stored in the action

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      {/* Above is the checkout steps , this payment is the 2nd checkout step */}
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        {/* When the from is submitted, the submitHandler is fired */}
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          {/* The form label should go here*/}
          <Col>
            {/* As in this case were are using only paypal  */}
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              // For now only two options but stripe can also be activated
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.taget.value)}
              // the payment method will be stored in the local state storage
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.taget.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
        {/* The button to continue to the next step process of the checkout */}
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
//The paymentScreen will be exported to the app.js
