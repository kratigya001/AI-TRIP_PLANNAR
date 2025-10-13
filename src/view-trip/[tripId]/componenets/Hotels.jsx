import React from 'react';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
  return (
    <div>
      <h1 className='font-bold text-xl mt-5'><u>Hotel Recommendations </u></h1>
      
      {/* 1. Set grid to 3 columns for all screen sizes */}
      <div className='portal'> 
     {(trip?.tripData?.travelPlan?.hotelOptions || trip?.tripData?.hotelOptions || []).map((hotel, index) => (
      <Link
            key={index}
            to={
              'https://www.google.com/maps/search/?api=1&query=' +
              encodeURIComponent(
                (hotel.HotelName || hotel.hotelName || '') + ', ' +
                (hotel.HotelAddress || hotel.Hoteladdress || hotel.address || hotel.hotelAddress || hotel.hoteladdress || '')
              )
            }
            target="_blank"
            className="no-underline text-black hover:text-blue-600"
          >  
          <div  className="h-64">  
      <img 
        src={hotel?.hotelImageURL || hotel?.hotelImageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"} 
        onError={(e) => {
         e.target.onerror = null; // prevents infinite loop if fallback fails
         e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
  }}
        className="w-full h-[350px] object-cover rounded-lg" 
        alt={hotel.hotelName}
      />
      <div>
        <h2 className='font-semibold mt-2'>{hotel.HotelName || hotel.hotelName}</h2>
        <h3 className='text-sm text-red-600'>📍{hotel.HotelAddress || hotel.Hoteladdress ||hotel.address || hotel.hotelAddress || hotel.hoteladdress} </h3>
        <h3>💰 {hotel.price || hotel.priceRange}  </h3>
        <h3>⭐{hotel.rating} stars </h3>
      </div>
    </div>
    </Link>
  ))}
</div>

    </div>
  );
}

export default Hotels;