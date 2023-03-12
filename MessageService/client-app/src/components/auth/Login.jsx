import React from 'react'

function Login() {
  return (
    <form className='form sign-in'>
      <h2>Sign In</h2>
      <label className='label'>
        <span>Email Address</span>
        <div className='field'>
          <svg
            width='20px'
            height='20px'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M22,5V9L12,13,2,9V5A1,1,0,0,1,3,4H21A1,1,0,0,1,22,5ZM2,11.154V19a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V11.154l-10,4Z' />
          </svg>
          <input
            type='email'
            name='email'
            required
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
          />
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
          <input type='password' name='password' required minLength='8' />
        </div>
      </label>
      <button className='btn submit' type='submit'>
        Sign In
      </button>
    </form>
  )
}

export default Login
