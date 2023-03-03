import React from 'react'

function Registration() {
  return (
    <>
      <form className='auth__form sign-up'>
        <h2>Sign Up</h2>
        <label>
          <span>Email</span>
          <input type='email' />
        </label>
        <label>
          <span>Password</span>
          <input type='password' />
        </label>
        <label>
          <span>Confirm Password</span>
          <input type='password' />
        </label>
        <button className='auth__form__submit'>Sign Up Now</button>
      </form>
    </>
  )
}

export default Registration
