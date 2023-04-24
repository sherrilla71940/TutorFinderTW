import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TutorInterface from '../custom-types/tutor-interface';
// import { Outlet } from 'react-router-dom';

// type Props = {
//   tutors: TutorInterface[] | []
// }

function Home () {

  const navigate = useNavigate();

  return (
    <>
      <p>
        TutorFinderTW allows you to find tutors based in Taiwan. Here you can find tutors that teach in person or remotely, or even both! A wide variety of subjects/branches are offered by tutors at different prices, and you can even become one yourself for free by registering!
      </p>

        <div>
          <button onClick={() => navigate('/register')}>Become a Tutor</button>
        </div>

        <div>
        <button onClick={() => navigate('/tutors')}>Find Tutors</button>
        </div>
        {/* <Outlet></Outlet> */}
    </>
  );
}

export default Home;