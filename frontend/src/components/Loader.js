//The loader component is a spinner animation when in certain situations the data doesnt load the spinner wil appear , for example when the products dont come from the database by any technical reason the loader will appear 
import React from "react";
//Importing react elements into the functional component header file
import { Spinner } from "react-bootstrap";
//The Spinner is the loader animation picture which is brought from the bootstrap UI 

const Loader = () => {
  return (
    //Here we're setting the loaders animation though props ,to do make the animation to spin and we're changing the height and width of the spinner  
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block", 
      }}
    >
        <span className="sr-only">Loading...</span>
      {/* This is a tag which will appear below the spinner , dissabled because it takes some space below*/}
    </Spinner>
  );
};

export default Loader;
//Here we export the Loader to different pages through out the project for instance , the loader component is likely to be included in every single page thougout the application
