import React, { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchFunction from '../api-services';
import { User } from '../custom-types/types';
import { PORT } from '../env';

export default function CompleteStudentDetails() {

  const [age, setAge] = useState<number>(18);
  const [introduction, setIntroduction] = useState<string>('');

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newDetails = {
      age: age,
      selfIntroduction: introduction,
      isComplete: true
    };
    try {
      const postStudentDetails = await fetchFunction(
        `http://localhost:${PORT}/updateuserinfo`, 
        'PUT', 
        () => null, 
        newDetails as User)
        .then(async () => {
          console.log('Student details posted')
          navigate('/tutors');
        })
    } catch (error) {
      console.log(error);
      window.alert('Failed to update student info');
    }
  }

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
              <label htmlFor="age" className='label'>Your age:</label>
              <input id="age" className='input' data-testid='ageInput' type="number" name='age' min={0}
                max={150}
                defaultValue={18} required
                onChange={(e) => handleChange(e, setAge, e.target.valueAsNumber)} />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className='label' htmlFor="introduction">Introduce yourself: </label>
              <textarea className='textarea' name="introduction" id="introduction" cols={20} rows={5}
                onChange={(e) => handleChange(e, setIntroduction, e.target.value)}></textarea>
            </div>
          </div>

          <div className="control">
            <button type='submit'
              disabled={!introduction || !age}
              className="button is-link">Submit
            </button>
          </div>

        </form>
      </section>
    </>
  );
}
