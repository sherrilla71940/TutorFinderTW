import React from 'react';
import { Tutor, User } from '../custom-types/types';
import TutorCard from '../components/tutor-card';
import { useEffect } from 'react';

type Props = {
  tutors: Tutor[]
}

function TutorsList({ tutors }: Props) {

  if (!tutors) {
    return null;
  } else {
    return (
      <>
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
}

export default TutorsList;