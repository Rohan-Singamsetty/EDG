//JSON Web Token is an Internet proposed standard for creating data with optional signature and/or optional encryption whose payload holds JSON that asserts some number of claims
import jwt from "jsonwebtoken";

//The token in generated on the id basis 
const generateToken = (id) => {
  //The token is signed using the id of the user
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    //The jwt secret is bougth in from the .env file
    expiresIn: "30d",
    //The token should expire in 30 days 
  });
};

//The token should be then exported 
export default generateToken;
