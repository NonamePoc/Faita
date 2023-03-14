import React from 'react'

const usePopup = () => {
  const [isOpen, setOpen] = React.useState(false)

  const togglePopup = () => {
    setOpen(!isOpen)
  }

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.popup')) {
      setOpen(false)
    }
  }

  React.useEffect(() => {
    isOpen
      ? document.addEventListener('mousedown', handleOutsideClick)
      : document.removeEventListener('mousedown', handleOutsideClick)
  })

  const Popup = ({ svgs, items, actions, styles }) => (
    <ul className={`popup ${isOpen ? 'open' : ''} ${styles}`}>
      {items.map((item, index) => (
        <li key={index} onClick={actions[index]}>
          {svgs[index]} {item}
        </li>
      ))}
    </ul>
  )

  return { Popup, togglePopup }
}

export default usePopup
