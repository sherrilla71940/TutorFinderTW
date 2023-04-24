import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Tutors from './Pages/Tutors';
import Tutor from './Pages/Tutor';
import Register from './Pages/Register';
import NotFound from './Pages/NotFound';

import { useState, useEffect } from 'react';
import fetchFunction from './api-services';
import TutorInterface from './custom-types/tutor-interface';
// import { Outlet } from 'react-router-dom';
// import Tutors from './Tutors';

// have a global state for tutors,
// and when create profile form is submitted,
// make post request to server, and then re-fetch all tutors, and change global tutors state, so that home page will
// refresh when redirecting

function App() {

  const [tutors, setTutors] = useState<TutorInterface[]>([]);

  useEffect(() => {
    (async () => {
      try {
        // will later if enough time figure out how to get import port from .env and set up react to run on that port
        await fetchFunction('http://localhost:8080', 'GET', setTutors);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(tutors);
  }, [tutors]);
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
          {/* <Route path="home" index element ={<Home/>}/> */}
          <Route path="/tutors">
              <Route index element={<Tutors tutors={tutors}/>}/>
              <Route path=":id" element={<Tutor tutors={tutors}/>}/>
          </Route>
          <Route path="/register" element={<Register/>}/>
          <Route path='*' element={<NotFound/>}/>
      </Routes>
      {/* <Outlet/> */}
    </>
    );
}

export default App;
