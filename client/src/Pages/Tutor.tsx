import React from 'react';
import { useParams } from 'react-router-dom';
import TutorInterface from '../custom-types/tutor-interface';
import { useState, useEffect } from 'react';


type Props = {
  tutors: TutorInterface[]
}


function Tutor ({tutors}: Props) {
  const {id} = useParams();
  const [tutor, setTutor] = useState<TutorInterface>({} as TutorInterface);

  useEffect(() => {
    const foundTutor = tutors.find(tutor => tutor._id === id);
    if (foundTutor) setTutor(foundTutor);
  });

  return (
    <>
      <img src={tutor.profileUrl} alt={tutor.name && tutor.name.split(' ')[0] + '\'s profile picture'} />
      <h2>{tutor.name}</h2>
      <h2>{tutor.age}</h2>
      <h2>{tutor.gender}</h2>
      <h2>{tutor.email}</h2>
      {tutor.selfIntroduction ? <p>{tutor.selfIntroduction}</p> : ''}
      {tutor.inPerson ? <div>In-person</div> : ''}
      {tutor.remote ? <div>Remote</div> : ''}
      {/* <table className='subjects-table'>
        {tutor.subjects && tutor.subjects.map(subject => {
          return (
          <tr key={subject.subject}>
            <th>{subject.subject}</th>
            {
              subject.branches && subject.branches.map(branch => {
                return (
                  <>
                    <td key={branch.branch}>{branch.branch}</td>
                    <td key={branch.hourlyRate}>{branch.hourlyRate}</td>
                  </>
                );
              })
            }

          </tr>
          );
        })}
      </table> */}
      <table>
        <tr>
        {tutor.subjects&& tutor.subjects.map(subject => {
          return (
              <th key={subject.subject}>{subject.subject}</th>
          );
        })}
        </tr>
        {tutor.subjects && tutor.subjects.map(subject => {
          return (
            subject.branches.map(branch => {
              return (
                <tr key={branch.branch}>
                  <td>{branch.branch}</td>
                  <td>{branch.hourlyRate}</td>
                </tr>
              );
            })
          );
        })}


      </table>

    </>
  );
}

export default Tutor;