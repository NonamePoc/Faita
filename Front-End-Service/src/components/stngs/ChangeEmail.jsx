import React from 'react'
import { useDispatch } from 'react-redux'
import { changeUserEmail } from '../../redux/asyncThunks/user'
import { pen } from '../../assets'

function ChangeEmail({ email }) {
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(false)

  const onBlurEmail = (event) => {
    dispatch(changeUserEmail(event.target.value)).then(() => setLoading(false))
  }
  return (
    <div className='stngs__item'>
      <div>
        <h2>Change Email</h2>
        <p>Change your email.</p>
      </div>
      <form className='stngs__change'>
        <input
          defaultValue={email}
          onBlur={onBlurEmail}
          onChange={() => setLoading(true)}
          aria-label='User Email'
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

export default ChangeEmail
