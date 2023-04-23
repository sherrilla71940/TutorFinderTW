import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Register () {
  const [userSubmit, setUserSubmit] = useState(false);
  const [userFormData, setUserFormData] = useState({}); // come back to this later
  // after submitting form change global state of all tutors
  // then redirect
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/')}>Submit</button>
  );
  }


export default Register;