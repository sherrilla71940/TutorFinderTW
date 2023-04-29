import React from 'react';
import {render, screen} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import userEvent from "@testing-library/user-event";


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


describe('register page', () => {
    jest.mock('../api-services', () => ({
        submit: () => ({
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/640px-SNice.svg.png',
            name: 'DG',
            email: 'd.l.gold@hotmail.com',
            age: 10,
            gender: 'male',
            remote: true,

            inPerson: true
        })
    }));


    test('submitting should call fetchFunction with the correct tutor details', async () => {
        const submitFunc = jest.fn();
        const prop = jest.fn();
        const inputs = {
            profilePicUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/640px-SNice.svg.png',
            name: 'DG',
            email: 'd.l.gold@hotmail.com',
            age: 10,
            gender: 'male',
            subjects: [],
            inPerson: true,
            remote: false,
            selfIntroduction: ''
        }


        render(<Router> <Register postTutorAndRedirect={prop}></Register></Router>)
        const form = screen.getByTestId('form');
        form.addEventListener('onsubmit', submitFunc);

        const submitBtn = screen.getByRole('button', {name: /Submit/i})
        submitBtn.addEventListener('click', submitFunc);

        const nameInput = screen.getByTestId('nameInput');
        const urlInput = screen.getByTestId('urlInput');

        const emailInput = screen.getByTestId('emailInput');
        const ageInput = screen.getByTestId('ageInput');
        const genderInput = screen.getByTestId('genderInput');

        // const branchInput = screen.getByTestId('branchInput');
        const inPersonInput = screen.getByTestId('inPersonInput');
        userEvent.type(nameInput, 'DG');
        userEvent.type(urlInput, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/640px-SNice.svg.png');
        userEvent.type(emailInput, 'd.l.gold@hotmail.com');
        userEvent.clear(ageInput)
        userEvent.type(ageInput, '10');
        userEvent.type(genderInput, 'male');

        // userEvent.type(branchInput, 'yellow');
        userEvent.click(inPersonInput);


        await userEvent.click(submitBtn);
        console.log(prop.mock.calls[0][0], 'prop')
        expect(prop).toHaveBeenCalledWith(inputs);

    })


})

