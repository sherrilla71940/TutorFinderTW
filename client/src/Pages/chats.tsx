import React, { useEffect, useState } from "react";
import fetchFunction from "../api-services";
import TutorInterface from "../custom-types/types";
import Chat from "../components/chat";

interface Props {
  tutors: TutorInterface[],
  currentTutor: string,
  setCurrentTutor: (string: string) => void
}

export default function Chats({ tutors, currentTutor, setCurrentTutor }: Props) {
  const [contacts, setContacts] = useState([] as string[]);
  const [tutor, setTutor] = useState(currentTutor);

  const styleObj = {
    height: '70vh',
    // overflowY: 'scroll'!
  }

  function changeChat(tutor: TutorInterface) {
    console.log(tutor);
    console.log(currentTutor);
    setCurrentTutor(tutor._id as string);
    setTutor(tutor._id as string);
  }

  // componentDidUpdate(prevProps: any, prevState: any) {
  //   if (prevState.pokemons !== this.state.pokemons) {
  //     console.log('pokemons state has changed.')
  //   }
  // }

  useEffect(() => {
    console.log('Entering chats, current tutor is:', currentTutor);
    // const newContacts = contacts;
    // newContacts.push(currentTutor);
    // setContacts(newContacts);
    // console.log(contacts);
  }, [])

  // TODO: SHOULD SHOW ONLY TUTORS WITH MESSAGE HISTORY
  const myTutors = tutors.map((tutor) => {
    return (
      <>
        <div className="box is-flex" onClick={(event) => changeChat(tutor)}>
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

function componentDidUpdate(prevProps: any, prevState: any) {
  throw new Error("Function not implemented.");
}
