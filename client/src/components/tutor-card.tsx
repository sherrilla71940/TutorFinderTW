import React from 'react';
import TutorInterface from '../custom-types/tutor-interface';
// import { NavLink } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

type Props = {
  tutor: TutorInterface,
  tutorKey: string;
}

function TutorCard ({tutor, tutorKey}: Props) {
  // const navigate = useNavigate();
  // trying to use navlink intead for active affect

  return (
    // <div key={key} onClick={
    //   navigate(`tutors/${key}`);
    // }>ß

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
        {/* <div>Average rate:
          {

          }
        </div> */}
        {tutor.inPerson ? <div className='tag'>In-person</div> : null}
        {tutor.remote ? <div className='tag'>Remote</div> : null}
    </NavLink>
);
}
export default TutorCard;