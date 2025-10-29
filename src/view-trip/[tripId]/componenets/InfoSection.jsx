import React from 'react'

function InfoSection({ trip }) {
  return (
    <div>
      <img
        src={"/new.jpg" || "https://drive.google.com/file/d/1ezlABpXxLRlscglBpPlwsa46r35SZmSM/view?usp=drive_link" }
        className="h-[360px] w-full object-cover rounded-lg"
      />
      <div className=" align-bottom">
        <h2 className="font-bold  ">📍{trip?.userSelection?.location}</h2> 
        <div className="flex gap-5">
          <h3 className="font-bold gap-10 ">
            📅{trip.userSelection?.days} Days            💰                                    
          </h3>
          <h3 className="font-bold">
            {trip.userSelection?.budget}    Budget        
          </h3>
          <h3 className="font-bold">
            🧳Travel With : {trip.userSelection?.travelWith}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default InfoSection