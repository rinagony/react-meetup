import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FavoritesContextProvider } from "./store/favorites-context";
import { GoingContextProvider } from "./store/iamgoing-context";
import { Provider } from "react-redux";
import { store } from './state/store';

ReactDOM.render(
  <Provider store={store}>
    <FavoritesContextProvider>
      <GoingContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoingContextProvider>
    </FavoritesContextProvider>
  </Provider>,
  document.getElementById("root")
);