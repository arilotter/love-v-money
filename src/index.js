import React from "react";
import ReactDOM from "react-dom";
import Analytics from "react-router-ga";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <Analytics id="UA-38748116-2">
      <App />
    </Analytics>
  </BrowserRouter>,
  document.getElementById("root")
);
