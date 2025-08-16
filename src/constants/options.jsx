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
export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDays} days for {traveler} with a {budget} budget, Give me a Hotels options List with HotelName, Hotel address, price, hotel image url, geo coordinates ,rating, descriptions and suggest itinerary with placeName, place Details, Place Image url , geo coordinates, ticket pricing , rating , time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format';
