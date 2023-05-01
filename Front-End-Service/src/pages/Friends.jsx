import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFriends } from '../redux/asyncThunks/friends'
import { FriendCard, SearchBar } from '../components'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Friends() {
  const friends = useSelector((state) => state.friends.friends)
  const loaded = useSelector((state) => state.friends.loaded)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchFriends())
  }, [dispatch])

  return (
    <main className='friendsMain'>
      <SearchBar />
      {loaded ? (
        <>
          <section className='friendPage'>
            {friends.length > 0 ? (
              friends.map((friend, index) => (
                <FriendCard key={index} friend={friend} />
              ))
            ) : (
              <h3>You have no friends</h3>
            )}
          </section>
        </>
      ) : (
        <Skeleton height={100} width={320} />
      )}
    </main>
  )
}

export default Friends
