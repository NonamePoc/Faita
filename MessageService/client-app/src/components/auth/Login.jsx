import React from 'react'

function Login() {
  return (
    <form className='auth__form sign-in'>
      <h2>Sign In</h2>
      <label>
        <span>Email Address</span>
        <input type='email' name='email' />
      </label>
      <label>
        <span>Password</span>
        <input type='password' name='password' />
      </label>
      <button className='auth__form__submit'>Sign In</button>
      <p className='auth__form__forgot-pass'>Forgot Password ?</p>
    </form>
  )
}

export default Login
