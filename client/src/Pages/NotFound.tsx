import React from 'react';
import { NavLink } from 'react-router-dom';

function NotFound () {
  return (
    <>
      <nav>
      <ul>
        <li>
          <NavLink to="/" className='nav-link'>Tutor Finder Home Page</NavLink>
        </li>
        <li>
          <NavLink to="/tutors" className='nav-link'>Find Tutors</NavLink>
        </li>
        <li>
          <NavLink to="/register" className='nav-link'>Become a Tutor</NavLink>
        </li>
      </ul>
    </nav>
      <h1>Content Not Found</h1>
    </>
  );
}

export default NotFound;