//This is a basic login screen it has 2 fields to input email and password , if the user is new they can register a new account from the link below the input fields
import React, { useState, useEffect } from "react";
//Importing react elements into the functional component, By useEffect you can tell react that the component needs to do something after it renders, useState is used for component level state management
import { Link } from "react-router-dom";
//Provides declarative , accessible navigation around the application
import { Form, Button, Row, Col } from "react-bootstrap";
// Row and Col devides the web site into a CSS Grid type, Form and button are the basic form components.
import { useDispatch, useSelector } from "react-redux";
//useSelector is used to feth the payload value from the reducer,The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions
import Message from "../components/Message";
//Fetching the message component
import Loader from "../components/Loader";
//Fetching the loader component
import FormContainer from "../components/FormContainer";
//Fetching the FormContainer component
import { login } from "../actions/userActions";
//The action login is fectched from actions

//The login takes in location(which is used to direct the user when they are logged in) and history(to push the user )
const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  // above is the component level state for storing email , stored in a empty string.
  const [password, setPassword] = useState("");
  // above is the component level state fro storing the password(hashed) in an empty string

  const dispatch = useDispatch();
  //The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  //useSelector is then used to fetch if userinfo, from the reducer

  const redirect = location.search ? location.search.split("=")[1] : "/";
  //The redirect , redirects the users to the home

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    // if and only then users info is returned from the userInfo reducer , then the user is redirected to the homepage from thier account
  }, [history, userInfo, redirect]);
  //Use effect only works when the dependencies above are hit

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  // the submit handler will fire when a use tries to login and dispatch the details to the action

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {/* if the database doesnt work or its down , the loader and message components will be hit*/}
      {error && <Message variant="danger">{error}</Message>}
      {/* The error component */}
      {loading && <Loader />}
      {/* the loader component  */}
      <Form onSubmit={submitHandler}>
        {/* once the login form is filled and submitted , the submitHandler will be hit */}
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          {/* User will write thier registered email here in the input form*/}
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // users email will get stored in the local email state
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          {/* same as the email , users will input thier passwords in the input form  */}
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // users password will be stored in local password state
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
        {/* normal bootstrap sign in button */}
      </Form>

      <Row className="py-3">
        <Col>
          {/* here if the user is new to the web site , they will have link below indicating to sign up , which basically redirects them to the register form  */}
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
//The LoginScreen will now be exported to app.js and the navbar component
