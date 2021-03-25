//The Checkoutdteps file is responsible for diplaying the checkout process to the users when they buy any products and checkout, the component is basically divided into 4 steps which are to step1->Sign In , step2->Shipping Adress, step3->payment which is an option with either paypal, stripe or debit or credit card and the last step4->placing the  order
//Using the rafce snippet -> REACT ARROW FUNCTION COMPONENT
import React from "react";
//Importing react elements into the functional component header file
import { Nav } from "react-bootstrap";
//react bootstarap is a UI library, Nav is the top component
import { LinkContainer } from "react-router-bootstrap";
//you can wrap react bootstrap elements in a <LinkContainer> to make it behave like a React Router

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  //Takes in 4 props which are the four checkout steps
  return (
    //Here wer justify the the 4 steps constants to the midle while giving them a bottom margin of 4
    <Nav className="justify-content-centre mb-4">
      {/* The first checkout navbar item which is the step1 -> Sign In */}
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            {/* if the user isnt signed in , the sign link prompts them into sign in page  */}
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          // if they are  already signed in the sign in link would be disabled
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>
      {/* The second checkout navbar item which is the step2 -> Shipping address */}
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            {/* Here the user is asked to fill out a address form to where they want their products to be shipped */}
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          //link would be disabled once there onto this step
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      {/* The third checkout navbar item which is the step3 -> Payment */}
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            {/* Here the user is asked to select thier preffered mayment method, the options for this application are limited so only paypal,stripe and debit or credit card  */}
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          //link would be disabled once there onto this step
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      {/* The Fourth and final checkout navbar item which is the step4 -> place order screen */}
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            {/*Here the user is taken to the order screen where they can see their order details and address, the user is asked to place thier order here  */}
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          //link would be disabled once there onto this step
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
//Here we export the CheckoutSteps component to different pages through out the project for instance , we're gonna use this component in the four checkout steps pages
