import React from 'react';
import TutorInterface from '../custom-types/tutor-interface';
import TutorCard from '../components/tutor-card';

type Props = {
  tutors: TutorInterface[]
}

function Tutors ({tutors}: Props) {
  return (
    <div>
      {
        tutors.map((tutor) => {
          return (
            <TutorCard key={tutor._id as string} tutorKey={tutor._id as string} tutor={tutor}/>
          );
        })
      }
    </div>
  );
}

export default Tutors;