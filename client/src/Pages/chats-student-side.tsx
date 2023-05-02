import React, { CSSProperties, useState, useEffect } from "react";
import TutorInterface from "../custom-types/types";
import Chat from "../components/chat";
import fetchFunction from "../api-services";

interface Props {
  tutors: TutorInterface[],
  currentTutor: TutorInterface,
  setCurrentTutor: (tutor: TutorInterface) => void
}

export default function ChatsStudentSide({ tutors, currentTutor, setCurrentTutor }: Props) {
  const [contacts, setContacts] = useState([currentTutor] as any);
  const [tutor, setTutor] = useState(currentTutor);

  const styleObj: CSSProperties = {
    height: '80vh',
    overflowY: 'scroll'
  }

  function changeChat(tutor: TutorInterface) {
    console.log(tutor);
    console.log(currentTutor);
    setCurrentTutor(tutor);
    setTutor(tutor);
  }

  // TODO: SHOULD SHOW ONLY TUTORS WITH MESSAGE HISTORY, NOT THE WHOLE BUNCH
  // FOR STUDENT - ADD CURRENT TO LIST OF CONTACTS
  // FOR TUTOR - ONLY STUDENTS WITH MESSAGES
  const myTutors = contacts.map((tutor: any) => {
    if (tutor) {
      return (
        <>
          <div className={tutor._id === currentTutor._id ? "notification is-flex is-link" : "notification is-flex"}
            onClick={(event) => changeChat(tutor)}>
            <figure className="image is-48x48">
              <img className="is-rounded" src={tutor.profilePicUrl} alt="userpic" />
            </figure>
            <span className="subtitle m-3">{tutor.name}</span>
          </div>
        </>
      )
    }
  })

  async function fetchContacts(type: string) {
    const result = await fetchFunction(`http://localhost:8080/contacts/${type}`, 'GET', setContacts);
    console.log(contacts);
  }

  useEffect(() => {
    if (sessionStorage.getItem('type') === 'tutor') {
      fetchContacts('students');
    } else if (sessionStorage.getItem('type') === 'student') {
      fetchContacts('tutors');
    }
  }, [])

  return (
    <>
      <div className="columns">
        <div className="column is-one-third m-2">
          <div className="box" style={styleObj}>
            {myTutors}
          </div>
        </div>
        <div className="column m-2">
          {/* CHAT COMPONENT HERE */}
          <Chat currentTutor={currentTutor} />
        </div>
      </div>
    </>
  )
}
