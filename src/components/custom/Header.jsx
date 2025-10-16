import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../service/firebaseConfig";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  const auth = getAuth(app);

  // ✅ Google login setup (same logic from CreateTrip.jsx)
  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log("Google login success:", codeResp);
      GetIUserProfile(codeResp);
    },
    onError: (error) => console.log("Google login error:", error),
  });

  // ✅ Fetch Google user profile and save to localStorage
  const GetIUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        console.log("Google user profile:", resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setUser(resp.data);
        navigate(0); // reload to update header UI
      })
      .catch((err) => console.error("Error fetching Google profile:", err));
  };

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // redirect home
  };

  // --- Styles ---
  const headerStyle = {
    width: "100%",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    borderBottom: "1px solid #e5e5e5",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 40px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const logoText = {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#0d47a1",
  };

  const buttonStyle = {
    padding: "8px 18px",
    borderRadius: "25px",
    border: "1px solid #1976d2",
    backgroundColor: "white",
    color: "#1976d2",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const buttonHover = {
    backgroundColor: "#1976d2",
    color: "white",
  };

  const logoutButton = {
    ...buttonStyle,
    border: "1px solid #d32f2f",
    color: "#d32f2f",
    display: "flex",
    alignItems: "center",
  };

  const logoutHover = {
    backgroundColor: "#d32f2f",
    color: "white",
  };

  const userContainer = {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  };

  return (
    <header style={headerStyle}>
      {/* Left: Logo */}
      <div>
        <span style={logoText}> ✈️ AI Trip Planner</span>
      </div>

      {/* Right: Buttons */}
      <div>
        {user ? (
          <div style={userContainer}>
            <button
              style={buttonStyle}
              onMouseOver={(e) => Object.assign(e.target.style, buttonHover)}
              onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
              onClick={() => navigate("/my-trips")}
            >
              My Trips
            </button>

            <p style={{ margin: 0, fontSize: "16px", color: "#333" }}>
              Welcome,{" "}
              <span style={{ color: "#1976d2", fontWeight: "600" }}>
                {user?.given_name || user?.name}
              </span>
            </p>

            <button
              style={logoutButton}
              onClick={handleLogout}
              onMouseOver={(e) => Object.assign(e.currentTarget.style, logoutHover)}
              onMouseOut={(e) => Object.assign(e.currentTarget.style, logoutButton)}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="16px"
                width="16px"
                style={{ marginRight: "6px" }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path>
              </svg>
              Logout
            </button>
          </div>
        ) : (
          <button
            style={{
              ...buttonStyle,
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
            }}
            onMouseOver={(e) =>
              Object.assign(e.target.style, { backgroundColor: "#1565c0" })
            }
            onMouseOut={(e) =>
              Object.assign(e.target.style, {
                backgroundColor: "#1976d2",
                color: "white",
              })
            }
            onClick={login} // ✅ Google login trigger here
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
