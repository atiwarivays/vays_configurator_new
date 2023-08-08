import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/global.scss";
import "./assets/scss/font-awesome.css";
import MainRouter from "./routing/MainRouter";
import { Provider } from "react-redux";
import store from "./utils/store/";
import store2 from "./utils/store-2";
import cors from 'cors';
const express = require("express");
const app = express();
// app.use(cors());

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer af0dbb64-de67-4305-a10f-effc22f2b9d7");
myHeaders.append("Cookie", "__cfduid=db290300ecfe95ec1fe3bc92c388c3c991586618117");
myHeaders.append("Access-Control-Allow-Origin", "*");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var whitelist = ['http://example1.com', 'http://example2.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
      alert(2222);
    } else {
      alert(1111);
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Then pass them to cors:
app.use(cors(corsOptions));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store2}>
    <MainRouter />
  </Provider>
);
