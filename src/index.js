import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FavoritesContextProvider } from "./store/favorites-context";
import { GoingContextProvider } from "./store/iamgoing-context";

ReactDOM.render(
  <FavoritesContextProvider>
    <GoingContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoingContextProvider>
  </FavoritesContextProvider>,
  document.getElementById("root")
);
