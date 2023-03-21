import React from 'react'
import { ThemeSwitcher } from '../components'
import { pen } from '../assets'

function Settings() {
  const [inputValue, setInputValue] = React.useState('Vlasta')

  const onChangeInput = (event) => {
    setInputValue(event.target.value)
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
          <div className='stngs__change'>
            <input type='text' value={inputValue} onChange={onChangeInput} />
            <img src={pen} alt='pen' />
          </div>
        </div>
        <div className='stngs__item'>
          <div>
            <h2>Change Surname</h2>
            <p>Change your surname as it appears on your account.</p>
          </div>
          <div className='stngs__change'>
            <input value='Vasylechko' disabled />
            <img src={pen} alt='pen' />
          </div>
        </div>
        <div className='stngs__item'>
          <div>
            <h2>Change Email</h2>
            <p>Change your email.</p>
          </div>
          <div className='stngs__change'>
            <input value='example@gmail.com' disabled />
            <img src={pen} alt='pen' />
          </div>
        </div>
        <div className='stngs__item'>
          <div>
            <h2>Change Password</h2>
            <p>Change your password.</p>
          </div>
          <div className='stngs__change'>
            <input value='********' disabled />
            <img src={pen} alt='pen' />
          </div>
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
            <input type='checkbox' id='switch' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Settings
