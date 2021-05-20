//The product list screen lists all mthe products , an would also conatin an add product button including a delete and update product button
import React, { useEffect } from "react";
//Importing react elements into the functional component, By useEffect you can tell react that the component needs to do something after it renders
import { LinkContainer } from "react-router-bootstrap";
//link container is used to wrap elements inside the <LinkContainer> to make it behave like a Link
import { Table, Button, Row, Col } from "react-bootstrap";
// Row and Col devides the web site into a CSS Grid type, Form and button are the basic form components, table is a normal bootstrap table
import { useDispatch, useSelector } from "react-redux";
//useSelector is used to feth the payload value from the reducer,The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions
import Message from "../components/Message";
//Fetching the message component
import Loader from "../components/Loader";
//Fetching the loader component
import Paginate from "../components/Paginate";
//Fecthing the paginate component
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
// The list product , delete product , create product actions should be bought in
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
// Product create reset should be bought from the constants

//This screen takes in location(which is used to direct the user when they are logged in) and history(to push the user )
const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  // getting the page number depending upon the number of products

  const dispatch = useDispatch();
  //The dispatch hook returns a reference to the dispatch funtion from the redux store ,used to dispatch actions

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  // the page , pages and product deatails should be fetched from the reducer

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  // loading, error and success of when the product is deleted

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  // loading, error and success of when the product is created and also the created product

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // userinformation should be bought in , the information is whether the user is an admin or not

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    // once the product is created the product create reset constant should be hit

    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    // If the user is not an admin them push the user to the login screen

    if (successCreate) {
      // if the product is created push the admin to the list of products
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      // Else push the admin to that product
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };
  // deleteHander is pushed when the admin cliks the remobe icon , promt with another window for conformation

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  // createProduct dispatches the create product action

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
          {/* The heading of products */}
        </Col>
        <Col className="text-right">
          {/* A black button which would redirect the admin to the create product page to create an a product*/}
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {/* if loadingDelete is true then show the loader */}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {/* If error delete is true then show the error message */}
      {loadingCreate && <Loader />}
      {/* If the loading create is true then show the loader spinner */}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {/* If the error create is true then show the error message */}
      {loading ? (
        // If loading is true show the loading spinner
        <Loader />
      ) : error ? (
        // If an error then show the error  message in a dark variant
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            {/* The tables should be a striped bordered table  */}
            <thead>
              <tr>
                <th>ID</th>
                {/* The id of the product */}
                <th>NAME</th>
                {/* The name of the product */}
                <th>PRICE</th>
                {/* The price of the product */}
                <th>CATEGORY</th>
                {/* The category of the product */}
                <th>BRAND</th>
                {/* The product brand */}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                // The products reducer is mapped
                <tr key={product._id}>
                  <td>{product._id}</td>
                  {/* The id of the product*/}
                  <td>{product.name}</td>
                  {/* The name of the product */}
                  <td>£{product.price}</td>
                  {/* The price of the product */}
                  <td>{product.category}</td>
                  {/* The category of the product */}
                  <td>{product.brand}</td>
                  {/* The brand of the product */}
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      {/* This button is the edit button which would be used to edit an product */}
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                        {/* The edit icon */}
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                      // the delete product hanlder
                    >
                      <i className="fas fa-trash"></i>
                      {/* The trash icon from font awsome  */}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
          {/* Show pages if products more then 8 */}
        </>
      )}
    </>
  );
};

export default ProductListScreen;
//The ProductListScreen is now exported to the App.js file.
