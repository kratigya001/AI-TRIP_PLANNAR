import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import CreateTrip from "./components/create_trip";
import Header from "./components/custom/Header";
 

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/create_trip", element: <CreateTrip /> }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header/>
    <RouterProvider router={router} />
  </React.StrictMode>
);
