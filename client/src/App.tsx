import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import TutorsList from './Pages/tutors-list';
import TutorPage from './Pages/tutor-page';
import Register from './Pages/Register';
import NotFound from './Pages/not-found-page';
import StudentSignUpForm from './Pages/student-registration';

import { useState, useEffect } from 'react';
import fetchFunction from './api-services';
import TutorInterface from './custom-types/types';

// have a global state for tutors,
// and when create profile form is submitted,
// make post request to server, and then re-fetch all tutors, and change global tutors state, so that home page will
// refresh when redirecting

function App() {

  const [tutors, setTutors] = useState<TutorInterface[]>([]);

  function setTutorsFunc(data: TutorInterface[] | ((prevState: TutorInterface[]) => TutorInterface[])) {
    setTutors(data);
  }

  useEffect(() => {
    (async () => {
      try {
        // await fetchFunction(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`, 'GET', setTutors);
        await fetchFunction(`http://localhost:8080`, 'GET', setTutors);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.classless.min.css" /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutors">
          <Route index element={<TutorsList tutors={tutors} />} />
          <Route path=":id" element={<TutorPage tutors={tutors} />} />
        </Route>
        <Route path="/register" element={<Register tutorsSetter={setTutorsFunc} />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/studentsignup' element={<StudentSignUpForm />} />
      </Routes>
      {/* <Outlet/> */}
    </>
  );
}

export default App;
