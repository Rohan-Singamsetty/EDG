//This footer file a basic footer without much information, need to add some contact details
import React from "react";
//Importing react elements into the functional component footer file
import { Container, Row, Col } from "react-bootstrap";
//react bootstarap is a UI library  

const Footer = () => {
  return (
    //changed the div to footer to put all the elements inside 
    <footer>
      <Container>
        <Row>
          <Col className="text-center py3">Copyright &copy; EDG</Col>
          {/* make a basic footer  */}
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
//Here we export the footer to different pages through out the project for instance , we're gonna use this footer in the app.js file to display it onto the screen
