import React from 'react'

const usePopup = () => {
  const [isOpen, setOpen] = React.useState(false)

  const togglePopup = () => {
    setOpen(!isOpen)
  }

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.pop')) {
      setOpen(false)
    }
  }

  React.useEffect(() => {
    isOpen
      ? document.addEventListener('mousedown', handleOutsideClick)
      : document.removeEventListener('mousedown', handleOutsideClick)
  })

  return { isOpen, togglePopup }
}

export default usePopup
