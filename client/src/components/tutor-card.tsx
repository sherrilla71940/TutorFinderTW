import React from 'react';
import TutorInterface from '../custom-types/types';
import { NavLink } from 'react-router-dom';

type Props = {
  tutor: TutorInterface,
  tutorKey: string;
}

function TutorCard({ tutor, tutorKey }: Props) {

  return (
    // it appears that adding class name to tag remove colors applied to ative effect from navlink
    <NavLink key={tutorKey} to={tutorKey}>
      <div className="card m-2 is-flex
      is-flex-direction-column
      is-flex-justify-content-space-evenly">

        <div className='card-image'>
          <figure className='image is-1by1'>
            <img src={tutor.profilePicUrl} alt={tutor.name + '\'s profile picture'} />
          </figure>
        </div>
        <div className='card-content'>
          <p className='title is-5'>{tutor.name}</p>
          <p className='subtitle is-6'>{tutor.age}</p> 
            {
              tutor.teachingLocations?.map((location) => {
                return (
                  <span key={location.city}>{location.city} </span>
                  );
                })
              }
          <div className='mb-2'>
            {
              tutor.subjects.map((subObj) => {
                return (
                  <span key={subObj.subject}>{subObj.subject} </span>
                );
              })
            }
          </div>


        </div>

        <div className='card-footer'>
          {tutor.inPerson ? <div className='tag is-success m-1'>In-person</div> : null}
          {tutor.remote ? <div className='tag is-link m-1'>Remote</div> : null}
        </div>
      </div>
    </NavLink>
  );
}
export default TutorCard;