import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

// define type for props

function Register () {

  // interface FormData {

  // }

  // define interface above for shape of form data, currently wondering if the shape should be the same as TutorInterface

  const [userSubmit, setUserSubmit] = useState<boolean>(false);
  // const [userFormData, setUserFormData] = useState: <FormData>('' as FormData); // come back to this later
  // after submitting form change global state of all tutors
  // then redirect
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/')}>Submit</button>
  );
  }


export default Register;