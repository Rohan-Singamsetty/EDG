//mongoose will be used as a tool  to connect the database , mongoose allows to create models and schemas for different resources in the database
import mongoose from "mongoose";

//The connction toward the databse should be created
const connectDB = async () => {
  //this connection function should be asyncronos 
  try {
    //A try and catch should be created , try should connect to the database and catch should get the error
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      //The env file would have the mongo URI which is used for the connection to mongoDB
      useUnifiedTopology: true,
      //Set useUnifiedTopology to be true 
      useNewUrlParser: true,
      //Set useNewUrlParser to be true
      useCreateIndex: true,
      //Set useCreateIndex to be true
    });
    //If the connection was successful , then a message should be sent to the console, should use a green colour 
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    //If the connection fails then show an error message in the catch 
  } catch (error) {
    //An error message should be shown in terminal , make the error message red
    console.error(`Error: ${error.message}`.red.underline.bold);
    //Once after showing the error message , then exit the process
    process.exit(1);
  }
};

export default connectDB;
//Export the connectDB file to the server.js file
