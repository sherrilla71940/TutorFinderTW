import React, { CSSProperties, useState, useEffect, ChangeEvent } from 'react';
import fetchFunction from '../api-services';
import userEvent from '@testing-library/user-event';
import { get } from 'http';

interface Props {
  currentTutor: string
}

interface Message {
  senderId: string,
  timestamp: string,
  message: string
}

interface Chat {
  _id: string,
  partyId1: string,
  partyId2: string,
  messageLog: Message[]
}

export default function Chat({ currentTutor }: Props) {
  const [messages, setMessages] = useState([] as Message[]);

  const [typedIn, setTypedIn] = useState("");

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const target = event.target as HTMLTextAreaElement;
    setTypedIn(target.value);
  }

  async function postMessage() {
    const messageData = {
      party2Id: currentTutor,
      message: typedIn
    };
    try {
      const send = await fetchFunction('http://localhost:8080/postmessage', 'POST', () => null, messageData)
        .then(() => {
          getMessages();
        })
    } catch (error) {
      console.log(error);
      window.alert('Message not sent');
    }
  }

  async function getMessages() {
    const messageData = {
      party2Id: currentTutor,
    };
    try {
      const getChat = await fetchFunction('http://localhost:8080/chat', 'POST', () => null, messageData) as unknown as Chat;
      setMessages(getChat.messageLog);
    } catch (error) {
      console.log(error);
      setMessages([]);
    }
  }

  const styleObj: CSSProperties = {
    height: '70vh',
  }

  const textareaStyleObj: CSSProperties = {
    minWidth: '70%'
  }

  const messageStyleObj: CSSProperties = {
    width: '60%'
  }

  const chatStyleObj: CSSProperties = {
    overflowY: 'scroll'
  }

  const messageElements = messages.map((message) => {
    return (
      <>
        <article className="message" style={messageStyleObj}>
          <div className="message-body">
            {message.message}<br/>
            {message.timestamp}<br/>
            {message.senderId}
          </div>
        </article>
      </>
    )
  })

  useEffect(() => {
    getMessages();
  }, [currentTutor]);
  // REVISE THIS: DEFINE A DEPENDENCY ARRAY (NOT EMPTY) TO TRACK AND DETECT CHANGES AND RUN FUNCTIONS AND RE-RENDER

  return (
    <>
      <div className='box is-flex is-flex-direction-column is-justify-content-space-between' style={styleObj}>
        <section style={chatStyleObj}>
          {messageElements}
        </section>
        <section className='is-flex'>
          <textarea className="textarea" style={textareaStyleObj} placeholder="Your message"
            onChange={(event) => handleChange(event)}></textarea>
          <button className="button is-large is-primary m-2" onClick={postMessage}>Send</button>
        </section>
      </div>
    </>
  )
}