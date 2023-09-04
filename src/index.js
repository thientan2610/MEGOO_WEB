import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ThemeProvider } from "@mui/material";
import { customTheme } from "./component/custom/customTheme";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
// import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import "mapbox-gl/dist/mapbox-gl.css";

import { ToastProvider } from "rc-toastr";
import "rc-toastr/dist/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ThemeProvider theme={customTheme}>
          <ToastProvider
            config={{
              position: "bottom-right",
              duration: 3000,
            }}
          >
            <App />
          </ToastProvider>
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
