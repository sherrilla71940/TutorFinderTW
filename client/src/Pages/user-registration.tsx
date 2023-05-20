import React, { ChangeEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import fetchFunction, { sendUserData } from "../api-services";
import { validateEmail, validatePassword } from "../utils/validatiors";
import { User } from "../custom-types/types";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [pic, setPic] = useState<File | null>(null);

  const navigate = useNavigate();

  function handleChange(event: ChangeEvent<HTMLInputElement>, setter: (data: string) => void) {
    const target = event.target as HTMLInputElement;
    setter(target.value);
  }

  async function handleSubmit() {
    const newUser = new FormData();
    newUser.append('data', JSON.stringify({
      name: name,
      email: email,
      password: password,
      type: userType,
      isComplete: false,
    }));

    pic ? newUser.append('file', pic) : null;
    console.log(...newUser);

    if (!validateEmail(email) && !validatePassword(password)) {
      window.alert('Your submission form does not meet the requirements');
      return;
    }

    try {
      const send = sendUserData(newUser)
        .then(() => {
          window.alert('You can now login with your credentials');
          navigate('/');
        })
    } catch (error) {
      window.alert('Failed to register');
    }
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const fileInput = event.target.files as FileList;
    console.log(fileInput[0]);
    setPic(fileInput[0]);
  }

  return (
    <>
      <section className="p-6">
        <h2 className="title">New user sign up</h2>

        <div className="field">
          <label className="label">Who are you?</label>
          <div className="control">
            <label className="radio m-3">
              <input type="radio" name="answer" value="student" onChange={(event) => handleChange(event, setUserType)} />
              <span className="m-2">Student</span>
            </label>
            <label className="radio m-3">
              <input type="radio" name="answer" value="tutor" onChange={(event) => handleChange(event, setUserType)} />
              <span className="m-2">Tutor</span>
            </label>
          </div>
        </div>

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
            {!validateEmail(email) ? <p className="help">Please provide a valid email</p> : null}
          </div>
        </div>

        <div className="field">
          <label htmlFor="passwordInput" className="label">Password</label>
          <div className="control">
            <input id="passwordInput" className="input" type="password" placeholder="Your password"
              onChange={(event) => handleChange(event, setPassword)}
              onKeyDown={(event) => { event.keyCode === 13 ? handleSubmit() : null }} />
            {!validatePassword(password) ? <p className="help">Password must be at least 9 characters long and have at least one uppercase letter and at least one digit with (no # or !)</p> : null}
          </div>
        </div>

        <div className="field">
          <label className="label">Profile picture</label>
          <input className="input" type="file" name="resume" onChange={handleFile} />
          <p className="help">Optional</p>
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