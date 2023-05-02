import React, { CSSProperties, useState } from "react";
import TutorInterface from "../custom-types/types";
import Chat from "../components/chat";

interface Props {
  tutors: TutorInterface[],
  currentTutor: TutorInterface,
  setCurrentTutor: (tutor: TutorInterface) => void
}

export default function Chats({ tutors, currentTutor, setCurrentTutor }: Props) {
  const [contacts, setContacts] = useState([] as string[]);
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
  const myTutors = tutors.map((tutor) => {
    return (
      <>
        <div className={ tutor._id === currentTutor._id ? "notification is-flex is-link" : "notification is-flex" }
         onClick={(event) => changeChat(tutor)}>
          <figure className="image is-48x48">
            <img className="is-rounded" src={tutor.profilePicUrl} alt="userpic" />
          </figure>
          <span className="subtitle m-3">{tutor.name}</span>
        </div>
      </>
    )
  })

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
