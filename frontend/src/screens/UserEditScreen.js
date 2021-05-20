//this is the after the admin clicks the edit optionin the user list , where the admin can edit the user profile and make a user an admin
import React, { useState, useEffect } from "react";
//Importing react elements into the functional component, By useEffect you can tell react that the component needs to do something after it renders, useState is used for component level state management
import { Link } from "react-router-dom";
//Provides declarative , accessible navigation around the application
import { Form, Button } from "react-bootstrap";
// Form and button are the basic form components.
import { useDispatch, useSelector } from "react-redux";
//useSelector is used to feth the payload value from the reducer,The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions
import Message from "../components/Message";
//Fetching the message component
import Loader from "../components/Loader";
//Fetching the loader component
import FormContainer from "../components/FormContainer";
//Fetching the FormContainer component
import { getUserDetails, updateUser } from "../actions/userActions";
//the two actions are getUserDetails to fetch deatails of the user and updateUser to update he user
import { USER_UPDATE_RESET } from "../constants/userConstants";
//This constant is used to to update a user

//The UserEditScreen takes in location(which is used to direct the user when they are logged in) and history(to push the user )
const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  // Using the userId to get the users id

  const [name, setName] = useState("");
  // above is the component level state for storing name , stored in a empty string.
  const [email, setEmail] = useState("");
  // above is the component level state for storing email , stored in a empty string.

  const [isAdmin, setIsAdmin] = useState(false);
  // above is the component level state for storing is admin information , default is false

  const dispatch = useDispatch();
  //The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  //The users deatils are fetched from the userDeatail reducer

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;
  // The details whether the users deatils have been updated are fetched from the userUpdate

  useEffect(() => {
    // If the users details are updated , then dispatch the user update constant to reset and then push the adminto the userlist screen
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      // if the user name and id are wrong then get the details of the user again
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        // Else then just set the name of the user , email of the user and set whether the user is an admin or not
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    //dispatches the new values into the updateUser action
  };
  // The submitHandler is then pressed when the admin fills the form and pressed the update button

  return (
    <>
      {/* A link should be shown here to make the admin go back if he dosent want to update the user information */}
      <Link to="/admin/userlist" className="btn btn-light my-3">
        {/* The link to the users list page  */}
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {/* if loader update is true then display the loader */}
        {loadingUpdate && <Loader />}
        {/* If errorUpdate is true then display the error message  */}
        {errorUpdate && <Message varaint="danger">{errorUpdate}</Message>}
        {loading ? (
          // if user informations loading is true then display the loader
          <Loader />
        ) : error ? (
          //If the user informations error is true then display the error
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            {/* When form is submit , then fire the submithandler */}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              {/* The name of the user should be displayed in this input */}
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                // The users name should be displayed here
                onChange={(e) => setName(e.target.value)}
                // The new users name should be set to the setName state
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              {/* The email of the user should be displayed in this input */}
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                //The users email should be displayed here
                onChange={(e) => setEmail(e.target.value)}
                //The new users email should be set to the setEamil state
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              {/* The should be the admin chekbox where it displayes here indicating whether the users  are a admin or not */}
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                // If admin the check box is tixed or not
                onChange={(e) => setIsAdmin(e.target.checked)}
                //The new users value is admin should be set to the setIsAdmin state
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
            {/* The update button should be displayed here */}
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
//The UserEditScreen is exported to the app.js
