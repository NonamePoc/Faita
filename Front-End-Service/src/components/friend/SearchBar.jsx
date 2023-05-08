import React from 'react'
import { useSelector } from 'react-redux'
import SearchPopup from './SearchPopup'
import { searchUser } from '../../api/userRequests'
import { setAvatar } from '../../utils/setAvatar'

function SearchBar() {
  const [users, setUsers] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const currentUser = useSelector((state) => state.user)
  const searchBar = React.useRef(null)
  const [openPopup, setOpenPopup] = React.useState([])

  const togglePopup = (index) => {
    const updatedOpenPopup = [...openPopup]
    updatedOpenPopup[index] = !updatedOpenPopup[index]
    setOpenPopup(updatedOpenPopup)
  }

  const search = (event) =>
    searchUser(event.target.value).then((res) =>
      setUsers(
        res.data.$values
          .filter((user) => user.id !== currentUser.id)
          .map((user) => ({ ...user, openPopup: false }))
      )
    )

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (searchBar.current && !searchBar.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchBar])

  return (
    <section ref={searchBar} className='card'>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Find a user...'
          onFocus={() => setOpen(true)}
          onChange={search}
        />
        <svg
          width='30px'
          height='30px'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
          <g
            id='SVGRepo_tracerCarrier'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></g>
          <g id='SVGRepo_iconCarrier'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15C11.381 15 12.6296 14.4415 13.5355 13.5355C14.4415 12.6296 15 11.381 15 10C15 7.23858 12.7614 5 10 5ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 11.5719 16.481 13.0239 15.6063 14.1921L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L14.1921 15.6063C13.0239 16.481 11.5719 17 10 17C6.13401 17 3 13.866 3 10Z'
            ></path>{' '}
          </g>
        </svg>
      </div>
      <div className={`card search-modal ${open ? 'active' : ''}`}>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <img
                className='search_avatar'
                src={setAvatar(user.avatar)}
                alt='User avatar'
              />
              <p>{user.userName}</p>
              <svg
                onClick={() => togglePopup(index)}
                className='dots friendCard__dots'
                width='30'
                height='30'
                viewBox='0 0 30 30'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clipPath='url(#clip0_5_170)'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M26.2903 14.9812C26.2903 16.0158 25.4498 16.8562 24.4153 16.8562C23.3803 16.8562 22.5403 16.0158 22.5403 14.9812C22.5403 13.9462 23.3803 13.1062 24.4153 13.1062C25.4498 13.1062 26.2903 13.9462 26.2903 14.9812Z'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M7.54028 14.9812C7.54028 16.0158 6.69981 16.8562 5.66528 16.8562C4.63028 16.8562 3.79028 16.0158 3.79028 14.9812C3.79028 13.9462 4.63028 13.1062 5.66528 13.1062C6.69981 13.1062 7.54028 13.9462 7.54028 14.9812Z'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M16.9153 14.9812C16.9153 16.0158 16.0748 16.8562 15.0403 16.8562C14.0053 16.8562 13.1653 16.0158 13.1653 14.9812C13.1653 13.9462 14.0053 13.1062 15.0403 13.1062C16.0748 13.1062 16.9153 13.9462 16.9153 14.9812Z'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_5_170'>
                    <rect width='30' height='30' fill='white' />
                  </clipPath>
                </defs>
              </svg>
              <SearchPopup
                userId={user.id}
                isOpen={openPopup[index]}
                togglePopup={togglePopup}
                index={index}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default SearchBar
