import React from 'react'

function Header() {
  return (
    <div className="w-full p-2 shadow-sm flex justify-between items-center bg-white">
      <img src="/logo.svg" alt="Logo" className="h-10" />
      <div>
        <button>Sign In</button>
      </div>
    </div>
  );
}

 
export default Header