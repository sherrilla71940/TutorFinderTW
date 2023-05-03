import React, { CSSProperties, useState, useEffect } from "react";
import { Tutor, User } from "../custom-types/types";
import Chat from "../components/chat";
import fetchFunction from "../api-services";

interface Props {
  tutors: Tutor[],
  currentTutor: Tutor,
  setCurrentTutor: (tutor: Tutor) => void
}

export default function ChatsStudentSide({ tutors, currentTutor, setCurrentTutor }: Props) {
  const [contacts, setContacts] = useState([currentTutor]);
  const [tutor, setTutor] = useState(currentTutor);

  const styleObj: CSSProperties = {
    height: '80vh',
    overflowY: 'scroll'
  }

  function changeChat(tutor: Tutor) {
    setCurrentTutor(tutor);
    setTutor(tutor);
  }

  const myTutors = contacts.map((tutor: Tutor) => {
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

  async function fetchContacts() {
    const result = await fetchFunction(
      `http://localhost:8080/contacts`, 
      'GET', 
      (response: Tutor[]) => {
        console.log('contacts', response);
        if (response.some((element: User) => element._id === currentTutor._id)) {
          setContacts(response);
        } else {
          setContacts([...response, currentTutor]);
        }
      });
  }

  useEffect(() => {
    fetchContacts();
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
          <Chat theOtherParty={currentTutor} />
        </div>
      </div>
    </>
  )
}
