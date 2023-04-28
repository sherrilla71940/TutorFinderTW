import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/nav-bar';

function Home() {

  const navigate = useNavigate();

  return (
    <>
    <NavBar />
    <div id='home-body'>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className='nav-link'>Tutor Finder Home Page</NavLink>
          </li>
        </ul>
      </nav>
      <p>
        TutorFinderTW allows you to find tutors based in Taiwan. Here you can find tutors that teach in person or remotely, or even both! A wide variety of subjects/branches are offered by tutors at different prices, and you can even become one yourself for free by registering!
      </p>
      <div id='home-buttons-container'>
        <div>
          <button onClick={() => navigate('/register')}>Become a Tutor</button>
        </div>
        <div>
          <button onClick={() => navigate('/tutors')}>Find Tutors</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;