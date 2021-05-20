//This component is only used when the products exceed more than 8 in one page , when there are more than 8 products the pagianate component will hit and show individual page numbers at the bottom 
import React from "react";
//Importing react elements into the functional component 
import { Pagination } from "react-bootstrap";
//Importing a set of presentational components for building pagination UI. 
import { LinkContainer } from "react-router-bootstrap";
//you can wrap react bootstrap elements in a <LinkContainer> to make it behave like a React Router


const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  //so the paginate component will take multiple props but the isadmin prop is set to false as default 
  return (
    // here we test only when if there are more that 1 page then only the paginate option will work
    pages > 1 && (
      <Pagination>
        {/* the pagination tag opens at this end  */}
        {[...Array(pages).keys()].map((x) => (
          // the array returns the number of pages stored in the storage of the app and below the link container starts 
          <LinkContainer
            key={x + 1}
            to={
              //if its not admin , the following code fetches the page number location in the paginate component 
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          {/* the paginate item is the box with the paginate number which also displays the location */}
          </LinkContainer>
        ))}
      </Pagination>
      //The pagination tags ends 
    )
  );
};

export default Paginate;
//Here we export the Paginate components to different pages through out the project for instance , we're gonna use this the home page and pages where there a list of objects 

