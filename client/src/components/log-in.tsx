import React, { ChangeEvent, useEffect, useState } from "react";

interface Props {
  toggleLoginModal(): void;
}

export default function LogInModal({ toggleLoginModal }: Props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  function handleChange (event: ChangeEvent<HTMLInputElement>, setter: (data: string) => void) {
    const target = event.target as HTMLInputElement;
    setter(target.value);
  }

  function handleSubmit() {
    console.log({login, password});
  }

  useEffect(() => {
    document.getElementById("closeLoginModal")?.addEventListener('click', () => {
      toggleLoginModal();
    })
  })
 
  return (
    <div id="loginModal" className="modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Log in</p>
          <button id="closeLoginModal" className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <form id="loginForm">
            <div className="field">
              <label className="label">E-mail</label>
              <div className="control">
                <input className="input" required type="text" placeholder="Your e-mail" 
                  onChange={(event) => handleChange(event, setLogin)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input className="input" required type="password" placeholder="Your password" 
                  onChange={(event) => handleChange(event, setPassword)} 
                  onKeyDown={(event) => { event.keyCode === 13 ? handleSubmit () : null }} />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot is-flex is-justify-content-center">
          <button className="button is-success ml-3 mr-3" onClick={() => handleSubmit()}>
            Login
          </button>
        </footer>
      </div>
    </div>
  )
}