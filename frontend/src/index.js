//This index file basically displays the app.js file which shows all the screens
import React from "react";
//Importing react elements into the functional component header file
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
//The provide provides the store for the reducer
import store from "./store";
//The store fecthed
import "./index.css";
//The one and only css file is bought
import App from "./App";
//The app.js file is bought in
import reportWebVitals from "./reportWebVitals";
//The reportWebVitals bought in
import "./bootstrap.min.css";
//The boosts watch css file is bought

ReactDOM.render(
  <Provider store={store}>
    {/* The provider is provided withe reducer store */}
    <App />
    {/* The te app is shown here */}
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
