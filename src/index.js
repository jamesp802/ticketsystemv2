import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/mainReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

var mountNode = document.getElementById("app");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountNode
);
