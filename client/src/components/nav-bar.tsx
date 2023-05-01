import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import icon from '../assets/icon.png'
import SignUpModal from "./sign-up";
import LogInModal from "./log-in";

export default function NavBar() {

  const [signUpModal, setSignUpModalVisibility] = useState(false);
  const [loginModal, setLoginModalVisibility] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  function toggleLogin() {
    if (!loggedIn) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false);
    }
  }

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

  function logOut() {
    setLoggedIn(false);
    setCurrentUser({});
    sessionStorage.clear();
    navigate('/');
    window.location.reload();
  }

  function goToChats() {
    navigate('/chats');
  }

  function goToSignUp() {
    navigate('/signup');
  }

  useEffect(() => {
    document.getElementById('signUpButton')?.addEventListener('click', goToSignUp);
    document.getElementById('loginButton')?.addEventListener('click', toggleLoginModal);
    if (sessionStorage.getItem('session')) {
      setLoggedIn(true);
    }
  })

  return (
    <>
      <nav className="navbar is-light">
        <div className="navbar-brand m-2">
          <figure className="image is-64x64" >
            <img src={icon} alt='icon' />
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
          {!loggedIn ? <div id="signUpButton" className="navbar-item button m-1">
            Sign up
          </div> : null}
          {!loggedIn ? <div id="loginButton" className="navbar-item button m-1">
            Log in
          </div> : null}
          {loggedIn ?
            <>
              <p className="subtitle mt-3 mr-2">Welcome, {sessionStorage.name}!</p>
              <div id="messagesButton" className="navbar-item button m-1" onClick={goToChats}>Messages</div> 
              <div id="logoutButton" className="navbar-item button m-1" onClick={logOut}>Log out</div>
            </>
            : null}
        </div>
      </nav>
      <SignUpModal toggleSignUpModal={toggleSignUpModal} />
      <LogInModal toggleLoginModal={toggleLoginModal} toggleLogin={toggleLogin} setCurrentUser={setCurrentUser} />
    </>
  )
}