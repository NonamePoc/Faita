import React from 'react'
import { Login, Registration, ThemeSwitcher } from '../components'

function Auth() {
  const [isSignUpVisible, setSignUpVisible] = React.useState(false)
  const toggleSignUpVisible = () => setSignUpVisible(!isSignUpVisible)

  return (
    <div className='auth'>
      <section className={`card cont ${isSignUpVisible ? 's-signup' : ''}`}>
        <Login />
        <section className='sub-cont'>
          <div className='img'>
            <div className='img-text m-up'>
              <h2>New here?</h2>
              <p>Sign up and discover great amount of new opportunities!</p>
            </div>
            <div className='img-text m-in'>
              <h2>One of us?</h2>
              <p>
                If you already has an account, just sign in. We've missed you!
              </p>
            </div>
            <div className='auth-theme-btn'>
              <ThemeSwitcher />
            </div>
            <div className='img-btn ' onClick={toggleSignUpVisible}>
              <span className='m-up '>Sign Up</span>
              <span className='m-in '>Sign In</span>
            </div>
          </div>
          <Registration />
        </section>
      </section>
    </div>
  )
}

export default Auth
