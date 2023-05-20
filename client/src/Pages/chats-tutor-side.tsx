import React, { CSSProperties, useState, useEffect } from "react";
import { Tutor, User } from "../custom-types/types";
import fetchFunction from "../api-services";
import Chat from "../components/chat";
import ChatPic from "../components/chat-pic";
import { PORT } from "../env";

interface Props {
  tutors: Tutor[]
}

export default function ChatsTutorSide({ tutors }: Props) {
  const [currentContact, setCurrentContact] = useState({} as User);
  const [contacts, setContacts] = useState([] as User[]);

  const styleObj: CSSProperties = {
    height: '80vh',
    overflowY: 'scroll'
  }

  function changeChat(contact: User) {
    setCurrentContact(contact);
  }

  const myContacts = contacts.map((contact: User) => {
    if (contact) {
      return (
        <>
          <div className="notification is-flex is-link"
            onClick={(event) => changeChat(contact)}>
              <ChatPic tutor={contact} />
            <span className="subtitle m-3">{contact.name}</span>
          </div>
        </>
      )
    }
  })

  async function fetchContacts() {
    const result = await fetchFunction(
      `http://localhost:${PORT}/contacts`, 
      'GET', 
      (response: User[]) => {
        console.log(response);
          setContacts(response);
          setCurrentContact(contacts[0]);
      });
  }

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
          <Chat theOtherParty={currentContact} />
        </div>
      </div>
    </>
  )
}
