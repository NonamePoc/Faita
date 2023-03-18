import { Link } from 'react-router-dom'

function ProfileItem() {
  return (
    <Link to='/profile'>
      <div className='friendsMini__item'>
        <img src='https://picsum.photos/id/65/200' alt='friend' />
        <h2>hypernovacyclingice</h2>
      </div>
    </Link>
  )
}

export default ProfileItem
