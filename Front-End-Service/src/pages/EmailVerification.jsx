import React from 'react'
/* import { sendEmailVerification } from '../api/userRequests' */
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function EmailVerification() {
  /* const [html, setHtml] = React.useState('') */
  const navigate = useNavigate()

  React.useEffect(() => {
    /* sendEmailVerification().then((res) => {
      res.status === 200 && setHtml(res.data)
    }) */
    const searchParams = new URLSearchParams(window.location.search)
    const email = searchParams.get('email')
    const newEmail = searchParams.get('newEmail')
    const token = searchParams.get('token')

    axios
      .get(
        `/api/users/change-email?email=${email}&newEmail=${newEmail}&token=${token}`
      )
      .then(() => {
        navigate('/settings')
      })
      .catch((error) => {
        console.error('Sending Email Verification Failed', error)
      })
  }, [])

  return (
    <div>
      <h1>Email Verification</h1>
      <h2>{/* {html} */}</h2>
    </div>
  )
}

export default EmailVerification
