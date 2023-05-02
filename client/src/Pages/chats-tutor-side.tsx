import React, { CSSProperties, useState, useEffect } from "react";
import Student, { User } from "../custom-types/types";
import TutorInterface from "../custom-types/types";
import ChatTutorSide from "../components/chat-tutor-side";
import fetchFunction from "../api-services";

interface Props {
  tutors: TutorInterface[]
}

export default function ChatsTutorSide({ tutors }: Props) {
  const [currentContact, setCurrentContact] = useState({} as any);
  const [contacts, setContacts] = useState([] as any);

  const styleObj: CSSProperties = {
    height: '80vh',
    overflowY: 'scroll'
  }

  function changeChat(contact: any) {
    setCurrentContact(contact);
  }

  const myContacts = contacts.map((contact: any) => {
    if (contact) {
      return (
        <>
          <div className="notification is-flex is-link"
            onClick={(event) => changeChat(contact)}>
            <figure className="image is-48x48">
              <img className="is-rounded" src={contact.profilePicUrl} alt="userpic" />
            </figure>
            <span className="subtitle m-3">{contact.name}</span>
          </div>
        </>
      )
    }
  })

  async function fetchContacts() {
    console.log(tutors);
    const tutorId = tutors.find(element => element.email === sessionStorage.getItem('email'))?._id;
    const result = await fetchFunction(`http://localhost:8080/contacts/students`, 'POST', setContacts, { tutorId: tutorId }) as unknown as TutorInterface[]
    setCurrentContact(result[0]);
  }

  // STUDENTS INITIATE CHATS BASED ON USER IDs SO SHOULD BE NO ISSUE HERE
  useEffect(() => {
    fetchContacts()
  }, [])

  return (
    <>
      <div className="columns">
        <div className="column is-one-third m-2">
          <div className="box" style={styleObj}>
            {myContacts}
          </div>
        </div>
        <div className="column m-2">
          {/* CHAT COMPONENT HERE */}
          <ChatTutorSide currentContact={currentContact} tutors={tutors} />
        </div>
      </div>
    </>
  )
}
