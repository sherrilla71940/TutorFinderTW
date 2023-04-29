import React, { useState, useEffect, SetStateAction, FormEventHandler } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import TutorInterface, { Subject, Subjects } from '../custom-types/types';
type Props = {
  postTutorAndRedirect(data: TutorInterface): void
}


function Register({ postTutorAndRedirect }: Props) {

  const [userHasSubmit, setHasUserSubmit] = useState<boolean>(false);
  const [submissionFailure, setSubmissionFailure] = useState<boolean>(false);
  const [userFormData, setUserFormData] = useState<TutorInterface>({} as TutorInterface);

  const [newTutorProfileUrl, setNewTutorProfileUrl] = useState<string>('');
  const [newTutorName, setNewTutorName] = useState<string>('');
  const [newTutorAge, setNewTutorAge] = useState<number>(18);
  const [newTutorGender, setNewTutorGender] = useState<string>('male');
  const [newTutorEmail, setNewTutorEmail] = useState<string>('');
  const [newTutorIntroduction, setNewTutorIntroduction] = useState<string>('');
  const [newTutorInPerson, setNewTutorInPerson] = useState<boolean>(false);
  const [newTutorRemote, setNewTutorRemote] = useState<boolean>(false);

  const [newTutorSubjectName, setNewTutorSubjectName] = useState<string>('');
  const [newTutorSubjectBranchName, setNewTutorSubjectBranchName] = useState<string>('');
  const [newTutorSubjectBranchRate, setNewTutorSubjectBranchRate] = useState<number>(300);

  const [newTutorSubjectObj, setNewTutorSubjectObj] = useState<Subject>({} as Subject);
  const [allNewTutorSubjectsArr, setAllNewTutorSubjectsArr] = useState<Subjects>([] as Subjects);

  const navigate = useNavigate();




  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newTutor = {
      name: newTutorName,
      profilePicUrl: newTutorProfileUrl,
      age: newTutorAge,
      gender: newTutorGender,
      email: newTutorEmail,
      remote: newTutorRemote,
      subjects: allNewTutorSubjectsArr,
      inPerson: newTutorInPerson,
      selfIntroduction: newTutorIntroduction ? newTutorIntroduction : ''
    };

    await postTutorAndRedirect(newTutor as TutorInterface);
    navigate('/');
  }


  function addSubject(): Subject {
    const newSubj: Subject = {
      subject: newTutorSubjectName,
      branches: [{
        branch: newTutorSubjectBranchName,
        hourlyRate: newTutorSubjectBranchRate
      }]
    };

    let includesSubj = false;
    allNewTutorSubjectsArr.forEach(subObj => {
      if (subObj.subject === newSubj.subject) {
        includesSubj = true;
      }
    });

    if (!includesSubj) {
      setAllNewTutorSubjectsArr([...allNewTutorSubjectsArr, newSubj]);
    } else {
      const allSubjCopy = [...allNewTutorSubjectsArr];
      const transformedCopy = allSubjCopy.map(subObj => {
        if (subObj.subject === newSubj.subject) {
          return {
            subject: subObj.subject,
            branches: [...subObj.branches, ...newSubj.branches]
          }
        }
        return subObj;
      });
      setAllNewTutorSubjectsArr(transformedCopy);
    }
    return newSubj;
  }

  // tried making handleChange an async func, but realized that for some reason when i await setState and console.log state below that, the console.log does not wait for the await statement
  function handleChange<T>(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<T>>, value: SetStateAction<T>) {
    if (typeof value === 'string' && value.length < 1) return;

    console.log(newTutorName)
    setter(value);
  }

  return (
    <>
      <section className="p-6">
        <h2 className="title">New tutor sign up</h2>
        <form data-testid='form' action="" onSubmit={handleSubmit} id='tutor-registration-form'>

          <div className="field">
            <div className="control">
              <label htmlFor="profile" className='label'>*Your Profile Picture URL: </label>
              <input id="profile" data-testid='urlInput' className='input' type="text" value={newTutorProfileUrl} onChange={(e) => handleChange(e, setNewTutorProfileUrl, e.target.value)} name='profile' required />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label htmlFor="name" className='label'>*Your name: </label>
              <input className="input" id="name" data-testid='nameInput' type="text" value={newTutorName} name='name' required onChange={(e) => handleChange(e, setNewTutorName, e.target.value)} />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label htmlFor="email" className='label'>*Your email: </label>
              <input className='input' data-testid='emailInput' type="email" name="email" id="email" value={newTutorEmail} required onChange={(e) => handleChange(e, setNewTutorEmail, e.target.value)} />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label htmlFor="age" className='label'>*Your age: </label>
              <input id="age" className='input' data-testid='ageInput' type="number" name='age' min={0} max={150} defaultValue={18} required onChange={(e) => handleChange(e, setNewTutorAge, e.target.valueAsNumber)} />
            </div>
          </div>


          <div className="field">
            <div className="control">
              <label htmlFor="gender" className='label'>*Your gender: </label>
              <div className="select">
                <select data-testid='genderInput' name="gender" id="gender" required onChange={(e) => { handleChange(e, setNewTutorGender, e.target.value) }}>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className='label' htmlFor="introduction">Introduce Yourself: </label>
              <textarea className='textarea' name="introduction" id="introduction" cols={20} rows={5} onChange={(e) => handleChange(e, setNewTutorIntroduction, e.target.value)}></textarea>
            </div>
          </div>

          <label className='label'>*How you will teach: </label>
          <div className="field">
            <div className="control">
              <label className='checkbox' htmlFor="remote">
                <input type="checkbox" name="remote" id="remote" onChange={(e) => handleChange(e, setNewTutorRemote, e.target.checked)} />
                Remote
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className='checkbox' htmlFor="in-person">
                <input data-testid='inPersonInput' type="checkbox" name="in-person" id="in-person" onChange={(e) => handleChange(e, setNewTutorInPerson, e.target.checked)} />
                In-person </label>
            </div>
          </div>

          {/* below is subjects form */}
          {/*<div className='add-subject-wrapper'>*/}
          {/*  <fieldset>*/}
          {/*    <legend>*Add courses you will teach:</legend>*/}
          {/*    <label htmlFor="subject">*Subject: </label>*/}
          {/*      <select data-testid = 'subjectInput'   required name="subject" id="subject" onChange={(e) => {handleChange(e, setNewTutorSubjectName, e.target.value)}}>*/}
          {/*        <option selected>Select a Subject</option>*/}
          {/*        <option value="Arts">Arts</option>*/}
          {/*        <option  value="Business and Economics">Business and Economics</option>*/}
          {/*        <option value="Communication Studies">Communication Studies</option>*/}
          {/*        <option value="Computer Science">Computer Science</option>*/}
          {/*        <option value="Education and Teaching">Education and Teaching</option>*/}
          {/*        <option value="Engineering">Engineering</option>*/}
          {/*        <option value="Environmental Studies">Environmental Studies and Sustainability</option>*/}
          {/*        <option value="Health Sciences">Health Sciences</option>*/}
          {/*        <option value="Humanities">Humanities</option>*/}
          {/*        <option value="Law and Government">Law and Government</option>*/}
          {/*        <option value="Natural Sciences">Natural Sciences</option>*/}
          {/*        <option value="Social Sciences">Social Sciences</option>*/}
          {/*      </select>*/}
          {/*      <label htmlFor="branch">*Branch: </label>*/}
          {/*      <input data-testid = 'branchInput' type="text" required name='branch' value={newTutorSubjectBranchName} onChange={(e) => handleChange(e, setNewTutorSubjectBranchName, e.target.value)}/>*/}
          {/*      <label htmlFor="hourly-rate">*Hourly Rate: </label>*/}
          {/*      <input type="number" required name="hourly-rate" min={0} max={10000} step="25" defaultValue={300} onChange={(e) => handleChange(e, setNewTutorSubjectBranchRate, e.target.valueAsNumber)}/>*/}
          {/*    <button id='add-button' type="button" onClick={(e) => {*/}
          {/*      e.preventDefault();*/}
          {/*      addSubject();*/}
          {/*    }}>Add</button>*/}
          {/*  </fieldset>*/}
          {/*</div>*/}
          <div className="control">
            <button type='submit' className="button is-link">Submit</button>
          </div>
        </form >
      </section >
    </>
  );
}


export default Register;