import React, { CSSProperties, useState, useEffect, ChangeEvent, createRef, LegacyRef, RefObject, useRef } from 'react';
import fetchFunction from '../api-services';
import { parseDateString } from '../utils/parsers';
import { User } from '../custom-types/types';
import { PORT } from '../env';

interface Props {
  theOtherParty: User
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

export default function Chat({ theOtherParty }: Props) {
  const [messages, setMessages] = useState([] as Message[]);
  const [typedIn, setTypedIn] = useState("");

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const target = event.target as HTMLTextAreaElement;
    setTypedIn(target.value);
  }

  const myRef = useRef() as RefObject<HTMLElement>;

  async function postMessage() {
    const messageData = {
      party2Id: theOtherParty._id as string,
      message: typedIn
    };
    try {
      const send = await fetchFunction(
        `http://localhost:${PORT}/postmessage`,
        'POST',
        () => null,
        messageData)
        .then(() => {
          getMessages();
          const textarea = document.querySelector('textarea');
          textarea!.value = '';
        })
    } catch (error) {
      console.log(error);
      window.alert('Message not sent');
    }
  }

  async function getMessages() {
    const messageData = {
      otherId: theOtherParty._id as string,
    };
    try {
      const getChat = await fetchFunction(
        `http://localhost:${PORT}/chat`,
        'POST',
        () => null,
        messageData) as unknown as Chat
      if (getChat) setMessages(getChat.messageLog);
    } catch (error) {
      console.log(error);
      setMessages([]);
    }
  }

  const styleObj: CSSProperties = {
    height: '80vh',
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

  const messageElements = messages ?
    messages.map((message) => {
      return (
        <>
          <article className={message.senderId === sessionStorage.getItem('id') ? 'message is-pulled-right' : 'message is-pulled-left'} style={messageStyleObj}>
            <div className='message-body'>
              {message.message}
              <p className='help'>
                sent on {parseDateString(message.timestamp)} by {message.senderId === sessionStorage.getItem('id') ? sessionStorage.getItem('name') : theOtherParty.name}
              </p>
            </div>
          </article>
        </>
      )
    })
    : null


  useEffect(() => {
    // USE EFFECT EXECUTES RETURN CODE FIRST
    // SO WE CLEAR INTERVAL FIRST, THEN MAKE A NEW ONE
    getMessages();
    console.log('side effect')
    const id = setInterval(getMessages, 2000);
    return function cleanUp() {
      console.log('cleaning up');
      clearInterval(id);
    }
  }, [theOtherParty]);

  useEffect(() => {
    if (myRef) {
      myRef.current?.scroll(0, myRef.current?.scrollHeight);
    }
  }, [messages])

  return (
    <>
      <div className='box is-flex is-flex-direction-column is-justify-content-space-between' style={styleObj}>
        <section ref={myRef} id="chat-box" style={chatStyleObj}>
          {messageElements}
        </section>
        <section className='is-flex'>
          <textarea className="textarea mt-3" style={textareaStyleObj} placeholder="Your message"
            onChange={(event) => handleChange(event)} onKeyDown={(event) => event.keyCode === 13 ? postMessage() : null}></textarea>
          <button className="button is-large is-primary m-2 mt-3" onClick={postMessage}>Send</button>
        </section>
      </div>
    </>
  )
}
