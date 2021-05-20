//The server file is where the requests to the route are made
import path from "path";
// path module is used for handling and transforming file paths
import express from "express";
//Express. js is a Node js web application server framework, which is specifically designed for building single-page, multi-page, and hybrid web applications
import dotenv from "dotenv";
//dotenv allows you to separate secrets from your source code
import colors from "colors";
//Colors put a color to the message put
import morgan from "morgan";
//Morgan is a HTTP request logger middleware for Node. js. It simplifies the process of logging requests to your application.
import connectDB from "./config/db.js";
//The connectDB is the connecttion file for the database
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
//The  not found and errorHandler are bought in
import productRoutes from "./routes/productRoutes.js";
//The product routes are fetched
import userRoutes from "./routes/userRoutes.js";
//The user routes are bougth in
import orderRoutes from "./routes/orderRoutes.js";
//The order routes are bougt in
import uploadRoutes from "./routes/uploadRoutes.js";
//The uploads routes are bought in

dotenv.config();
//The env file then configgured

connectDB();
//The database connection should be made first

const app = express();
//The app should be assigned to the express handler

//If the developement process is in development rather than production
if (process.env.NODE_ENV === "development") {
  //Use the app to send the dev to the morgon
  app.use(morgan("dev"));
}

//Use app.js to send the express.json
app.use(express.json());

//Use the app to use the product routes
app.use("/api/products", productRoutes);
//Use the app to use the user routes
app.use("/api/users", userRoutes);
//Use the app to use the order routes
app.use("/api/orders", orderRoutes);
//Use the app to use the product routes
app.use("/api/upload", uploadRoutes);

//Then seapp then sends the paypa; request using the requests and reponce
app.get("/api/config/paypal", (req, res) =>
  //the responce then sends the paypal .env file
  res.send(process.env.PAYPAL_CLIENT_ID)
);

//The directory name is then set to the path
const __dirname = path.resolve();
//The app then uses the uploads file to send the files into it
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//If the developement process is in production rather than development
if (process.env.NODE_ENV === "production") {
  //Then use the build file to send the data from the buils file
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  //Then a request and rspnce object should be sent
  app.get("*", (req, res) =>
    //The responce object would send the direcotory name , with the frond end and build and index.html file
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
  //Else
} else {
  //Then send the home slash
  app.get("/", (req, res) => {
    //Send the responce object as API running
    res.send("API is running...");
  });
}

//The app should then use the not found not found middleware
app.use(notFound);

//the app should then use the error handler
app.use(errorHandler);

//The port should be set to the env port or the 5000
const PORT = process.env.PORT || 5000;

//The app should then last list to the port
app.listen(
  PORT,
  //The console should lastly log to the server
  console.log(
    //The server should be runnning in the node.env and should be in yellow ,aslo be bold
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
