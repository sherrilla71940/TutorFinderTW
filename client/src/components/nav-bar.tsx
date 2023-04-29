import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import icon from '../assets/icon.png'
import SignUpModal from "./sign-up";
import LogInModal from "./log-in";

export default function NavBar() {

  const [signUpModal, setSignUpModalVisibility] = useState(false);
  const [loginModal, setLoginModalVisibility] = useState(false);

  function toggleSignUpModal() {
    const modal = document.getElementById("signUpModal");
    if (!signUpModal) {
      modal?.classList.add('is-active');
      setSignUpModalVisibility(true);
    } else {
      modal?.classList.remove('is-active');
      setSignUpModalVisibility(false);
    }
  }

  function toggleLoginModal() {
    const modal = document.getElementById("loginModal");
    if (!loginModal) {
      modal?.classList.add('is-active');
      setLoginModalVisibility(true);
    } else {
      modal?.classList.remove('is-active');
      setLoginModalVisibility(false);
    }
  }

  useEffect(() => {
    document.getElementById('signUpButton')?.addEventListener('click', toggleSignUpModal);
    document.getElementById('loginButton')?.addEventListener('click', toggleLoginModal);
  })

  return (
    <>
      <nav className="navbar is-light">
        <div className="navbar-brand m-2">
          <figure className="image is-64x64" >
            <img src={icon} alt='icon'/>
          </figure>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start ml-1">
            <div className="navbar-item">
              <NavLink to='/'>Home page</NavLink>
            </div>
            <div className="navbar-item">
              <NavLink to='/tutors'>Tutors</NavLink>
            </div>
          </div>
        </div>

        <div className="navbar-end is-flex-wrap-wrap is-align-content-center mr-2">
          <div id="signUpButton" className="navbar-item button m-1">
            Sign up
          </div>
          <div id="loginButton" className="navbar-item button m-1">
            Log in
          </div>
        </div>
      </nav>
      <SignUpModal toggleSignUpModal={toggleSignUpModal} />
      <LogInModal toggleLoginModal={toggleLoginModal} />
    </>
  )
}