import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginForm.css'
import axios from "axios";


const LoginForm = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = (e) => {
    // Set initial error values to empty 
      setEmailError('')
      setPasswordError('')

  // Check if the user has entered both fields correctly
  if ('' === email) {
    setEmailError('Please enter your email')
    return 
  }

  if (!/^[\w-\.]+@([\w-]+\.)+(com|org|net|edu|gov|info|biz|io|tech)$/.test(email)) {
    setEmailError('Please enter a valid email')
    return
  }

  if ('' === password) {
    setPasswordError('Please enter a password')
    return 
  }

  if (password.length < 7) {
    setPasswordError('The password must be 8 characters or longer')
    return
  }

  e.preventDefault()
  axios.post('http://localhost:3001/login', {email,password})
  .then( result => {
    if(result.data === 'Success') {
      navigate('/page1')
      return
    }
    else if(result.data == 'the password is incorrect') {
      setPasswordError(result.data);
      return 
    }
    else {
      setEmailError(`${email} is not registered!`)
      return
    }
  })
}

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
        <div className="underlineContainer"></div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'input'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
  )
}

export default LoginForm