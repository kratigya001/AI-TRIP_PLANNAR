import React from 'react';
import { Link } from 'react-router-dom'; 

function Placestovisit({ trip }) {
  return (
    <div className="mt-8">
      <h1 className='font-bold text-xl'><u>Places To Visit </u></h1>
      
      {/* **FIX 3: Added a fallback `|| []` to prevent crash if itinerary is missing** */}
      {(trip?.tripData?.itinerary || []).map((dayPlan, index) => (
        <div key={index} className="mt-4">
          <h2 className='font-bold text-lg mb-3'>Day {dayPlan.day}</h2>
          
          <div className='portal'>
            {(dayPlan.dailyPlan ||dayPlan.schedule || []).map((place, placeIndex) => {
              const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`;

              return (
                <Link
                  key={placeIndex}
                  to={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline text-black"
                >
                  <div className="p-3 border rounded-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    {/* <img 
                        src={place.placeImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(place.placeName)}&background=random&color=fff&size=512`}
                           className='w-full h-48 object-cover rounded-lg' 
                      alt={place.placeName}
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/EEE/31343C?text=Image+Not+Available"; }}
                    /> */}
                    <div className="mt-2 flex-grow">
                      <h2 className='font-bold text-lg'>{place.placeName}</h2>
                      
                      <p className='text-sm text-gray-600 mt-1 h-24 overflow-y-auto'>
                        {place.placeDetails}
                      </p>

                      <div className='mt-4 text-sm'>
                        {/* Note: The **...** for bolding won't work in React. Using classes instead. */}
                        <p className='font-medium'>🕒 <span className="font-semibold">Time:</span> {place.timeTravel ||place.time|| 'Not specified'}</p>
                        <p className='font-medium mt-1'>💰 <span className="font-semibold">Tickets:</span> {place.ticketPricing || 'Not specified'}</p>
                        <p className='font-medium mt-1'>⭐ <span className="font-semibold">Rating:</span> {place.rating || 'N/A'} stars</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Placestovisit;
