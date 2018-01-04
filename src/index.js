import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import SmoothScroll from "really-smooth-scroll";
import registerServiceWorker from "./registerServiceWorker";
SmoothScroll.shim();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
