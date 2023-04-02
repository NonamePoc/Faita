import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../../redux/reducers/user'
import { loginUser } from '../../api/userRequests'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userName, password } = useSelector((state) => state.user)
  const userData = { userName, password }

  const handleChange = (event) => {
    const { name, value } = event.target
    dispatch(setUserData({ ...userData, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    loginUser(userData).then((response) => {
      if (response.status === 200) {
        dispatch(
          setUserData({
            token: response.data.token,
            id: response.data.id,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            patronymic: response.data.patronymic,
          })
        )
        navigate('/')
      }
    })
  }

  return (
    <form className='form sign-in' onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <label className='label'>
        <span>Username</span>
        <div className='field'>
          <svg
            width='19px'
            height='19px'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M3.28397 12.1083C3.70912 7.22201 8.02178 3.25 12.8523 3.25C15.6636 3.25 17.6986 4.16965 18.981 5.56536C20.2618 6.95924 20.9197 8.9663 20.7125 11.3964C20.2611 14.8772 18.8615 15.8252 18.1958 15.9697C17.8355 16.0479 17.5754 15.9487 17.4329 15.8262C17.3056 15.7167 17.189 15.521 17.2378 15.1744L18.2721 7.4174C18.3451 6.86996 17.9605 6.367 17.413 6.29401L16.9174 6.22792C16.37 6.15493 15.867 6.53955 15.794 7.08699L15.7793 7.19766C15.2714 6.70421 14.6546 6.30909 13.9342 6.05059C10.8495 4.94365 7.58806 6.96619 6.43793 10.0817C5.28638 13.201 6.4685 16.8379 9.56582 17.9494C11.5253 18.6525 13.556 18.093 15.0716 16.7926C15.2517 17.1454 15.4986 17.46 15.8028 17.7217C16.5881 18.3969 17.6641 18.6433 18.7261 18.4128C20.9033 17.9402 22.6878 15.6574 23.1955 11.6887C23.1976 11.6722 23.1994 11.6557 23.2008 11.6392C23.4647 8.62581 22.6623 5.87667 20.8219 3.87384C18.9789 1.86813 16.2234 0.75 12.8523 0.75C6.70601 0.75 1.32927 5.73254 0.79338 11.8917C0.250578 18.1302 4.86475 23.25 11.1008 23.25C13.0255 23.25 14.2577 23.0912 16.0641 22.3275L16.2943 22.2301C16.803 22.015 17.0411 21.4283 16.826 20.9196L16.6313 20.4591C16.4162 19.9504 15.8295 19.7124 15.3208 19.9275L15.0905 20.0248C13.6716 20.6247 12.7897 20.75 11.1008 20.75C6.35995 20.75 2.86574 16.9152 3.28397 12.1083ZM8.78321 10.9475C9.57932 8.79101 11.6022 7.86986 13.0898 8.40367C14.5648 8.93296 15.5115 10.8999 14.7168 13.0525C13.9207 15.209 11.8978 16.1301 10.4102 15.5963C8.93524 15.067 7.98852 13.1001 8.78321 10.9475Z'
            />
          </svg>
          <input name='userName' type='text' required onChange={handleChange} />
        </div>
      </label>
      <label className='label'>
        <span>Password</span>
        <div className='field'>
          <svg
            height='20px'
            width='20px'
            version='1.1'
            id='_x32_'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
          >
            <g>
              <path
                d='M417.295,170.179h-32.839v-41.716c0.008-35.405-14.405-67.66-37.624-90.839
		C323.652,14.413,291.397-0.016,255.992,0c-35.398-0.016-67.652,14.413-90.832,37.624c-23.211,23.18-37.632,55.434-37.617,90.839
		v41.716H94.697c-21.198,0-38.375,17.186-38.375,38.375v121.759C56.322,430.654,145.724,512,255.999,512
		c110.276,0,199.678-81.346,199.678-181.687V208.554C455.678,187.365,438.493,170.179,417.295,170.179z M270.548,341.836
		l11.704,50.025H229.74l11.704-50.033c-14.39-5.773-24.554-19.831-24.554-36.282c0-21.6,17.509-39.109,39.102-39.109
		c21.608,0,39.117,17.509,39.117,39.109C295.109,321.997,284.929,336.055,270.548,341.836z M339.328,170.179H172.671v-41.716
		c0.008-23.093,9.288-43.777,24.404-58.933c15.148-15.116,35.84-24.388,58.917-24.404c23.084,0.016,43.784,9.296,58.933,24.404
		c15.108,15.156,24.388,35.84,24.403,58.933V170.179z'
              />
            </g>
          </svg>
          <input
            name='password'
            type='password'
            minLength='8'
            required
            onChange={handleChange}
          />
        </div>
      </label>
      <button className='btn submit' type='submit'>
        Sign In
      </button>
    </form>
  )
}

export default Login
