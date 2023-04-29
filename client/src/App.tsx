import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import TutorsList from './Pages/tutors-list';
import TutorPage from './Pages/tutor-page';
import Register from './Pages/tutor-registration';
import NotFound from './Pages/not-found-page';
import StudentSignUpForm from './Pages/student-registration';
import Chats from './Pages/chats';

import { useState, useEffect } from 'react';
import fetchFunction from './api-services';
import TutorInterface from './custom-types/types';
import NavBar from './components/nav-bar';

// have a global state for tutors,
// and when create profile form is submitted,
// make post request to server, and then re-fetch all tutors, and change global tutors state, so that home page will
// refresh when redirecting

function App() {

  const [tutors, setTutors] = useState<TutorInterface[]>([]);

  function setTutorsFunc(data: TutorInterface[]) {
    setTutors(data);
  }

  async function postTutorAndRedirect(userFormData: TutorInterface) {
    // if (!allNewTutorSubjectsArr.length) return;
    try {
      console.log(userFormData)
      // await fetchFunction(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`, 'POST', tutorsSetter, userFormData);
      await fetchFunction(`http://localhost:8080`, 'POST', setTutorsFunc, userFormData);
      // setSubmissionFailure(false);
      // navigate('/');
    } catch (e) {
      console.log(e);
      // if formsubmissionfailure is set to true, render extra 'failed to submit' component
      // setSubmissionFailure(true);
    }
  }




  useEffect(() => {
    (async () => {
      try {
        // await fetchFunction(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`, 'GET', setTutors);
        await fetchFunction(`http://localhost:8080`, 'GET', setTutorsFunc);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutors">
          <Route index element={<TutorsList tutors={tutors} />} />
          <Route path=":id" element={<TutorPage tutors={tutors} />} />
        </Route>
        <Route path="/register" element={<Register postTutorAndRedirect={postTutorAndRedirect} />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/studentsignup' element={<StudentSignUpForm />} />
        <Route path='/chats' element={<Chats tutors={tutors}/>} />
      </Routes>
    </>
  );
}

export default App;
