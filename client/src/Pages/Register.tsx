import React, {useState} from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import TutorInterface from '../custom-types/tutor-interface';
import fetchFunction from '../api-services';

// define type for props

// when user submits, if successful redirect to tutors page, if unsuccessful render unsuccesfful component message (set to false first, when fail submit set true, then when success set false again)

function Register () {

  // define interface above for shape of form data, currently wondering if the shape should be the same as TutorInterface

  // type SubjectsForm = {

  // }

  const [userHasSubmit, setHasUserSubmit] = useState<boolean>(false);
  const [submissionFailure, setSubmissionFailure] = useState<boolean>(false);
  const [userFormData, setUserFormData] = useState<TutorInterface>({} as TutorInterface);

  const [newTutorProfileUrl, setNewTutorProfileUrl] = useState<string>('');
  const [newTutorName, setNewTutorName] = useState<string>('');
  const [newTutorAge, setNewTutorAge] = useState<number>(0);
  const [newTutorGender, setNewTutorGender] = useState<string>('');
  const [newTutorEmail, setNewTutorEmail] = useState<string>('');
  const [newTutorIntroduction, setNewTutorIntroduction] = useState<string>('');
  const [newTutorInPerson, setNewTutorInPerson] = useState<boolean>(false);
  const [newTutorRemote, setNewTutorRemote] = useState<boolean>(false);
  // const [userFormData, setUserFormData] = useState: <FormData>('' as FormData); // come back to this later
  // after submitting form change global state of all tutors
  // then redirect
  const navigate = useNavigate();

  async function postTutorAndRedirect () {
    try {
      await fetchFunction('http://localhost:3001', 'POST', setUserFormData, userFormData);
      setSubmissionFailure(false);
      navigate('/');
    } catch(e) {
      console.log(e);
      setSubmissionFailure(true);
      // if formsubmissionfailure is set to true, render extra 'failed to submit' component
    }
  }

  return (
    <>
       <nav>
      <ul>
        <li>
          <NavLink to="/">Tutor Finder Home Page</NavLink>
        </li>
        <li>
          <NavLink to="/tutors">Find Tutors</NavLink>
        </li>
      </ul>
    </nav>
      <form action="" onSubmit={(e) => e.preventDefault()} id='tutor-registration-form'>
        <label htmlFor="profile">Your Profile Picture URL: </label>
        <input type="text" value="" name='profile'required/>
        <label htmlFor="name">Your name: </label>
        <input type="text" value="" name='name'required/>
        <label htmlFor="age">Your age: </label>
        <input type="number" name='age' min={0} max={150} defaultValue={18} required/>
        <label htmlFor="gender">Your gender: </label>
        <select name="gender" id="gender" required>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <label htmlFor="introduction">Introduce Yourself: </label>
        <input type="text" value='' name='introduction'/>
        <fieldset>
          <legend>How will you teach?</legend>
          <div>
            <label htmlFor="remote">Remote </label>
            <input type="checkbox" name="remote" id="remote" />
          </div>
          <div>
            <label htmlFor="in-person">In-person </label>
            <input type="checkbox" name="in-person" id="remote" />
          </div>
        </fieldset>

      </form>

      <button onClick={() => postTutorAndRedirect()}>Submit</button>
    </>
  );
  }


export default Register;