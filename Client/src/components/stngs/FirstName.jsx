import React from 'react'
import { useDispatch } from 'react-redux'
import { changeFirstName } from '../../redux/asyncThunks/user'
import { pen } from '../../assets'

function FirstName({ firstName }) {
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(false)
  const onBlurFirstName = (event) => {
    dispatch(changeFirstName(event.target.value)).then(() => setLoading(false))
  }
  return (
    <div className='stngs__item'>
      <div>
        <h2>Change Name</h2>
        <p>Change your name as it appears on your account.</p>
      </div>
      <form className='stngs__change'>
        <input
          type='text'
          defaultValue={firstName}
          onBlur={onBlurFirstName}
          onChange={() => setLoading(true)}
          aria-label='User Name'
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

export default FirstName
