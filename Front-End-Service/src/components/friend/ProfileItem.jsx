import { Link } from 'react-router-dom'

function ProfileItem({ friend }) {
  return (
    <Link to={`/profile/${friend.userName}`}>
      <div className='friendsMini__item'>
        <img src='https://picsum.photos/200' alt='friend' />
        <h2>{friend.userName}</h2>
      </div>
    </Link>
  )
}

export default ProfileItem
