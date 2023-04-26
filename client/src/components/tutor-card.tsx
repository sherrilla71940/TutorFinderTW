import React from 'react';
import TutorInterface from '../custom-types/tutor-interface';
import { NavLink } from 'react-router-dom';

type Props = {
  tutor: TutorInterface,
  tutorKey: string;
}

function TutorCard ({tutor, tutorKey}: Props) {

  return (
    // it appears that adding class name to tag remove colors applied to ative effect from navlink
    <NavLink key={tutorKey} className="tutor-card" to={tutorKey}>
        <img src={tutor.profileUrl} alt={tutor.name + '\'s profile picture'} />
        <div>{tutor.name}</div>
        <div>{tutor.gender}</div>
        <div>{tutor.age}</div>
        <div>
          {
            tutor.subjects.map((subObj) => {
              return (
                <div key={subObj.subject} className='course'>{subObj.subject}</div>
            );
          })
          }
        </div>
        {tutor.inPerson ? <div className='tag'>In-person</div> : null}
        {tutor.remote ? <div className='tag'>Remote</div> : null}
    </NavLink>
);
}
export default TutorCard;