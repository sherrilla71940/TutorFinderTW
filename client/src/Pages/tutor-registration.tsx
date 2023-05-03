import React, { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Subject, Subjects } from '../custom-types/types';
import fetchFunction from '../api-services';

function CompleteTutorDetails() {

  const [userHasSubmit, setHasUserSubmit] = useState<boolean>(false);
  const [submissionFailure, setSubmissionFailure] = useState<boolean>(false);
  const [userFormData, setUserFormData] = useState<User>({} as User);

  const [newTutorProfileUrl, setNewTutorProfileUrl] = useState<string>('');
  const [newTutorAge, setNewTutorAge] = useState<number>(18);
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
      }
    };
    try {
      const postTutorDetails = await fetchFunction(
        `http://localhost:8080/updateuserinfo`, 
        'PUT', 
        () => null, 
        newDetails as any)
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

  function removeSubject(subject: any, branch: any) {
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
    if (newTutorInPerson) setNewTutorInPerson(false)
    if (newTutorRemote) setNewTutorRemote(false)
    setter(value);
  }

  return (
    <>
      <section className="p-6">
        <h2 className="title">Please fill in tutor details</h2>
        <form data-testid='form' action="" onSubmit={handleSubmit} id='tutor-registration-form'>

          <div className="field">
            <div className="control">
              <label htmlFor="profile" className='label'>Your Profile Picture URL: </label>
              <input id="profile" data-testid='urlInput' className='input' type="text"
                value={newTutorProfileUrl}
                onChange={(e) => handleChange(e, setNewTutorProfileUrl, e.target.value)}
                name='profile'
                required />
            </div>
          </div>

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
              <label className='label' htmlFor="introduction">Introduce Yourself: </label>
              <textarea className='textarea' name="introduction" id="introduction" cols={20} rows={5}
                onChange={(e) => handleChange(e, setNewTutorIntroduction, e.target.value)}></textarea>
            </div>
          </div>

          <label className='label'>How you will teach: </label>
          <div className="field">
            <div className="control">
              <label className='checkbox' htmlFor="remote">
                <input type="checkbox" checked={newTutorRemote} name="remote" id="remote"
                  onChange={(e) => handleChange(e, setNewTutorRemote, e.target.checked)} />
                Remote
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className='checkbox' htmlFor="in-person">
                <input data-testid='inPersonInput' checked={newTutorInPerson} type="checkbox"
                  name="in-person" id="in-person"
                  onChange={(e) => handleChange(e, setNewTutorInPerson, e.target.checked)} />
                In-person </label>
            </div>
          </div>

          <div className='add-subject-wrapper'>
            <fieldset>
              <legend>*Add courses you will teach:</legend>
              <label htmlFor="subject">*Subject: </label>
              <select data-testid='subjectInput' required name="subject" id="subject" onChange={(e) => {
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
              {newTutorSubjectName !== '' && (
                <>
                  <label htmlFor="branch">Subject branch: </label>
                  <input data-testid='branchInput' type="text" value={newTutorSubjectBranchName}
                    onChange={(e) => handleChange(e, setNewTutorSubjectBranchName, e.target.value)} />
                  <label htmlFor="hourly-rate">Hourly Rate: </label>
                  <input type="number" required name="hourly-rate" min={0} max={10000} step="25"
                    defaultValue={300}
                    onChange={(e) => handleChange(e, setNewTutorSubjectBranchRate, e.target.valueAsNumber)} />
                  <button id='add-button' disabled={!newTutorSubjectBranchName} type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      addSubject();
                    }}>Add
                  </button>
                </>
              )}
            </fieldset>
          </div>

          <div className='added-subject-wrapper'>
            <p>Subjects:</p>
            <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
              {allNewTutorSubjectsArr && allNewTutorSubjectsArr.map(subject => (
                <li key={subject.subject}>
                  <div style={{ display: 'block' }}>
                    <div style={{ display: 'fixed' }}>
                      <strong>{subject.subject}</strong>
                    </div>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      {subject.branches.map(branch => (
                        <li key={branch.branch}>{branch.branch}
                          <button onClick={(e) => {
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
              className="button is-link">Submit
            </button>
          </div>


        </form>
      </section>
    </>
  );


}

export default CompleteTutorDetails;