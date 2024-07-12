import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import './SignUp.css'

const SignUp = (props) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstNameError, setfirstNameError] = useState('')
    const [lastNameError, setlastNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')


    const navigate = useNavigate()

    const onButtonClick = () => {
        setfirstNameError('')
        setlastNameError('')
        setEmailError('')
        setPasswordError('')

        if (email === '' || firstName === '' || lastName === '' || password === '') {
            if (firstName === '') setfirstNameError('Please enter your first name')
            else if(!/^[A-Za-z]+$/.test(firstName)) setfirstNameError('Please enter a valid first name')
            if (lastName === '') setlastNameError('Please enter your last name');
            else if(!/^[A-Za-z]+$/.test(lastName)) setlastNameError('Please enter a valid last name ')
            if (email === '') setEmailError('Please enter your email');
            else if(!/^[\w-\.]+@([\w-]+\.)+(com|org|net|edu|gov|info|biz|io|tech)$/.test(email)) setEmailError('Please enter a valid email')
            if (password === '') setPasswordError('Please enter your password');
            else if (password.length < 7) setPasswordError('The password must be 8 characters or longer')
            return
        }
        return navigate("/page1");
    }

    return (
    <div className= {"main"}>
            <div className = {'title'}>
                <div> Sign Up</div>
                <div className="Underline"></div>
            </div>
            <br />
            <div className={'input'}>
                <input 
                value={firstName}
                placeholder = "Enter your First Name"
                onChange={(e) => setFirstName(e.target.value)}
                className={'inputBox'}
          />
          <label className="errorLabel">{firstNameError}</label>
          </div>
          <br />
           <div className={'input'}>
            <input
            value={lastName}
            placeholder="Enter your Last Name"
            onChange={(ev) => setLastName(ev.target.value)}
            className={'inputBox'}
            />
            <label className="errorLabel">{lastNameError}</label>
            </div>
            <br />
            <div className={'input'}>
            <input
            value={email}
            placeholder="Enter your email"
            onChange={(ev) => setEmail(ev.target.value)}
            className={'inputBox'}
            />
            <label className="errorLabel">{emailError}</label>
            </div>
            <br />
           <div className={'input'}>
            <input
            value={password}
            placeholder="Set a password"
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
            />
            <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className={'input'}>
                <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Sign Up'} />
                </div>
        </div>
    );
}

export default SignUp;