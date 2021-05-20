//A middleware should be created for showing off the error in the routes
//The first controller should be shouwed if the particular data is not found
const notFound = (req, res, next) => {
  //The notFound controller would not be  async but takes the request and responce object and next object in

  //Make a new error object using the node's Error object
  const error = new Error(`Not Found - ${req.originalUrl}`);
  //Then respond the 404 HTTP status : Not Found
  res.status(404);
  //Then show the error next
  next(error);
};

//Make a handler for the errors
const errorHandler = (err, req, res, next) => {
  //The errorHandler controller would not be  async but takes the request and responce object and next object in
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  //Get the status code , the status code would be bought from the responce object, it would be either 200 or 500
  res.status(statusCode);
  //Then send the status code to the responce. json object
  res.json({
    //Send the error message through here
    message: err.message,
    //The stack of the system should be in production for , later it would be changed to development 
    stack: process.env.NODE_ENV === "prodcution" ? null : err.stack,
  });
};

//Then export the controllers to the routes
export { notFound, errorHandler };
