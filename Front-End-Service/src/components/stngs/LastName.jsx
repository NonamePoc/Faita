import React from 'react'
import { useDispatch } from 'react-redux'
import { changeLastName } from '../../redux/asyncThunks/user'
import { pen } from '../../assets'

function LastName({ lastName }) {
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(false)
  const onBlurLastName = (event) => {
    dispatch(changeLastName(event.target.value)).then(() => setLoading(false))
  }
  return (
    <div className='stngs__item'>
      <div>
        <h2>Change Surname</h2>
        <p>Change your surname as it appears on your account.</p>
      </div>
      <form className='stngs__change'>
        <input
          defaultValue={lastName}
          onBlur={onBlurLastName}
          onChange={() => setLoading(true)}
          aria-label='User Surname'
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

export default LastName
