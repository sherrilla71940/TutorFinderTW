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

// have a global state for tutors,
// and when create profile form is submitted,
// make post request to server, and then re-fetch all tutors, and change global tutors state, so that home page will
// refresh when redirecting

function App() {

  const [tutors, setTutors] = useState<TutorInterface[]>([]);

  function setTutorsFunc (data: any) {
    setTutors(data);
  }

  useEffect(() => {
    (async () => {
      try {
        await fetchFunction(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`, 'GET', setTutors);
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
      <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path="/tutors">
              <Route index element={<Tutors tutors={tutors}/>}/>
              <Route path=":id" element={<Tutor tutors={tutors}/>}/>
          </Route>
          <Route path="/register" element={<Register tutorsSetter={setTutorsFunc}/>}/>
          <Route path='*' element={<NotFound/>}/>
      </Routes>
      {/* <Outlet/> */}
    </>
    );
}

export default App;
