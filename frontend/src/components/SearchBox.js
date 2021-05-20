//The search box is a search component , when input any name values , it returns the product with that name or empty
import React, { useState } from "react";
//Importing react elements into the functional component, useState hook allows to have state vairables in this functional component
import { Form, Button } from "react-bootstrap";
//the <FormControl> component renders a form control with bootstrap styling , the button is a normal bootstrap button

const SearchBox = ({ history }) => {
  //Here keyword is the search keyword and to set it setKeyword is used in the useState
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    //The submit handler is activated when text in put in the seah box and search is pressed
    e.preventDefault();
    if (keyword.trim()) {
      //Here the keyword that was put in is trimmed
      history.push(`/search/${keyword}`);
      //pushed by the historyto the search
    } else {
      history.push("/");
      //Or is pushed empty
    }
  };

  return (
    // Form control component is started
    <Form onSubmit={submitHandler} inline>
      {/* when the seach box is types in , it clicks the submit habler */}
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      {/* Basic buttton with a seach bar icon on it  */}
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
    //Form is ended
  );
};

export default SearchBox;
//The search box is then exported to the navbar
