import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  toggleSignUpModal(): void;
}

export default function SignUpModal({ toggleSignUpModal }: Props) {

  useEffect(() => {
    document.getElementById("closeSignUpModal")?.addEventListener('click', () => {
      toggleSignUpModal();
    })
  })

  return (
    <div id="signUpModal" className="modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Sign up</p>
          <button id="closeSignUpModal" className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <p className="subtitle">Are you a tutor or a student?</p>
        </section>
        <footer className="modal-card-foot is-flex is-justify-content-center">
          <button className="button is-success ml-3 mr-3"  onClick={(toggleSignUpModal)}>
            <NavLink to='/register'>Tutor</NavLink>
          </button>
          <button className="button is-warning ml-3 mr-3" onClick={(toggleSignUpModal)}>
            <NavLink to='/studentsignup'>
              Student
            </NavLink>
          </button>
        </footer>
      </div>
    </div>
  )
}