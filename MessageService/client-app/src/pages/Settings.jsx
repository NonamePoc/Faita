import React from 'react'
import { ThemeSwitcher } from '../components'

function Settings() {
  const [inputValue, setInputValue] = React.useState('Vlasta')

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
            <input
              type='text'
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value)
              }}
            />
            <svg
              width='22'
              height='22'
              viewBox='0 0 22 22'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                opacity='0.15'
                d='M3.66666 18.3333H7.33332L16.5 9.16667L12.8333 5.5L3.66666 14.6667V18.3333Z'
                fill='#9BA9BA'
              />
              <path
                d='M16.5 9.16667L19.25 6.41667L15.5833 2.75L12.8333 5.5M16.5 9.16667L7.33332 18.3333H3.66666V14.6667L12.8333 5.5M16.5 9.16667L12.8333 5.5'
                stroke='#9BA9BA'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
        <div className='stngs__item'>
          <div>
            <h2>Change Surname</h2>
            <p>Change your surname as it appears on your account.</p>
          </div>
          <div className='stngs__change'>
            <input value='Vasylechko' disabled />
            <svg
              width='22'
              height='22'
              viewBox='0 0 22 22'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                opacity='0.15'
                d='M3.66666 18.3333H7.33332L16.5 9.16667L12.8333 5.5L3.66666 14.6667V18.3333Z'
                fill='#9BA9BA'
              />
              <path
                d='M16.5 9.16667L19.25 6.41667L15.5833 2.75L12.8333 5.5M16.5 9.16667L7.33332 18.3333H3.66666V14.6667L12.8333 5.5M16.5 9.16667L12.8333 5.5'
                stroke='#9BA9BA'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
        <div className='stngs__item'>
          <div>
            <h2>Change Email</h2>
            <p>Change your email.</p>
          </div>
          <div className='stngs__change'>
            <input value='example@gmail.com' disabled />
            <svg
              width='22'
              height='22'
              viewBox='0 0 22 22'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                opacity='0.15'
                d='M3.66666 18.3333H7.33332L16.5 9.16667L12.8333 5.5L3.66666 14.6667V18.3333Z'
                fill='#9BA9BA'
              />
              <path
                d='M16.5 9.16667L19.25 6.41667L15.5833 2.75L12.8333 5.5M16.5 9.16667L7.33332 18.3333H3.66666V14.6667L12.8333 5.5M16.5 9.16667L12.8333 5.5'
                stroke='#9BA9BA'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
        <div className='stngs__item'>
          <div>
            <h2>Change Password</h2>
            <p>Change your password.</p>
          </div>
          <div className='stngs__change'>
            <input value='********' disabled />
            <svg
              width='22'
              height='22'
              viewBox='0 0 22 22'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                opacity='0.15'
                d='M3.66666 18.3333H7.33332L16.5 9.16667L12.8333 5.5L3.66666 14.6667V18.3333Z'
                fill='#9BA9BA'
              />
              <path
                d='M16.5 9.16667L19.25 6.41667L15.5833 2.75L12.8333 5.5M16.5 9.16667L7.33332 18.3333H3.66666V14.6667L12.8333 5.5M16.5 9.16667L12.8333 5.5'
                stroke='#9BA9BA'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
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
