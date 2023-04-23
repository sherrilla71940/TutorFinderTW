import React from 'react';
import {Routes, Route, NavLink} from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Tutors from './Pages/Tutors';
import Tutor from './Pages/Tutor';
import Register from './Pages/Register';
import NotFound from './Pages/NotFound';

// have a global state for tutors,
// and when create profile form is submitted,
// make post request to server, and then re-fetch all tutors, and change global tutors state, so that home page will
// refresh when redirecting

function App() {
  return (
  <>
  {/* <nav>
    <ul>
      <li>
        <NavLink to="/">Home Page</NavLink>
      </li>
      <li>
        <NavLink to="/tutors">Tutors Page</NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/tutor">Tutor Page</NavLink>
      </li>
    </ul>
  </nav> */}
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/tutors" element={<Tutors/>}/>
      <Route path="/tutors/:id" element={<Tutor/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path='/*' element={<NotFound/>}/>
    </Routes>
  </>
  );
}

export default App;
