import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import './SignUp.css'
import axios from "axios";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const SignUp = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')


    const navigate = useNavigate()

    const onButtonClick = (e) => {
        setNameError('')
        setEmailError('')
        setPasswordError('')

        if (email === '' || name === '' || password === '') {
            if (name === '') {
                setNameError('Please enter your name')
                return
            }
            else if(!/^[A-Za-z]+$/.test(name)) {
                setNameError('Please enter a valid name')
                return
            }
            if (email === '') {
                setEmailError('Please enter your email');
                return
            }
            else if(!/^[\w-\.]+@([\w-]+\.)+(com|org|net|edu|gov|info|biz|io|tech)$/.test(email)) {
                setEmailError('Please enter a valid email')
                return
            }
            if (password === '') {
                setPasswordError('Please enter your password');
                return
            }
            
        }
        else if (password.length < 7) {
            setPasswordError('The password must be 8 characters or longer')
            return
        }
        e.preventDefault()
        axios.post('http://localhost:3001/SignUp', {name,email,password})
            .then(result => {
                if(result.data === 'exists') {
                    setEmailError(`User already exists`)
                    return
                }
                else if(result.data === 'does not exist') {
                    navigate('/LoginForm')
                    return
                }
                else if(result.data === 'error') {
                    setEmailError(`${result.data}`)
                    return
                }
            })
            .catch(e => {
                alert(`${e}`)
                console.log(e);
            }
        )
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
                value={name}
                placeholder = "Enter your Name"
                onChange={(e) => setName(e.target.value)}
                className={'inputBox'}
          />
          <label className="errorLabel">{nameError}</label>
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
            type='Password'
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