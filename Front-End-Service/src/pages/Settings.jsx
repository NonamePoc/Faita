import React from 'react'
import { useSelector } from 'react-redux'
import { resetPersistor } from '../redux/store'
import {
  ChangeAvatar,
  ChangeEmail,
  ChangePass,
  FirstName,
  LastName,
  ModalAvatar,
  ThemeSwitcher,
} from '../components'

function Settings() {
  const user = useSelector((state) => state.user)

  const onClickExit = () => {
    resetPersistor()
    window.location.reload()
  }

  return (
    <section className='stngs'>
      <h1>Personal Information</h1>
      <div className='card'>
        <FirstName firstName={user.firstName} />
        <LastName lastName={user.lastName} />
        <ChangeEmail email={user.email} />
        <ChangePass password={user.password} />
      </div>
      <h1>UI Settings</h1>
      <div className='card'>
        <ChangeAvatar />
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
      <ModalAvatar />
    </section>
  )
}

export default Settings
