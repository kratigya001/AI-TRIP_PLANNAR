import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import CreateTrip from "./components/create_trip";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './index.css';
import Viewtrip from "./view-trip/[tripId]/index.jsx";
import Root from "./root.jsx"; // ✨ 1. Import your new Root layout

// ✨ 2. Restructure your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // The Root layout is now the main element
    children: [ // Other routes are now children of the Root layout
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
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      {/* ✨ 3. Remove Header from here */}
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);