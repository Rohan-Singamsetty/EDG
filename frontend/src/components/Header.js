//The header file is responsible for displaying the navbar , need to modify later for displaying the names of the customer
//Use ES7 components snippets
//Using the rafce snippet -> REACT ARROW FUNCTION COMPONENT
import React from "react";
//Importing react elements into the functional component header file
import { Route } from "react-router-dom";
//Route contains DOM bindings for React Router , router components for websites.
import { useDispatch, useSelector } from "react-redux";
// useDispatch and useSelector are react hooks
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
//react bootstarap is a UI library  , Nav  and navbar the top components, container is a box which is draws components inside it , NavDropDown is a drop down menu for the navbar elemnts when responsive
import { LinkContainer } from "react-router-bootstrap";
//you can wrap react bootstrap elements in a <LinkContainer> to make it behave like a React Router
import SearchBox from "./SearchBox";
//SearchBox is the search bar
import { logout } from "../actions/userActions";
//the logout action immplies only for logged in user

const Header = () => {
  const dispatch = useDispatch();
  //The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  //when a user logs in , their navbar would be different, when they click the logout icon , it promts the logout handler and lets them logout

  return (
    //changed the div to header
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        {/* the navbar components is auto imported , here the dark variant and responsiveness are part of elemets props  */}
        <Container>
          <LinkContainer to="/">
            {/* finalize the brand logo and diplay it here  */}
            <Navbar.Brand>
              {/* <img
              alt=""
              src="/images/logo.png"
              width="40"
              height="40"
              className="d-inline-block align-top"
            /> */}
              {""}
              EDG
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* The code below indicated the the seach component which has a feature to find a product when typed the literals of the product */}
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  {/* shopping logo icon to be here  */}
                  <i className="fas fa-shopping-cart " />
                  Cart
                </Nav.Link>
              </LinkContainer>
              {/* if a user is logged in , thier first name would appear here or it would just say sign in , incase of a user logs in the user will get a feature to have a drop down which would have a profile and logout link*/}
              {/* So down is a simple if or else statment in react which would promt whether a user is logged in or not  */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    {/* The profile section here contains the users order history and a section where the user can change thief password */}
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user " />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {/* same as the user , when an admin logs into the system ,they would get  another 3 option which would disaply users , products and orders to evaluate and seno on */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    {/*The drop down menu option Users diplays a list of users only visable to the admin */}
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    {/*The drop down menu option Products diplays a list of products only visable to the admin */}
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    {/*The drop down menu option Orders diplays a list of orders from the users only visable to the admin */}
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
//Here we export the Header to different pages through out the project for instance , we're gonna use this Header in the app.js file to display it onto the screen
