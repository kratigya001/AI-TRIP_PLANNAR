import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import CreateTrip from "./components/create_trip";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './index.css';
import Viewtrip from "./view-trip/[tripId]/index.jsx";
import Root from "./root.jsx";
import MyTrips from "./my-trips"; // 👈 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/create_trip",
        element: <CreateTrip />,
      },
      {
        path: "/view-trip/:tripId",
        element: <Viewtrip />,
      },
      {
        path: "/my-trips",
        element: <MyTrips />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);