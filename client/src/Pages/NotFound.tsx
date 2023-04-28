import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from '../components/nav-bar';

function NotFound () {
  return (
    <>
      <NavBar />
      <h1>Content Not Found</h1>
    </>
  );
}

export default NotFound;