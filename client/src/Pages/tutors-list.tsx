import React from 'react';
import TutorInterface from '../custom-types/types';
import TutorCard from '../components/tutor-card';
import { useEffect } from 'react';
import NavBar from '../components/nav-bar';

type Props = {
  tutors: TutorInterface[]
}

function TutorsList({ tutors }: Props) {

  useEffect(() => console.log('updated tutors'), [tutors])

  return (
    <>
      <NavBar />
      <div className='container is-flex is-flex-direction-row is-flex-wrap-wrap'>
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

export default TutorsList;