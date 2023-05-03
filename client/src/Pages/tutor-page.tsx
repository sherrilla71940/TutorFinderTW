import React from 'react';
import { useParams } from 'react-router-dom';
import { Tutor } from '../custom-types/types';
import { useState, useEffect } from 'react';
import NotFound from './not-found-page';
import { useNavigate } from 'react-router-dom';

type Props = {
  tutors: Tutor[],
  setCurrentTutor: (tutor: Tutor) => void
};

const styleObj = {
  maxWidth: '60%'
}


function TutorPage({ tutors, setCurrentTutor }: Props) {
  const { id } = useParams();
  const [tutor, setTutor] = useState<Tutor>({} as Tutor);
  
  const navigate = useNavigate();

  function contactTutor(): void {
    // SAVE ID OF A TUTOR WE PLAN TO CHAT WITH TO APP STATE
    const theOne = tutors.find((tutor) => tutor._id === id)
    setCurrentTutor(theOne!);
    console.log('Setting current tutor to:', theOne);
    navigate('/chats');
  }

  useEffect(() => {
    const foundTutor = tutors.find((tutor) => tutor._id === id);
    if (foundTutor) setTutor(foundTutor);
  });

  if (!tutor.name) return <NotFound />;

  else {
    return (
      <>
        <section className='section is-flex is-flex-direction-row is-justify-content-space-around is-flex-wrap-wrap'>
          <div className='box is-flex'>
          <figure className='image is-align-self-center mr-4'>
            <img src={tutor.profilePicUrl} alt='tutor image' />
          </figure>
          <div>
            <h1 className='title'>{tutor.name}</h1>
            <p className='subtitle'>{tutor.age}</p>
            <p className='subtitle'>{tutor.email}</p>
            <p className='subtitle'>{tutor.tutorDetails.teachingLocation}</p>
            {tutor.tutorDetails.inPerson ? <div className='tag is-primary m-1'>In-person</div> : null}
            {tutor.tutorDetails.remote ? <div className='tag is-link m-1'>Remote</div> : null}
          </div>
          </div>
          <div className='box' style={styleObj}>
          <p className='subtitle'>{tutor.selfIntroduction || 'This tutor has yet to make an introduction!'}</p>
          { sessionStorage.getItem('type') === 'student' ?
            <button className='button is-large is-danger is-align-self-center is-pulled-right' onClick={contactTutor}>Contact this tutor</button>
            : null
          }
          </div>
        </section>
        <section className='section is-flex is-justify-content-space-around is-flex-wrap-wrap'>
          {tutor.tutorDetails.subjects &&
            tutor.tutorDetails.subjects.map((subject) => {
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

