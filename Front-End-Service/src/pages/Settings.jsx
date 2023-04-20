import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ThemeSwitcher } from '../components'
import { pen } from '../assets'
import {
  changeFirstName,
  changeLastName,
  changeUserEmail,
  changeUserPassword,
  resetUserData,
} from '../redux/slices/user'

function Settings() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const onBlurFirstName = (event) => {
    dispatch(changeFirstName(event.target.value))
  }

  const onBlurLastName = (event) => {
    dispatch(changeLastName(event.target.value))
  }

  const onBlurEmail = (event) => {
    dispatch(changeUserEmail(event.target.value))
  }

  const onBlurPassword = (event) => {
    dispatch(changeUserPassword(event.target.value))
  }

  const onClickExit = () => {
    dispatch(resetUserData())
  }

  return (
    <section className='stngs'>
      <h1>Personal Information</h1>
      <div className='card'>
        <div className='stngs__item'>
          <div>
            <h2>Change Name</h2>
            <p>Change your name as it appears on your account.</p>
          </div>
          <form className='stngs__change'>
            <input
              type='text'
              defaultValue={user.firstName}
              onBlur={onBlurFirstName}
              aria-label='User Name'
            />
            <img src={pen} alt='pen' />
          </form>
        </div>
        <div className='stngs__item'>
          <div>
            <h2>Change Surname</h2>
            <p>Change your surname as it appears on your account.</p>
          </div>
          <form className='stngs__change'>
            <input
              defaultValue={user.lastName}
              onBlur={onBlurLastName}
              aria-label='User Surname'
            />
            <img src={pen} alt='pen' />
          </form>
        </div>
        <div className='stngs__item'>
          <div>
            <h2>Change Email</h2>
            <p>Change your email.</p>
          </div>
          <form className='stngs__change'>
            <input
              defaultValue={user.email}
              onBlur={onBlurEmail}
              aria-label='User Email'
            />
            <img src={pen} alt='pen' />
          </form>
        </div>
        <div className='stngs__item'>
          <div>
            <h2>Change Password</h2>
            <p>Change your password.</p>
          </div>
          <form className='stngs__change'>
            <input
              type='password'
              defaultValue={user.password}
              onBlur={onBlurPassword}
              autoComplete='new-password'
              aria-label='User Password'
            />
            <img src={pen} alt='pen' />
          </form>
        </div>
      </div>
      <h1>UI Settings</h1>
      <div className='card'>
        <div className='stngs__item'>
          <div>
            <h2>Set Theme</h2>
            <p>Toggle light and dark theme.</p>
          </div>
          <div className='stngs__change'>
            <ThemeSwitcher />
          </div>
        </div>
        <div className='stngs__item'>
          <div>
            <h2>Show Notifications</h2>
            <p>
              You can get notifications about new messages while this option is
              enabled.
            </p>
          </div>
          <div className='stngs__change'>
            <input
              type='checkbox'
              id='switch'
              aria-label='Message Notifications Switcher'
            />
          </div>
        </div>
      </div>
      <h1>Exit</h1>
      <div className='card'>
        <div className='stngs__item'>
          <div>
            <h2>Exit</h2>
            <p>To exit your account, click the button.</p>
          </div>
          <div className='stngs__change'>
            <button className='btn' onClick={onClickExit}>
              Exit
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Settings
