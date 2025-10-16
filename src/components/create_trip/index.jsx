import React, { useEffect, useRef, useState } from "react";
import MapboxPlacesAutocomplete from "./MapboxPlacesAutocomplete";
import { SelectBudgetOptions, SelectTravelesList, AI_PROMPT } from "../../constants/options";
import { model } from "../../service/AIModal";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import Typed from "typed.js"; // ✅ Import Typed.js

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [tripData, setTripData] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const typedRef = useRef(null); // ✅ For the typing animation

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  // ✅ Typing animation setup
  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Plan Your Perfect Trip with AI",
        "Discover Amazing Destinations",
        "Create Custom Itineraries",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  // ✅ Google login
  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log("Google login success:", codeResp);
      GetIUserProfile(codeResp);
    },
    onError: (error) => console.log("Google login error:", error),
  });

  // ✅ Fetch user profile
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
        setShowLoginPopup(false);

        navigate(0);//update
      })
      .catch((err) => console.error("Error fetching Google profile:", err));
  };

  // ✅ Handle input
  const handleInputChange = (name, value) => {
    if (name === "days" && value > 5) {
      console.log("Please enter trip days less than or equal to 5");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // ✅ Generate trip using AI
  const handleGenerateTrip = async () => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }

    if (!formData.location || !formData.days || !formData.travelWith || !formData.budget) {
      console.log("Please fill out all fields.");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", formData.location)
      .replace("{totalDays}", formData.days)
      .replace("{traveler}", formData.travelWith)
      .replace("{budget}", formData.budget);

    try {
      setLoading(true);
      const result = await model.generateContent(FINAL_PROMPT);
      const response = await result.response;
      const responseText = await response.text();

      const match = responseText.match(/\{.*\}/s);
      if (!match) throw new Error("No valid JSON object found in the AI response.");

      const parsedData = JSON.parse(match[0]);
      console.log("Parsed Trip Data:", parsedData);

      setTripData(parsedData);
      await SaveAiTrip(parsedData);
    } catch (error) {
      console.error("Error generating or parsing trip:", error);
      alert("Sorry, there was an error generating your trip plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Save to Firestore
  const SaveAiTrip = async (TripData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: TripData,
      userEmail: user?.email,
      userName: user?.name,
      id: docId,
    });

    navigate("/view-trip/" + docId);
  };

  return (
    <>
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        {/* ✅ Typing header */}
        <div className="text-center mb-10">
        <h1 
          ref={typedRef} 
          className="font-serif font-bold italic text-5xl md:text-6xl text-gray-800 whitespace-nowrap"
        ></h1>        </div>
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10"> 
          { <h1 className="font-bold text-3xl">Tell us your travel preferences 🏞️🌴</h1>}
          </div>

        <div className="mt-10 gap-10">
          {/* Destination */}
          <div>
            <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
            <MapboxPlacesAutocomplete
              onChange={(place) => handleInputChange("location", place)}
            />
          </div>

          {/* Days */}
          <div>
            <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
            <input
              placeholder="Ex. 3"
              type="number"
              className="border border-gray-300 rounded p-2 w-full"
              onChange={(e) => handleInputChange("days", e.target.value)}
            />
          </div>
        </div>

        {/* Budget */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="flex gap-6">
            {SelectBudgetOptions.map((item, index) => (
              <button
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`flex items-center justify-between border border-gray-300 rounded-lg px-6 py-4 text-left cursor-pointer hover:shadow-lg transition-all bg-white w-full
                  ${formData.budget === item.title ? "shadow-lg border-black" : ""}
                `}
              >
                <div className="flex items-center">
                  <div className="text-5xl mr-4">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Travel With */}
        <div>
          <h2 className="text-xl my-3 font-medium">Who will you travel with?</h2>
          <div className="flex gap-6">
            {SelectTravelesList.map((item, index) => (
              <button
                key={index}
                onClick={() => handleInputChange("travelWith", item.title)}
                className={`flex items-center justify-between border border-gray-300 rounded-lg px-6 py-4 text-left cursor-pointer hover:shadow-lg transition-all bg-white w-full
                  ${formData.travelWith === item.title ? "shadow-lg border-black" : ""}
                `}
              >
                <div className="flex items-center">
                  <div className="text-5xl mr-4">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className="flex justify-center mt-6">
          <Button
            size="lg"
            disabled={loading}
            className="bg-gradient-to-r from-gray-800 to-black text-white hover:from-gray-700 hover:to-gray-900 transition-colors duration-300 font-bold flex items-center justify-center gap-2"
            onClick={handleGenerateTrip}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Generating...
              </>
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>
      </div>

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="popup-overlay" onClick={() => setShowLoginPopup(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h2>Authentication Required 🔒</h2>
            <p>Please log in to generate your personalized trip itinerary.</p>
            <button className="login-button" onClick={login}>
              Login with Google
            </button>
            <button className="close-button" onClick={() => setShowLoginPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Popup CSS */}
      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .popup-box {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
          text-align: center;
          max-width: 400px;
          width: 90%;
        }
        .login-button {
          width: 100%;
          padding: 12px;
          font-size: 1rem;
          color: white;
          background-color: #007bff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 10px;
          font-weight: bold;
        }
        .close-button {
          width: 100%;
          padding: 10px;
          font-size: 1rem;
          color: #333;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 10px;
        }
      `}</style>
    </>
  );
}

export default CreateTrip;
