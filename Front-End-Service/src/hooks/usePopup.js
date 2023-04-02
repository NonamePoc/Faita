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

  /* const Popup = ({ svgs, items, actions, styles, type = 'default' }) =>
    type === 'default' ? (
      <ul className={`pop popup ${isOpen ? 'open' : ''} ${styles}`}>
        {items.map((item, index) => (
          <li key={index} onClick={actions[index]}>
            {svgs[index]} {item}
          </li>
        ))}
      </ul>
    ) : (
      <ul
        className={`pop emoji-gif__wrapper ${isOpen ? 'open' : ''} ${styles}`}
      >
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    ) */

  return { isOpen, togglePopup }
}

export default usePopup
