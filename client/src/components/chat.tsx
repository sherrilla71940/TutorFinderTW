import React, { CSSProperties } from 'react';

export default function Chat() {

  const styleObj: CSSProperties = {
    height: '70vh'
  }

  const textareaStyleObj: CSSProperties = {
    minWidth: '70%'
  }

  const messageStyleObj: CSSProperties = {
    width: '60%'
  }

  function ChatMessage() {
    return (
      <>
        <article className="message is-pulled-left" style={messageStyleObj}>
          <div className="message-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </article>
        <article className="message is-pulled-right" style={messageStyleObj}>
          <div className="message-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </article>
      </>
    )
  }

  return (
    <>
      <div className='box is-flex is-flex-direction-column is-justify-content-space-between' style={styleObj}>
        <section>
          <ChatMessage />
        </section>
        <section className='is-flex'>
          <textarea className="textarea" style={textareaStyleObj} placeholder="Your message"></textarea>
          <button className="button is-large is-primary m-2">Send</button>
        </section>
      </div>
    </>
  )
}