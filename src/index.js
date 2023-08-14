import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/global.scss";
import "./assets/scss/font-awesome.css";
import MainRouter from "./routing/MainRouter";
import { Provider } from "react-redux";
import store from "./utils/store/";
import store2 from "./utils/store-2";
// import express from 'express';
// import cors from 'cors';
// const app = express();

// app.use(
//   cors({
//     origin:'https://messaging.messagebird.com',
//     method:["GET", "POST","PUT","DELETE"], 
// })
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store2}>
    <MainRouter />
  </Provider>
);
