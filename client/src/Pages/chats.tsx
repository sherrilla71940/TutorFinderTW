import React, { useEffect } from "react";
import fetchFunction from "../api-services";
import TutorInterface from "../custom-types/types";
import Chat from "../components/chat";

interface Props {
  tutors: TutorInterface[]
}

export default function Chats({ tutors }: Props) {

  const styleObj = {
    height: '70vh',
    'overflow-y': 'scroll'
  }

  // TODO: SHOULD SHOW ONLY TUTORS WITH MESSAGE HISTORY
  const myTutors = tutors.map((tutor) => {
    return (
      <>
        <div className="box is-flex">
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
          <Chat />
        </div>
      </div>
    </>
  )
}