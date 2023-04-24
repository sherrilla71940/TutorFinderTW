import React from 'react';
import { NavLink } from 'react-router-dom';

function NotFound () {
  return (
    <>
      <nav>
      <ul>
        <li>
          <NavLink to="/">Tutor Finder Home Page</NavLink>
        </li>
        <li>
          <NavLink to="/tutors">Find Tutors</NavLink>
        </li>
        <li>
          <NavLink to="/register">Become a Tutor</NavLink>
        </li>
      </ul>
    </nav>
      <h1>Content Not Found</h1>
    </>
  );
}

export default NotFound;