import React from 'react';
import TutorInterface from '../custom-types/types';
import TutorCard from '../components/tutor-card';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar from '../components/nav-bar';

type Props = {
  tutors: TutorInterface[]
}



function Tutors({ tutors }: Props) {

  useEffect(() => console.log('updated tutors'), [tutors])

  return (
    <>
      <NavBar />
      <div id='tutor-cards-wrapper'>
        {
          tutors.map((tutor) => {
            return (
              <TutorCard key={tutor._id as string} tutorKey={tutor._id as string} tutor={tutor} />
            );
          })
        }
      </div>
    </>
  );
}

export default Tutors;