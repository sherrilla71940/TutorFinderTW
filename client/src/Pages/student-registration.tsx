import React, { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Student from '../custom-types/types';
import fetchFunction from '../api-services';

export default function CompleteStudentDetails() {

  const [profilePicUrl, setProfilePicUrl] = useState<string>('');
  const [age, setAge] = useState<number>(18);
  const [introduction, setIntroduction] = useState<string>('');

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newStudent = {
      name: sessionStorage.name,
      profilePicUrl: profilePicUrl,
      age: age,
      email: sessionStorage.email,
      selfIntroduction: introduction,
    } as Student;
    try {
      const postStudentDetails = await fetchFunction('http://localhost:8080/newstudent', 'POST', () => null, newStudent)
        .then(async () => {
          console.log('Student details posted')
          const updateProfileStatus = await fetchFunction('http://localhost:8080/updateuserinfo', 'PUT', () => null, { isComplete: true });
          navigate('/tutors');
        })
    } catch (error) {
      console.log(error);
    }
  }

  // tried making handleChange an async func, but realized that for some reason when i await setState and console.log state below that, the console.log does not wait for the await statement
  function handleChange<T>(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<T>>, value: SetStateAction<T>) {
    if (typeof value === 'string' && value.length < 0) return;
    setter(value);
  }

  return (
    <>
      <section className="p-6">
        <h2 className="title">{sessionStorage.name}, please fill in student details:</h2>
        <form data-testid='form' action="" onSubmit={handleSubmit} id='student-registration-form'>

          <div className="field">
            <div className="control">
              <label htmlFor="profile" className='label'>Your profile picture URL: </label>
              <input id="profile" data-testid='urlInput' className='input' type="text"
                value={profilePicUrl}
                onChange={(e) => handleChange(e, setProfilePicUrl, e.target.value)}
                name='profile'
                required />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label htmlFor="age" className='label'>Your age:</label>
              <input id="age" className='input' data-testid='ageInput' type="number" name='age' min={0}
                max={150}
                defaultValue={18} required
                onChange={(e) => handleChange(e, setAge, e.target.valueAsNumber)} />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className='label' htmlFor="introduction">Introduce Yourself: </label>
              <textarea className='textarea' name="introduction" id="introduction" cols={20} rows={5}
                onChange={(e) => handleChange(e, setIntroduction, e.target.value)}></textarea>
            </div>
          </div>

          <div className="control">
            <button type='submit'
              disabled={!profilePicUrl || !introduction || !age}
              className="button is-link">Submit
            </button>
          </div>

        </form>
      </section>
    </>
  );
}
