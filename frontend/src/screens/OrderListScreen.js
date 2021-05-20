//The screen displays the list of orders to a user after they purchase an order , the order list also displays all the orders for the admin screen, so that then the admin can mark the order if it has been delivered ot not
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
import { listOrders } from "../actions/orderActions";
//The listOrders action gets all the orders by using an axios request 

//History is to push a user 
const OrderListScreen = ({ history }) => {

  const dispatch = useDispatch();
    //The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  //Above useSelector is being used to fetch the orders list from the orderList reducer 

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //same as above , the useSelector here gets the admins information from the userInfo reducer 

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);
  //if the user is an admin , then the listOrders would be dispatched or else , redirect the admin to the login page , this is used when the admin is in the ordersList page and logs out 

  return (
    <>
    {/* This is where the orders list starts */}
      <h1>Orders</h1>
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
              {/* The id of the order */}
              <th>ID</th>
              {/* The name of the user that has ordered*/}
              <th>USER</th>
              {/* The date when the user has ordered the item */}
              <th>DATE</th>
              {/* The total amount of that order including tax and more */}
              <th>TOTAL</th>
              {/* Here a the date should display , if the order has been paid or an x mark  */}
              <th>PAID</th>
              {/* Same thing as the paid , the delivered is also measured  */}
              <th>DELIVERED</th>
              <th></th>
              {/* The the table column is ended */}
            </tr>
          </thead>
          <tbody>
          {/*The orders is mapped and the order detail are obtained from it , from the reducer */}
            {orders.map((order) => (
              // The orders are being mapped
              <tr key={order._id}>
                <td>{order._id}</td>
                {/* The orders id is going to be put here */}
                <td>{order.user && order.user.name}</td>
                {/* The users name is put here */}
                <td>{order.createdAt.substring(0, 10)}</td>
                {/* the date of the order */}
                <td>£{order.totalPrice}</td>
                {/* The total price of the order*/}
                <td>
                  {/* Should check whether the order has been paid or not  */}
                  {order.isPaid ? (
                    // id paid display the date when paid
                    order.paidAt.substring(0, 10)
                  ) : (
                    // Or else display a x should appear
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    //If the order is delivered then the delovered date should be shown 
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    // or else an x mark should be shown 
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {/* The Button would redirect the admin to the order detail of that specific order produced*/}
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
//Thw ordersListScreen would be exported to the app.js for use 
