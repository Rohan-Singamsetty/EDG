//This component is the form fields container , so the box around the form fields is primarily the form container
import React from "react";
//Importing react elements into the functional component header file
import { Container, Row, Col } from "react-bootstrap";
//react bootstarap is the UI library, Containers provide a mean to center and horizontally pad the contents in side of it, rows and columns are here to layout and align the content

const FormContainer = ({ children }) => {
  //This component aslo takes in a children prop wich basisally are the elements inside the container
  return (
    <Container>
      {/* This container is fully responsive by default */}
      <Row className="justify-content-md-center">
        {/* The contents in side the row will be put in the middle by default */}
        <Col xs={12} md={6}>
          {/* Setting the col suitable of responsive of the devices such as phones and tablets*/}
          {children}
          {/*children are the elements that are suppose to be inside the form container */}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
//Here we export the FormContainer into different pages through out the project where its suitable to be used
