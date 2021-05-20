//This is a screen that should only be viasable to the admin only , in the screen the user information would be displayed in a tabular form , a button should also be displayed in the table so that the admin can click and edit user information
import React, { useEffect } from "react";
//Importing react elements into the functional component, By useEffect you can tell react that the component needs to do something after it renders
import { LinkContainer } from "react-router-bootstrap";
//link container is used to wrap elements inside the <LinkContainer> to make it behave like a Link
import { Table, Button } from "react-bootstrap";
//The table is a normal bootstrap design table , also importing a button
import { useDispatch, useSelector } from "react-redux";
//useSelector is used to feth the payload value from the reducer,The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions
import Message from "../components/Message";
//Fetching the message component
import Loader from "../components/Loader";
//Fetching the loader component
import { listUsers, deleteUser } from "../actions/userActions";
//The list user and delete user actions should be bought in

//History is to push a user
const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  //The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  //the users deatils is bought in from the userList reducer, this would be thier name and email

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //The user information is bought in from the userLogin reducer, information here refers to whether the user is an admin or registered user

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  //The user delete inftomation is bought in from the userDelete reducer

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);
  //if the user is an admin or a registered user, thier information should be shown in table , else should be logged out of the system

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };
  //only when delete is pressed , the admin is promted with a second screen for conformation and then once the admin presses yeas the user will be permenently removed/deleted

  return (
    <>
      <h1>Users</h1>
      {/* The user list begins here*/}
      {/* if loading is true then the loading spinner would load or else not  */}
      {loading ? (
        <Loader />
      ) : error ? (
        // if the error is true then an error message will show up or else not
        <Message variant="danger">{error}</Message>
      ) : (
        //if both the loader and message are false then the table would show
        <Table striped bordered hover responsive className="table-sm">
          {/* The tables should be a striped bordered table  */}
          <thead>
            <tr>
              <th>ID</th>
              {/* The id of the user*/}
              <th>NAME</th>
              {/* The name of the user*/}
              <th>EMAIL</th>
              {/* The email of the user*/}
              <th>ADMIN</th>
              {/* Whether the user is an admin*/}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/*The users is mapped and the order detail are obtained from it , from the reducer*/}
            {users.map((user) => (
              <tr key={user._id}>
                {/* The user id is going to be put here */}
                <td>{user._id}</td>
                {/* The user name is going to be put here */}
                <td>{user.name}</td>
                <td>
                  {/* The user email is displayed here ,and when the admin clicks the user mail it should direactly naviagte him to the email  */}
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {/* check whether the user is an admin or not */}
                  {user.isAdmin ? (
                    // If the user is an admin , put a green colored tick
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    // if the user is not an admin , put a red x mark
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {/* the edit button should go down here , so when the admin clicks it , it should redirect to the user edit screen*/}
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                      {/*Edit symbol should be showed inside the button  */}
                    </Button>
                  </LinkContainer>
                  <Button
                    // The delete button should go here , when admin clicks it it should delete a user
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                    {/* Delete symbol should go here */}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        // The table should end here
      )}
    </>
  );
};

export default UserListScreen;
//The UserListScreen is now sent to the app.js
