// ✅ Import icons from react-icons
import { AiFillHome, AiFillStar } from "react-icons/ai";
import { FaPlane } from 'react-icons/fa';
import { FaBeer, FaUsers, FaUmbrellaBeach, FaGlassCheers } from "react-icons/fa";
import { MdOutlineFamilyRestroom, MdOutlineAttachMoney } from "react-icons/md";
import {  FaMoneyBillWave } from "react-icons/fa";
// Your array with icons
export const SelectTravelesList = [
{
   id: 1,
   title: 'Just Me',
   desc: 'A sole traveler in exploration',
   icon: <FaPlane size={24} color="blue" />,
   people: '1 Person'
 },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travelers in tandem',
    icon: <FaGlassCheers size={24} color="goldenrod" />,
    people: '2 People'
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun-loving adventurers',
    icon: <MdOutlineFamilyRestroom size={24} color="green" />,
    people: '3 to 5 People'
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seekers',
    icon: <FaUsers size={24} color="purple" />,
    people: '5 to 10 People'
  },
];

// Budget options array
export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: <FaBeer size={24} color="orange" />,

  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep costs on the average side',
    icon: <MdOutlineAttachMoney size={24} color="green" />,

  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Don’t worry about cost',
    icon: <FaMoneyBillWave size={24} color="gold" />,
  },
];

// AI Prompt
export const AI_PROMPT = `You are an expert travel API. Your only function is to return a travel plan in a valid JSON format. You must adhere strictly to the JSON structure, field names, valid image urls(from unsplash) and data types provided in the "JSON_STRUCTURE_TEMPLATE". Do not add any extra fields, explanations, or text outside of the JSON object. All field names must be in camelCase. ### INPUT_DATA: - location: "{location}" - totalDays: {totalDays} - traveler: "{traveler}" - budget: "{budget}" ### JSON_STRUCTURE_TEMPLATE: { "tripSummary": { "location": "string", "totalDays": "number", "traveler": "string", "budget": "string" }, "hotelOptions": [ { "hotelName": "string", "hotelAddress": "string", "priceRange": "string", "hotelImageUrl": "string (URL)", "geoCoordinates": { "latitude": "number", "longitude": "number" }, "rating": "number (1.0 to 5.0)", "description": "string" } ], "itinerary": [ { "day": "number", "dayTitle": "string", "dailySummary": "string", "schedule": [ { "placeName": "string", "placeDetails": "string", "geoCoordinates": { "latitude": "number", "longitude": "number" }, "ticketPricing": "string"(rupees), "rating": "number (1.0 to 5.0)", "time": "string (e.g., '10:00 AM - 1:00 PM')" } ] } ] } ### TASK: Generate the JSON output for the provided "INPUT_DATA" by filling the "JSON_STRUCTURE_TEMPLATE" with real, relevant information.`;



// export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDays} days for {traveler} with a {budget} budget, Give me a Hotels options List with HotelName, Hotel address as {hoteladdress}, price, hotel image url, geo coordinates ,rating, descriptions and suggest itinerary with placeName, place Details, Place Image url , geo coordinates, ticket pricing , rating , time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format';
