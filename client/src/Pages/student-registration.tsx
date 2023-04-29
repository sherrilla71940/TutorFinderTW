import React, { ChangeEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signUpRequest } from "../api-services";
import { validateEmail, validatePassword } from "../utils/validatiors";

export default function StudentSignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleChange(event: ChangeEvent<HTMLInputElement>, setter: (data: string) => void) {
    const target = event.target as HTMLInputElement;
    setter(target.value);
  }

  async function handleSubmit() {
    const newUser = { 
      name: name,
      email: email,
      password: password,
      type: 'student'
    };
    if (!validateEmail(newUser.email) && !validatePassword(newUser.password)) {
      window.alert('Your submission form does not meet the requirements');
      return;
    }
    try {
      const response = await signUpRequest(newUser)
        .then(function (response) {
          return response!.text()
        })
        .then(function (data) {
          window.alert(data);
          setName("");
          setEmail("");
          setPassword("");
          navigate('/');
        })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <section className="p-6">
        <h2 className="title">New student sign up</h2>
          <div className="field">
            <label htmlFor="nameInput" className="label">Name</label>
            <div className="control">
              <input id="nameInput" className="input" type="text" placeholder="Your name" 
                 onChange={(event) => handleChange(event, setName)} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="emailInput" className="label">Email</label>
            <div className="control">
              <input id="emailInput" className="input" type="email" placeholder="Your e-mail" 
                onChange={(event) => handleChange(event, setEmail)} />
              { !validateEmail(email) ? <p className="help">Please provide a valid email</p> : null }
            </div>
          </div>
          <div className="field">
            <label htmlFor="passwordInput" className="label">Password</label>
            <div className="control">
              <input  id="passwordInput" className="input" type="password" placeholder="Your password" 
                onChange={(event) => handleChange(event, setPassword)} 
                onKeyDown={(event) => { event.keyCode === 13 ? handleSubmit() : null }} />
                { !validatePassword(password) ? <p className="help">Password must be at least 9 characters long and have at least one uppercase letter and at least one digit with (no # or !)</p> : null }
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link m-2" onClick={() => handleSubmit()}>Submit</button>
            </div>
            <div className="control">
              <NavLink to='/'>
                <button className="button is-link is-light m-2">Cancel</button>
              </NavLink>
            </div>
          </div>
      </section>
    </>
  )
}