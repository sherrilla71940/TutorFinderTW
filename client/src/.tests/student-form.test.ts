// NO MATTER WHAT THE TESTS DO NOT WORK

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import StudentSignUpForm from '../Pages/student-registration';

describe('Student sign-up form', () => {

  jest.mock('../api-services.ts', () => ({
    signUpRequest: () => 'Hello!'
  }))

  // jest.mock('react-router-dom', () => ({
  //   useNavigate: () => "Hello!"
  // }))

  // jest.mock('../components/nav-bar', () => (
  //   null
  // ))

  it('Should render a student registration form with name, email and password fields', () => {
    render('<StudentSignUpForm />');
    const inputs = screen.getByRole('input', { hidden: true });

    expect(inputs.length).toBe(3);

    // expect(nameInput).toBeInstanceOf(HTMLInputElement);
    // expect(emailInput).toBeInstanceOf(HTMLInputElement);
    // expect(passwordInput).toBeInstanceOf(HTMLInputElement);
  })
})