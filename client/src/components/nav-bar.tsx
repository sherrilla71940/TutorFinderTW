import React from "react";
import { NavLink } from "react-router-dom";
import icon from '../assets/icon.png'

export default function NavBar() {

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
          <div className="navbar-item button m-1">
            <NavLink to='/register'>Sign up</NavLink>
          </div>
          <div className="navbar-item button m-1">
            <NavLink to='/'>Log in</NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}