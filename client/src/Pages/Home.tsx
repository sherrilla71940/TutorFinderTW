import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fetchFunction from '../api-services';
import TutorInterface from '../custom-types/tutor-interface';


function Home () {
  const [tutors, setTutors] = useState<TutorInterface[] | []>([]);
  const navigate = useNavigate();

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
    <nav>
      <ul>
        <li>
          <NavLink to="/">Tutor Finder Home Page</NavLink>
        </li>
        {/* <li>
          <NavLink to="/register">Become a Tutor</NavLink>
        </li> */}
      </ul>
    </nav>
    <p>
      TutorFinderTW allows you to find tutors based in Taiwan. Depending on your needs, you can find tutors that teach in person or remotely, or even both! A wide variety of subjects/branches are offered by tutors, and you can even become one yourself for free by registering!
    </p>
      <div>
        {
          tutors.map(tutor => <li key={tutor._id}>{tutor.name}</li>)
        }
      </div>

      <div>
        <button onClick={() => navigate('register')}>Become a Tutor</button>
      </div>
    </>
  );
}

export default Home;