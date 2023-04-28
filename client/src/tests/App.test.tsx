import React from 'react';
import {act, render, screen} from '@testing-library/react';
import App from '../App';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from "../Pages/Home";
import {Subject} from "../custom-types/tutor-interface";
import Register from "../Pages/Register";
import userEvent from "@testing-library/user-event";
import {userInfo} from "os";
import fetchFunction from "../api-services";


describe('home page', () => {
  test('renders the title', () => {
    render(<Router><Home/></Router>)
    const linkElement = screen.getByText(/Tutor Finder Home Page/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders the become a Tutor button', () => {
    render(<Router><Home/></Router>)
    const linkElement = screen.getByText(/Become a Tutor/i);
    expect(linkElement).toBeInTheDocument();
  })
    test('renders the find tutors button', () => {
      render(<Router><Home/></Router>)
      const linkElement = screen.getByText(/Find Tutors/);
      expect(linkElement).toBeInTheDocument();
    })

    test('renders the summary button', () => {
      render(<Router><Home/></Router>)
      const linkElement = screen.getByText(/TutorFinderTW allows you to find tutors based in Taiwan. /i);
      expect(linkElement).toBeInTheDocument();
    })
})


//
// describe('register page', () => {
//   jest.mock('../api-services',()=>({
//     submit:()=>({url:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/640px-SNice.svg.png',
//                   name:'DG',
//                   email:'d.l.gold@hotmail.com',
//                   age : 10,
//                   gender:'male',
//                   remote:true,  
//                   subjects: {
//                     subject:'history',
//                     branches:['yellow']
//                   },
//                   inPerson:true
//     })
//   }));
//
//
//
//
//
//
//   test('submitting should call fetchFunction with the correct tutor details', async () => {
//     const submitFunc = jest.fn();
//     const prop = jest.fn();
//     const inputs ={
//         url:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/640px-SNice.svg.png',
//       name:'DG',
//       email:'d.l.gold@hotmail.com',
//       age : 10,
//       gender:'male',
//       remote:true,
//       subjects: {
//         subject:'history',
//         branches:['yellow']
//       },
//       inPerson:true
//     }
//
//
//     render(<Router> <Register postTutorAndRedirect={prop}></Register> </Router>)
//     const form = screen.getByTestId('form');
//     form.addEventListener('onsubmit', submitFunc);
//
//     const submitBtn = screen.getByRole('button',{name:/Submit/i})
//     submitBtn.addEventListener('click', submitFunc);
//
//      const nameInput = screen.getByTestId('nameInput');
//     const urlInput = screen.getByTestId('urlInput');
//
//       const emailInput =  screen.getByTestId('emailInput');
//       const ageInput =  screen.getByTestId('ageInput');
//       const genderInput =  screen.getByTestId('genderInput');
//       const subjectInput =  screen.getByTestId('subjectInput');
//       const branchInput = screen.getByTestId('branchInput');
//       const inPersonInput =  screen.getByTestId('inPersonInput');
//
//       act(() => {
//           userEvent.type(nameInput, 'DG');
//           userEvent.type(urlInput, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/640px-SNice.svg.png');
//           userEvent.type(emailInput, 'd.l.gold@hotmail.com');
//           userEvent.type(ageInput, '10');
//           userEvent.type(genderInput, 'male');
//           userEvent.type(subjectInput, 'history');
//           userEvent.type(branchInput, 'yellow');
//           userEvent.click(inPersonInput);   
//       })
//
//
//       await userEvent.click(submitBtn);
//
//       expect(fetchFunction).toHaveBeenCalledWith(inputs);
//   })
//
//
//
// })
//
