//this is the rating component which is divided into 5 starts with half a star also , like 3 and half star rating
import React from "react";
//Importing react elements into the functional component
import PropTypes from "prop-types";
//prop types define types and which props are required in the component

const Rating = ({ value, text, color }) => {
  //the rating component should take 3 props , value from 1 to 5, text as the number , and color of the stars which should be default to yellow
  return (
    <div className="rating">
      <span>
        {/* The first star , if the the star has one its a full start or 0.5 its a half star color default yellow */}
        <i
          style={{ color }}
          className={
            value >= 1
              ? "fas fa-star"
              : value >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        {/* The second star , if the the star has one its a full start or 0.5 its a half star color default yellow */}
        <i
          style={{ color }}
          className={
            value >= 2
              ? "fas fa-star"
              : value >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        {/* The third star , if the the star has one its a full start or 0.5 its a half star color default yellow */}
        <i
          style={{ color }}
          className={
            value >= 3
              ? "fas fa-star"
              : value >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        {/* The fourth star , if the the star has one its a full start or 0.5 its a half star color default yellow */}
        <i
          style={{ color }}
          className={
            value >= 4
              ? "fas fa-star"
              : value >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        {/* The fifth star , if the the star has one its a full start or 0.5 its a half star color default yellow */}
        <i
          style={{ color }}
          className={
            value >= 5
              ? "fas fa-star"
              : value >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>{text && text}</span>
    </div>
  );
};
//setting the default stars color to a bright yellow
Rating.defaultProps = {
  color: "#f8e825",
};

//setting the default props values
Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
//the rating component should be now sent into the products card and product detail page
