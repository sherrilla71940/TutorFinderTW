import React from 'react';
import TutorInterface from '../custom-types/tutor-interface';
import TutorCard from '../components/tutor-card';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

type Props = {
  tutors: TutorInterface[]
}



function Tutors ({tutors}: Props) {

  useEffect(() => console.log('updated tutors'), [tutors])

  return (
    <>
    <nav>
      <ul>
        <li>
          <NavLink to="/">Tutor Finder Home Page</NavLink>
        </li>
        <li>
          <NavLink to="/register">Become a Tutor</NavLink>
        </li>
      </ul>
    </nav>

      <div>
        {
          tutors.map((tutor) => {
            return (
              <TutorCard key={tutor._id as string} tutorKey={tutor._id as string} tutor={tutor}/>
            );
          })
        }
      </div>
    </>
  );
}

export default Tutors;