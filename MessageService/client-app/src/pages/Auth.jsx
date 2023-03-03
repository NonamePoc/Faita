import React from 'react'
import { Login, Registration } from '../components'

function Auth() {
  const [isSignUpVisible, setSignUpVisible] = React.useState(false)
  const toggleSignUpVisible = () => {
    setSignUpVisible(!isSignUpVisible)
  }

  return (
    <>
      <div className='auth'>
        <section
          className={`auth__container ${isSignUpVisible ? 'show-sign-up' : ''}`}
        >
          <Login />

          <section className='auth__sub'>
            <div className='auth__sub__back-image'>
              <div className='auth__sub__img-text move-up'>
                <h2>New here?</h2>
                <p>Sign up and discover great amount of new opportunities!</p>
              </div>
              <div className='auth__sub__img-text move-in'>
                <h2>One of us?</h2>
                <p>
                  If you already has an account, just sign in. We've missed you!
                </p>
              </div>
              <div className='auth__sub__btn' onClick={toggleSignUpVisible}>
                <span className='move-up'>Sign Up</span>
                <span className='move-in'>Sign In</span>
              </div>
            </div>

            <Registration />
          </section>
        </section>
      </div>
    </>
  )
}

export default Auth
