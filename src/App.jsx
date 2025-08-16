import { useState } from 'react';
import './App.css';
import Hero from './components/custom/Hero';
// import MapboxPlacesAutocomplete from './components/create_trip/MapboxPlacesAutocomplete.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Hero />
      <div style={{ padding: "20px" }}>
      </div>
    </>
  );
}

export default App;
