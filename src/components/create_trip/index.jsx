import React, { useEffect, useState } from 'react';
import MapboxPlacesAutocomplete from './MapboxPlacesAutocomplete';
import { Button } from '../ui/button';
import { SelectBudgetOptions, SelectTravelesList } from '../../constants/options';
import { AI_PROMPT } from '../../constants/options';

function CreateTrip() {
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    if(name=='days'&&value>5){
      console.log("pl enter trip days less than or equal 5")
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
  
 const FINAL_PROMPT = AI_PROMPT
  .replace('{location}', formData?.location || '')
  .replace('{totalDays}', formData?.days || '')
  .replace('{traveler}', formData?.travelWith || '')
  .replace('{budget}', formData?.budget || '')
  .replace('{totalDays}', formData?.days || '');



  console.log(FINAL_PROMPT);

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
        <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
        <div className="flex gap-6">
          {SelectBudgetOptions.map((item, index) => (
            <button
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`flex items-center justify-between border border-gray-300 rounded-lg px-6 py-4 text-left cursor-pointer hover:shadow-lg transition-all bg-white w-full
                ${formData?.budget==item.title&&'shadow-lg border-black'}
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
              className="flex items-center justify-between border border-gray-300 rounded-lg px-6 py-4 text-left cursor-pointer hover:shadow-lg transition-all bg-white w-full"
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
      <Button
        variant={null}
        size="lg"
        className="mt-6 bg-gradient-to-r from-gray-800 to-black text-white hover:from-gray-700 hover:to-gray-900 transition-colors duration-300 font-bold"
        onClick={() => console.log('Final Data:', formData)}
      >
        Generate Trip
      </Button>
    </div>
  );
}

export default CreateTrip;
