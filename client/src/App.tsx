import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import TutorsList from './Pages/tutors-list';
import TutorPage from './Pages/tutor-page';
import CompleteTutorDetails from './Pages/tutor-registration';
import NotFound from './Pages/not-found-page';
import SignUpForm from './Pages/user-registration';
import ChatsStudentSide from './Pages/chats-student-side';

import { useState, useEffect } from 'react';
import fetchFunction from './api-services';
import { Tutor } from './custom-types/types';
import NavBar from './components/nav-bar';
import CompleteStudentDetails from './Pages/student-registration';
import ChatsTutorSide from './Pages/chats-tutor-side';
import { PORT } from './env';

// have a global state for tutors,
// and when create profile form is submitted,
// make post request to server, and then re-fetch all tutors, and change global tutors state, so that home page will
// refresh when redirecting

function App() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [currentTutor, setCurrentTutor] = useState({} as Tutor);

  useEffect(() => {
    (async () => {
      try {
        await fetchFunction(`http://localhost:${PORT}/tutors`,
          'GET',
          setTutors);
      } catch (error) {
        console.log(error);
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
          <Route path=":id" element={<TutorPage tutors={tutors} setCurrentTutor={setCurrentTutor} />} />
        </Route>
        <Route path="/tutorDetailsForm" element={<CompleteTutorDetails />} />
        <Route path="/studentDetailsForm" element={<CompleteStudentDetails />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/chats' element={
          sessionStorage.getItem('type') === 'student' ?
            <ChatsStudentSide tutors={tutors} currentTutor={currentTutor} setCurrentTutor={setCurrentTutor} />
            : <ChatsTutorSide tutors={tutors} />
        } />
      </Routes>
    </>
  );
}

export default App;
