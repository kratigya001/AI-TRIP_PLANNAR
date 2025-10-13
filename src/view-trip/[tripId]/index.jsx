import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../service/firebaseConfig';
import InfoSection from './componenets/InfoSection';
import Hotels from './componenets/Hotels';
import Placestovisit from './componenets/Placestovisit';
import Footer from './componenets/Footer';

function Viewtrip() {
    const {tripId}=useParams();
    const [trip,setTrip]=useState({});

    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])
    // Used to get trip info from firebase

    const GetTripData=async()=>{
        const docRef=doc(db, "AITrips", tripId);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document:",docSnap.data());
            setTrip(docSnap.data());

        }
        else{
            console.log("No such document");
           // toast('No trip Found!')
        }
    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* Information section */}
        <InfoSection trip={trip}/>

        {/* Recommended Hotels */}
        <Hotels trip={trip}/>

        {/* Daily Plan */}
        <Placestovisit trip={trip} />

        {/* footer */}
        <Footer trip={trip} />
         </div>
  )
}

export default Viewtrip
