import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import icon from '../assets/icon.png'
import LogInModal from "./log-in";

export default function NavBar() {
  const [loginModal, setLoginModalVisibility] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  function toggleLogin() {
    if (!loggedIn) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false);
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
              <p className="subtitle mt-3 mr-2">Welcome, {sessionStorage.name}! Signed in as {sessionStorage.type}</p>
              <div id="messagesButton" className="navbar-item button m-1 ml-3" onClick={goToChats}>Messages</div> 
              <div id="logoutButton" className="navbar-item button m-1" onClick={logOut}>Log out</div>
            </>
            : null}
        </div>
      </nav>
      <LogInModal toggleLoginModal={toggleLoginModal} toggleLogin={toggleLogin} />
    </>
  )
}