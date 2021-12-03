import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';
import DisplayComponent from '../components/DisplayComponent';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
        const header = screen.queryByText(/contact form/i);
            expect(header).toBeInTheDocument();
            expect(header).toBeTruthy();
            expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
        const firstNameField = screen.getByLabelText(/first name*/i);
            userEvent.type(firstNameField, 'home');
        const errorMessage = screen.getByText('Error: firstName must have at least 5 characters.')
            expect(errorMessage).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
        const firstNameField = screen.getByLabelText(/first name*/i);
            userEvent.type(firstNameField, '');

        const lastNameField = screen.getByLabelText(/last name*/i);
            userEvent.type(lastNameField, '');

        const emailField = screen.getByLabelText(/email*/i)
            userEvent.type(emailField, 'fakeEmail');

        const errorMessage1 = screen.getByTestId('error');
            expect(errorMessage1).toBeInTheDocument();

        const errorMessage2 = screen.getByTestId('error');
            expect(errorMessage2).toBeInTheDocument();

        const errorMessage3 = screen.getByTestId('error');
            expect(errorMessage3).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
        const firstNameField = screen.getByLabelText(/first name*/i);
            userEvent.type(firstNameField, 'Chadwick');

        const lastNameField = screen.getByLabelText(/last name*/i);
            userEvent.type(lastNameField, 'McMonahan');

        const emailField = screen.getByLabelText(/email*/i)
            userEvent.type(emailField, 'fakeEmail');

        const emailError = screen.getByText('Error: email must be a valid email address.');
            expect(emailError).toBeInTheDocument();    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
        const emailField = screen.getByLabelText(/email*/i)
            userEvent.type(emailField, 'fakeEmail');

        const emailError = screen.getByText('Error: email must be a valid email address.');
            expect(emailError).toBeInTheDocument(); 
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
   render(<ContactForm />)
        const lastNameField = screen.getByLabelText(/last name*/i);
            userEvent.type(lastNameField, ''); 
        const buttonElement = screen.getByRole('button');
            userEvent.click(buttonElement)

        const lastNameError = screen.getByText('Error: lastName is a required field.');
            expect(lastNameError).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstNameField = screen.getByLabelText(/first name*/i);
            userEvent.type(firstNameField, 'Chadwick');

    const lastNameField = screen.getByLabelText(/last name*/i);
            userEvent.type(lastNameField, 'McMonahan');

    const emailField = screen.getByLabelText(/email*/i)
            userEvent.type(emailField, 'cooldude@hotmail.com');

    const messageField = screen.getByLabelText(/message/i);
            userEvent.type(messageField, 'Howdy!');

    const buttonElement = screen.getByRole('button');
            userEvent.click(buttonElement)

            const renderedFirstName = screen.getByText('First Name:');
                expect(renderedFirstName).toBeInTheDocument();

            const renderedLastName = screen.getByText('Last Name:');
                expect(renderedLastName).toBeInTheDocument();

            const renderedEmail = screen.getByText('Email:');
                expect(renderedEmail).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
        render(<ContactForm />)

            const firstNameField = screen.getByLabelText(/first name*/i);
                    userEvent.type(firstNameField, 'Chadwick');

            const lastNameField = screen.getByLabelText(/last name*/i);
                    userEvent.type(lastNameField, 'McMonahan');

            const emailField = screen.getByLabelText(/email*/i)
                    userEvent.type(emailField, 'cooldude@hotmail.com');

            const messageField = screen.getByLabelText(/message/i);
                    userEvent.type(messageField, 'Howdy!');

            const buttonElement = screen.getByRole('button');
                    userEvent.click(buttonElement);

                    const renderedFirstName = screen.getByText('First Name:');
                        expect(renderedFirstName).toBeInTheDocument();

                    const renderedLastName = screen.getByText('Last Name:');
                        expect(renderedLastName).toBeInTheDocument();

                    const renderedEmail = screen.getByText('Email:');
                        expect(renderedEmail).toBeInTheDocument();

                    const renderedMessage = screen.getByText('Message:');
                        expect(renderedMessage).toBeInTheDocument();
});