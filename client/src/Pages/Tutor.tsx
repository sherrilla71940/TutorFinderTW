import React from 'react';
import { useParams, NavLink} from 'react-router-dom';
import TutorInterface from '../custom-types/tutor-interface';
import { useState, useEffect } from 'react';
import NotFound from './NotFound';

type Props = {
  tutors: TutorInterface[];
};

function Tutor({ tutors }: Props) {
  const { id } = useParams();
  const [tutor, setTutor] = useState<TutorInterface>({} as TutorInterface);

  useEffect(() => {
    const foundTutor = tutors.find((tutor) => tutor._id === id);
    if (foundTutor) setTutor(foundTutor);
  });

  // not sure why this doesnt work: if (!tutor) return <NotFound/>, but line below works
  // answer: because if tutor does not exist and we try to access prop on it, it will throw an error instead so it would return neither component. This is JS behaviour
  if (!tutor.name) return <NotFound/>;

  else {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/" className='nav-link'>Tutor Finder Home Page</NavLink>
            </li>
            <li>
              <NavLink to="/tutors" className='nav-link'>Find Tutors</NavLink>
            </li>
            <li>
              <NavLink to="/register" className='nav-link'>Become a Tutor</NavLink>
            </li>
          </ul>
        </nav>
          <div>
            <img
              src={tutor.profileUrl}
              alt={
                tutor.name && tutor.name.split(' ')[0] + "'s profile picture"
              }
            />
            <h2>{tutor.name}</h2>
            <h2>{tutor.age}</h2>
            <h2>{tutor.gender}</h2>
            <h2>{tutor.email}</h2>
            {tutor.selfIntroduction ? <p className='tutor-introduction'>{tutor.selfIntroduction}</p> : ''}
            {tutor.inPerson ? <div>In-person ✅</div> : ''}
            {tutor.remote ? <div>Remote ✅</div> : ''}
            {tutor.subjects &&
              tutor.subjects.map((subject) => {
                return (
                  <table key={subject.subject} border={1}>
                    <caption>{subject.subject}</caption>
                    <caption>{subject.subject}</caption>
                    <thead>
                      <tr>
                        <th>Branch</th>
                        <th>Hourly Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subject.branches.map((branch) => {
                        return (
                          <tr key={branch.branch}>
                            <td>{branch.branch}</td>
                            <td>{branch.hourlyRate}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                );
              })}
          </div>
      </div>
    );
  }

  }

export default Tutor;

