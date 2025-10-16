import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/custom/Header'; // Make sure this path is correct

function Root() {
  return (
    <>
      <Header />
      {/* Your page components will be rendered in place of <Outlet /> */}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Root;