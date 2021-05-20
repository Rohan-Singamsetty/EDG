//This would be the registered screen , the registered screen's link would be placed in te login screen so that an unregistered user could register
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
import { register } from "../actions/userActions";
//The register action  is fectched from actions

//The login takes in location(which is used to direct the user when they are logged in) and history(to push the user )
const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  // above is the component level state for storing name , stored in a empty string.
  const [email, setEmail] = useState("");
  // above is the component level state for storing email , stored in a empty string.
  const [password, setPassword] = useState("");
  // above is the component level state for storing password , stored in a empty string.
  const [confirmPassword, setConfirmPassword] = useState("");
  // above is the component level state for storing the confirmPassword , stored in a empty string.
  const [message, setMessage] = useState(null);
  // above is the component level state for storing message

  const dispatch = useDispatch();
  //The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  //useSelector is then used to fetch if userinfo, from the reducer

  const redirect = location.search ? location.search.split("=")[1] : "/";
  //The redirect , redirects the users to the home af, after theu registered, which means they logged in

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    // if and only then users info is returned from the userInfo reducer , then the user is redirected to the homepage from thier account
  }, [history, userInfo, redirect]);
  //Use effect only works when the dependencies above are hit

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  // if both the passwords do not match in the register screen then a message should be shown else dispatch the name, email, password to the register action

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {/* if the database doesnt work or its down , the loader and message components will be shown*/}
      {/* The message will apear only when the passwords do not match */}
      {message && <Message variant="danger">{message}</Message>}
      {/* The error component */}
      {error && <Message variant="danger">{error}</Message>}
      {/* the loader component  */}
      {loading && <Loader />}
      {/* once the registered form is filled and submitted , the submitHandler will be hit */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          {/* User will write thier name preffered by them here in the input form*/}
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // users name will get stored in the local name state
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          {/* User will write thier preffered email here in the input form*/}
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
          {/* User will write thier password here in the input form*/}
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // users first password will get stored in the local email state
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          {/* User will write thier password for the second time here in the input form*/}
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // users second password will get stored in the local email state
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Register
        </Button>
        {/* normal bootstrap register button */}
      </Form>

      <Row className="py-3">
        <Col>
          {/* here if the user has an account already , they will have link below indicating to sign in , which basically redirects them to the login form  */}
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
//The RegisterScreen will now be exported to app.js and the LoginScreen
