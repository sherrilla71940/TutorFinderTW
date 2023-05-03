import React, { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Subject, Subjects, Branch } from '../custom-types/types';
import fetchFunction from '../api-services';

function CompleteTutorDetails() {

  const [newTutorProfileUrl, setNewTutorProfileUrl] = useState<string>('');
  const [newTutorAge, setNewTutorAge] = useState<number>(18);
  const [newTutorIntroduction, setNewTutorIntroduction] = useState<string>('');
  const [newTutorInPerson, setNewTutorInPerson] = useState<boolean>(false);
  const [newTutorRemote, setNewTutorRemote] = useState<boolean>(false);
  const [location, setLocation] = useState("");

  const [newTutorSubjectName, setNewTutorSubjectName] = useState<string>('');
  const [newTutorSubjectBranchName, setNewTutorSubjectBranchName] = useState<string>('');
  const [newTutorSubjectBranchRate, setNewTutorSubjectBranchRate] = useState<number>(300);

  const [allNewTutorSubjectsArr, setAllNewTutorSubjectsArr] = useState<Subjects>([] as Subjects);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newDetails = {
      profilePicUrl: newTutorProfileUrl,
      age: newTutorAge,
      selfIntroduction: newTutorIntroduction ? newTutorIntroduction : '',
      isComplete: true,
      tutorDetails: {
        userId: sessionStorage.getItem("id"),
        remote: newTutorRemote,
        subjects: allNewTutorSubjectsArr,
        inPerson: newTutorInPerson,
        location: location
      }
    };
    try {
      const postTutorDetails = await fetchFunction(
        `http://localhost:8080/updateuserinfo`,
        'PUT',
        () => null,
        newDetails as unknown as User)
        .then(async () => {
          console.log('Tutor details posted')
          // TODO: NAVIGATE TO MESSAGES, THERE IS NO REASON TO SEE OTHER TUTORS
          navigate('/tutors');
        })
    } catch (error) {
      console.log(error);
      window.alert('Failed to update tutor info');
    }
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
          console.log(subObj.branches)
          return {
            subject: subObj.subject,
            branches: [...subObj.branches, ...newSubj.branches]
          }
        }

        return subObj;
      });
      setAllNewTutorSubjectsArr(transformedCopy)
    }
    return newSubj;
  }

  function removeSubject(subject: Subject, branch: Branch) {
    if (subject.branches.length > 1) {
      const allSubjCopy = [...allNewTutorSubjectsArr];
      const transformedCopy = allSubjCopy.map(subObj => {
        if (subObj.subject === subject.subject) {
          const index = subObj.branches.indexOf(branch)
          subObj.branches.splice(index, 1)
          return {
            subject: subObj.subject,
            branches: [...subObj.branches]
          }
        }
        return subObj;

      })
      setAllNewTutorSubjectsArr(transformedCopy);
    } else {
      const allSubjCopy = [...allNewTutorSubjectsArr];
      const transformedCopy = allSubjCopy.filter(subObj => subObj.subject !== subject.subject);
      setAllNewTutorSubjectsArr(transformedCopy);
    }
  }

  function handleChange<T>(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<T>>, value: SetStateAction<T>) {
    if (typeof value === 'string' && value.length < 0) return;
    if (newTutorInPerson) setNewTutorInPerson(true)
    if (newTutorRemote) setNewTutorRemote(true)
    setter(value);
  }

  return (
    <>
      <section className="p-6">
        <h2 className="title">Please fill in tutor details</h2>
        <form data-testid='form' action="" onSubmit={handleSubmit} id='tutor-registration-form'>

          {/* <div className="field">
            <div className="control">
              <label htmlFor="profile" className='label'>Your Profile Picture URL: </label>
              <input id="profile" data-testid='urlInput' className='input' type="text"
                value={newTutorProfileUrl}
                onChange={(e) => handleChange(e, setNewTutorProfileUrl, e.target.value)}
                name='profile'
                required />
            </div>
          </div> */}

          <div className="field">
            <div className="control">
              <label htmlFor="age" className='label'>Your age: </label>
              <input id="age" className='input' data-testid='ageInput' type="number" name='age' min={0}
                max={150}
                defaultValue={18} required
                onChange={(e) => handleChange(e, setNewTutorAge, e.target.valueAsNumber)} />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label htmlFor="location" className='label'>You are based in:</label>
              <input id="location" className='input' type="text"
                value={location}
                onChange={(e) => handleChange(e, setLocation, e.target.value)}
                name='location'
                required />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className='label' htmlFor="introduction">Introduce Yourself: </label>
              <textarea className='textarea' name="introduction" id="introduction" cols={20} rows={5}
                onChange={(e) => handleChange(e, setNewTutorIntroduction, e.target.value)}></textarea>
            </div>
          </div>

          <label className='label'>How you will teach: </label>
          <div className="field">
            <div className="control">
              <label className='checkbox' htmlFor="remote">
                <input className='mr-2' type="checkbox" checked={newTutorRemote} name="remote" id="remote"
                  onChange={(e) => handleChange(e, setNewTutorRemote, e.target.checked)} />
                Remote
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className='checkbox' htmlFor="in-person">
                <input className='mr-2' data-testid='inPersonInput' checked={newTutorInPerson} type="checkbox"
                  name="in-person" id="in-person"
                  onChange={(e) => handleChange(e, setNewTutorInPerson, e.target.checked)} />
                In-person </label>
            </div>
          </div>

          <div className='field'>
            <label className='label'>Add courses you will teach:</label>
            <div className="control">
              <label className="label has-text-weight-normal" htmlFor="subject">Subject: </label>
              <div className='select mb-2'>
                <select className="select mr-2" data-testid='subjectInput' required name="subject" id="subject" onChange={(e) => {
                  handleChange(e, setNewTutorSubjectName, e.target.value)
                }}>
                  <option selected>Select a Subject</option>
                  <option value="Arts">Arts</option>
                  <option value="Business and Economics">Business and Economics</option>
                  <option value="Communication Studies">Communication Studies</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Education and Teaching">Education and Teaching</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Environmental Studies">Environmental Studies and Sustainability</option>
                  <option value="Health Sciences">Health Sciences</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Law and Government">Law and Government</option>
                  <option value="Natural Sciences">Natural Sciences</option>
                  <option value="Social Sciences">Social Sciences</option>
                </select>
              </div>
              {newTutorSubjectName !== '' && (
                <>
                  <div className="field">
                    <div className="control">
                      <label className="label has-text-weight-normal" htmlFor="branch">Subject branch: </label>
                      <input className='input' data-testid='branchInput' type="text" value={newTutorSubjectBranchName}
                        onChange={(e) => handleChange(e, setNewTutorSubjectBranchName, e.target.value)} />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <label className="label has-text-weight-normal" htmlFor="hourly-rate">Hourly Rate: </label>
                      <input className='input' type="number" required name="hourly-rate" min={0} max={10000} step="25"
                        defaultValue={300}
                        onChange={(e) => handleChange(e, setNewTutorSubjectBranchRate, e.target.valueAsNumber)} />
                    </div>
                  </div>

                  <button className="button is-light" id='add-button' disabled={!newTutorSubjectBranchName} type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      addSubject();
                    }}>Add
                  </button>
                </>
              )}

            </div>
          </div>

          <div className='added-subject-wrapper'>
            <p className='label'>Your courses:</p>
            <ul style={{ display: 'flex', flexDirection: 'row', alignItems: 'start' }}>
              {allNewTutorSubjectsArr && allNewTutorSubjectsArr.map(subject => (
                <li className="box mr-3" key={subject.subject}>
                  <div style={{ display: 'block' }}>
                    <p className='is-italic mb-2'>{subject.subject}</p>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      {subject.branches.map(branch => (
                        <li className="mb-3" key={branch.branch}>
                          <span className='mr-3'>
                            {branch.branch}
                          </span>
                          <button className="button is-light is-small" onClick={(e) => {
                            e.preventDefault();
                            removeSubject(subject, branch)
                          }}>Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="control">
            <button type='submit'
              disabled={!newTutorProfileUrl || !newTutorIntroduction || allNewTutorSubjectsArr.length === 0 || !newTutorRemote && !newTutorInPerson}
              className="button is-link mt-4">Submit
            </button>
          </div>


        </form>
      </section>
    </>
  );


}

export default CompleteTutorDetails;