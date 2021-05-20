//This message component is a pair component of the loader, when the loader spins for more than 10000ms a message will show the error why its spinning, most of the time the reason would be that the database is connected 
import React from "react";
//Importing react elements into the functional component 
import { Alert } from "react-bootstrap";
//an alert is a highlited warning message 

const Message = ({ variant, children }) => {
  //The message component takes in two props one variant , variant is the how the colour of the text in the message would look, children is the message itself of the message component 
  return <Alert variant={variant}>{children}</Alert>;
};
//Here , later we decided to set the default colour info alert 
Message.defaultProps = {
  variant: "info",
};

export default Message;
//Here we export the Message into different pages through out the project , same like the loader this message component is likely to be included in every single page thougout the application

