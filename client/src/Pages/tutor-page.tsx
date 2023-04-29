import React from 'react';
import { useParams } from 'react-router-dom';
import TutorInterface from '../custom-types/types';
import { useState, useEffect } from 'react';
import NotFound from './not-found-page';

type Props = {
  tutors: TutorInterface[];
};

function TutorPage({ tutors }: Props) {
  const { id } = useParams();
  const [tutor, setTutor] = useState<TutorInterface>({} as TutorInterface);

  useEffect(() => {
    const foundTutor = tutors.find((tutor) => tutor._id === id);
    if (foundTutor) setTutor(foundTutor);
  });

  // not sure why this doesnt work: if (!tutor) return <NotFound/>, but line below works
  // answer: because if tutor does not exist and we try to access prop on it, it will throw an error instead so it would return neither component. This is JS behaviour
  if (!tutor.name) return <NotFound />;

  else {
    return (
      <>
        <section className='section is-flex is-flex-direction-row'>
          <figure className='image mr-2'>
            <img src={tutor.profilePicUrl} alt='tutor image' />
          </figure>
          <div>
            <h1 className='title'>{tutor.name}</h1>
            <p className='subtitle'>{tutor.age}</p>
            <p className='subtitle'>{tutor.email}</p>
            {tutor.inPerson ? <div className='tag is-primary m-1'>In-person</div> : null}
            {tutor.remote ? <div className='tag is-link m-1'>Remote</div> : null}
          </div>
        </section>
        <section className='section'>
          <p className='subtitle'>{tutor.selfIntroduction || 'This tutor has yet to make an introduction!'}</p>
        </section>
        <section className='section is-flex is-justify-content-space-around is-flex-wrap-wrap'>
          {tutor.subjects &&
            tutor.subjects.map((subject) => {
              return (
                <>
                <div>
                  <p className='title'>{subject.subject}</p>
                  <table key={subject.subject} className='table is-fullwidth'>
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
                </div>
                </>
              );
            })}
        </section>
      </>
    );
  }

}

export default TutorPage;

