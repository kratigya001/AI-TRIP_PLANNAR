import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../service/firebaseConfig';

function MyTrips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/');
      return;
    }

    const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);

    const tripsData = [];
    querySnapshot.forEach((doc) => {
      tripsData.push({ id: doc.id, ...doc.data() });
    });

    setTrips(tripsData);
  };

  return (
    <div
      style={{
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
      }}
    >
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '40px', color: '#222' }}>
        <u>My Trips</u>
      </h1>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        {trips.map((trip) => (
          <div
            key={trip.id}
            style={{
              width: '300px',
              border: '1px solid #ddd',
              borderRadius: '12px',
              padding: '20px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#333' }}>
              {trip.userSelection?.location || 'Unknown Location'}
            </h3>
            <p style={{ margin: '6px 0', color: '#444' }}>
              <strong>Budget:</strong> {trip.userSelection?.budget}
            </p>
            <p style={{ margin: '6px 0', color: '#444' }}>
              <strong>Traveler:</strong> {trip.userSelection?.travelWith}
            </p>
            <p style={{ margin: '6px 0', color: '#444' }}>
              <strong>Days:</strong> {trip.userSelection?.days}
            </p>

            {/* ✅ Correct link for opening trip details */}
            <Link to={`/view-trip/${trip.id}`} style={{ textDecoration: 'none' }}>
              <button
                style={{
                  marginTop: '15px',
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e40af')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
              >
                👁️ View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
