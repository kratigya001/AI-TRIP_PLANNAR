import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section
      className="relative w-full h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1650&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 px-6 max-w-4xl">
        <h1 className="font-extrabold text-4xl md:text-6xl leading-tight text-center">
          Discover Your Next <span className="text-blue-400">Adventure</span> <br />
          with <span className="text-yellow-300">AI</span>-Powered Itineraries
        </h1>

        <p className="mt-6 text-center md:text-xl text-gray-200">
          Your personal trip planner and travel curator — creating custom journeys
          tailored to your interests, time, and budget.
        </p>

        <Link to="/create_trip">
          <button className="mt-8 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-extrabold rounded-full shadow-lg transition-transform transform hover:scale-105">
            Get Started — It’s Free
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;
