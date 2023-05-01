import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

function Captcha({ submitCount, setSubmitCount }) {
  const handleCaptchaVerify = () => {
    setTimeout(() => {
      setSubmitCount(1)
    }, 2000)
  }

  return (
    <>
      {submitCount > 15 ? (
        <>
          <div className='modal-overlay active'></div>
          <ReCAPTCHA
            className='recaptcha'
            sitekey={process.env.REACT_APP_CAPTCHA_API_KEY}
            onChange={handleCaptchaVerify}
          />
        </>
      ) : null}
    </>
  )
}

export default Captcha
