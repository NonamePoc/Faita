import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { searchUser } from '../../api/userRequests'
import { setAvatar } from '../../utils/setAvatar'
import {
  addToFriends,
  fetchSentRequests,
} from '../../redux/asyncThunks/friends'

function SearchBar() {
  const [users, setUsers] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const currentUser = useSelector((state) => state.user)
  const searchBar = React.useRef(null)
  const dispatch = useDispatch()

  const search = (event) =>
    searchUser(event.target.value).then((res) =>
      setUsers(
        res.data.$values
          .filter((user) => user.id !== currentUser.id)
          .map((user) => ({ ...user, openPopup: false }))
      )
    )

  const onClickAddFriend = (userId) => {
    dispatch(addToFriends(userId)).then(() => {
      dispatch(fetchSentRequests())
    })
  }

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
    <section ref={searchBar}>
      <div className='card search-bar'>
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
          {users.slice(0, 10).map((user, index) => (
            <li key={index}>
              <img
                className='search_avatar'
                src={setAvatar(user.avatar)}
                alt='User avatar'
              />
              <p>{user.userName}</p>
              <button
                className='btn btn-primary'
                onClick={() => onClickAddFriend(user.id)}
              >
                Add Friend
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default SearchBar
