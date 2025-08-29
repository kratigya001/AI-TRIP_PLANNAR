import React, { useEffect, useState } from 'react';
import MapboxPlacesAutocomplete from './MapboxPlacesAutocomplete';
import { Button } from '../ui/button';
import { SelectBudgetOptions, SelectTravelesList } from '../../constants/options';
import { AI_PROMPT } from '../../constants/options';
import { model } from '../../service/AIModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [tripData, setTripData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleInputChange = (name, value) => {
    if (name === 'days' && value > 5) {
      console.log("Please enter trip days less than or equal to 5");
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData.location || !formData.days || !formData.travelWith || !formData.budget) {
      console.log("Please fill out all fields.");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData.location)
      .replace('{totalDays}', formData.days)
      .replace('{traveler}', formData.travelWith)
      .replace('{totalDays}', formData.days)
      .replace('{budget}', formData.budget);

    try {
      console.log("Generating with prompt:", FINAL_PROMPT);
      const result = await model.generateContent(FINAL_PROMPT);
      const response = await result.response;
      const responseText = await response.text();
      console.log("AI Response:", responseText);

      try {
        // const parsedData = JSON.parse(responseText);
        // setTripData(parsedData);
      } catch (jsonError) {
        console.error("Error parsing AI response as JSON:", jsonError);
      }

    } catch (error) {
      console.error("Error generating trip:", error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🏞️🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 gap-10">
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
            onChange={(e) => handleInputChange('days', e.target.value)}
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
              onClick={() => handleInputChange('budget', item.title)}
              className={`flex items-center justify-between border border-gray-300 rounded-lg px-6 py-4 text-left cursor-pointer hover:shadow-lg transition-all bg-white w-full
                ${formData.budget === item.title ? 'shadow-lg border-black' : ''}
              `}>
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
              onClick={() => handleInputChange('travelWith', item.title)}
              className={`flex items-center justify-between border border-gray-300 rounded-lg px-6 py-4 text-left cursor-pointer hover:shadow-lg transition-all bg-white w-full
                ${formData.travelWith === item.title ? 'shadow-lg border-black' : ''}
              `}>
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
      <Button
        variant={null}
        size="lg"
        className="mt-6 bg-gradient-to-r from-gray-800 to-black text-white hover:from-gray-700 hover:to-gray-900 transition-colors duration-300 font-bold"
        onClick={handleGenerateTrip}
      >
        Generate Trip
      </Button>

      {/* Display Trip Data (as needed) */}
      {tripData && (
        <div className="mt-8 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-2xl font-bold">Your Trip Plan</h3>
          <pre className="mt-4 text-sm whitespace-pre-wrap">{JSON.stringify(tripData, null, 2)}</pre>
        </div>
      )}

      {/* Corrected Dialog Implementation */}
  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Login Required</DialogTitle>
      <DialogDescription>
        Please login to generate your trip plan.
      </DialogDescription>
    </DialogHeader>
    <div className="flex justify-end">
      <Button onClick={() => setOpenDialog(false)}>Close</Button>
    </div>
  </DialogContent>
</Dialog>

    </div>
  );
}

export default CreateTrip;