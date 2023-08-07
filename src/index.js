import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/global.scss";
import "./assets/scss/font-awesome.css";
import MainRouter from "./routing/MainRouter";
import { Provider } from "react-redux";
import store from "./utils/store/";
import store2 from "./utils/store-2";
// import app from 'express';
// var app = express();



const root = ReactDOM.createRoot(document.getElementById("root"));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

root.render(
  <Provider store={store2}>
    <MainRouter />
  </Provider>
);
