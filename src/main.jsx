import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import CreateTrip from "./components/create_trip";
import Header from "./components/custom/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './index.css'; // Or the correct path to your main CSS file
import Viewtrip from "./view-trip/[tripId]/index.jsx";
 

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/create_trip", element: <CreateTrip /> },
  { path:"/view-trip/:tripId", element: <Viewtrip/>}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
     <Header/>
     <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
