import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand box ml-2 mb-1">
          Tutor Finder
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
          <div className="navbar-item button">
            <NavLink to='/register'>Sign up</NavLink>
          </div>
          <div className="navbar-item button">
            <NavLink to='/'>Log in</NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}