//This is the meta file , The meta file is just a descriptiion of the project , in this meta file we only mention the tile , description and keywords of the project
import React from "react";
//Importing react elements into the functional component 
import { Helmet } from "react-helmet";
//The react helemt is a reusable react component that will manage all of the changes to the document head

const Meta = ({ title, description, keywords }) => {
  //This Meta component will take 3 props , which are the title , description, keyword
  return (
    //The contents of the meta file should be inside the Helemt tag
    <Helmet>
      {/* The Title prop*/}
      <title>{title}</title>
      {/* The Description prop*/}
      <meta name="description" content={description} />
      {/* The keyword prop*/}
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

//so here we put the props to default values
Meta.defaultProps = {
  title: "Welcome To EDG",
  description: "We sell the best products in town",
  keywords: "Groceries , the best and fresh in town",
};

export default Meta;
//Here we export the Meta to different pages through out the project
