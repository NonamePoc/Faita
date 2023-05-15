import React from 'react'
import { useDispatch } from 'react-redux'
import { changeUserPassword } from '../../redux/asyncThunks/user'
import { pen } from '../../assets'

function ChangePass({ password, userName }) {
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(false)

  const onBlurPassword = (event) => {
    dispatch(changeUserPassword(event.target.value)).then(() =>
      setLoading(false)
    )
  }

  return (
    <div className='stngs__item'>
      <div>
        <h2>Change Password</h2>
        <p>Change your password.</p>
      </div>
      <form className='stngs__change'>
        <input
          type='text'
          id='username'
          autoComplete='username'
          aria-label='Username'
          disabled
          className='none'
        />
        <input
          type='password'
          defaultValue={password}
          onBlur={onBlurPassword}
          onChange={() => setLoading(true)}
          autoComplete='new-password'
          aria-label='User Password'
        />
        {loading ? (
          <div className='lds-ring'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <img src={pen} alt='pen' />
        )}
      </form>
    </div>
  )
}

export default ChangePass
