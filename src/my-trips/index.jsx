import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
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

  // ✅ Delete function with confirmation
  const handleDelete = async (tripId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete Trip ?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'AITrips', tripId));
      setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
    //  alert('Trip deleted successfully!');
    } catch (error) {
      console.error('Error deleting trip:', error);
      alert('Failed to delete trip.');
    }
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
              position: 'relative', // for delete button
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
            {/* 🗑️ Delete Button */}
            <button
              onClick={() => handleDelete(trip.id)}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b91c1c')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ef4444')}
              title="Delete Trip"
            >
              🗑️
            </button>

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
