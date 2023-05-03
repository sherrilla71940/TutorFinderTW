import React, { useEffect, useState } from 'react';
import { Tutor } from '../custom-types/types';
import { NavLink } from 'react-router-dom';
import getImage from '../utils/image-getter';

type Props = {
  tutor: Tutor,
  tutorKey: string;
}

export default function TutorCard({ tutor, tutorKey }: Props) {

  useEffect(() => {
    (async () => {
      const url = await getImage(tutor.picPath as string);
      document.getElementById('tutor-pic')?.setAttribute('src', url as string);
    })();
  }, [])

  if (tutor.tutorDetails) {
    return (
      <NavLink key={tutorKey} to={tutorKey}>
        <div className="card m-2 is-flex
      is-flex-direction-column
      is-flex-justify-content-space-evenly">
          <div className='card-image'>
            <figure className='image is-1by1'>
              <img id="tutor-pic" alt={tutor.name + '\'s profile picture'} />
            </figure>
          </div>
          <div className='card-content'>
            <p className='title is-5'>{tutor.name}</p>
            <p className='subtitle is-6'>{tutor.age}</p>
            <p className='subtitle is-6'>{tutor.tutorDetails.teachingLocation}</p>
            <div className='mb-2'>
              {
                tutor.tutorDetails.subjects.map((subObj) => {
                  return (
                    <span key={subObj.subject}>{subObj.subject} </span>
                  );
                })
              }
            </div>
          </div>
          <div className='card-footer'>
            {tutor.tutorDetails.inPerson ? <div className='tag is-success m-1'>In-person</div> : null}
            {tutor.tutorDetails.remote ? <div className='tag is-link m-1'>Remote</div> : null}
          </div>
        </div>
      </NavLink>
    );
  } else {
    return (
      <div hidden></div>
    );
  }
}