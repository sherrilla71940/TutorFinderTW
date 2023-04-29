import React, { ChangeEvent, useState } from "react";
import NavBar from "../components/nav-bar";
import { NavLink } from "react-router-dom";
import { signUpRequest } from "../api-services";

export default function StudentSignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    const response = await signUpRequest(newUser);
    console.log(response);
    // FIX: STATE GETS CLEARED BUT THE FORM DOES NOT RE-RENDER
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <NavBar />
      <section className="p-6">
        <h2 className="title">New student sign up</h2>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="Your name" 
                 onChange={(event) => handleChange(event, setName)} />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="email" placeholder="Your e-mail" 
                onChange={(event) => handleChange(event, setEmail)} />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input is-danger" type="password" placeholder="Your password" 
                onChange={(event) => handleChange(event, setPassword)} 
                onKeyDown={(event) => { event.keyCode === 13 ? handleSubmit() : null }} />
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