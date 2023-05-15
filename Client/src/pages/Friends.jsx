import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector, useDispatch } from 'react-redux'
import { FriendCard, SearchBar } from '../components'
import { fetchFriends, fetchSentRequests } from '../redux/asyncThunks/friends'

function Friends() {
  const { friends, loaded, sentRequests, sentReqsLoaded } = useSelector(
    (state) => state.friends
  )
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchFriends())
    dispatch(fetchSentRequests())
  }, [dispatch])

  return (
    <main className='friendsMain'>
      <SearchBar />
      {loaded ? (
        <>
          <section className='friendPage'>
            {friends.length > 0 ? (
              friends.map((friend, index) => (
                <FriendCard key={index} friend={friend} type='friend' />
              ))
            ) : (
              <h3>You have no friends</h3>
            )}
          </section>
          {sentReqsLoaded && sentRequests.length > 0 && (
            <>
              <h3>Your requests:</h3>
              <section className='friendPage'>
                {sentRequests.map((sentReq, index) => (
                  <FriendCard key={index} friend={sentReq} type='req' />
                ))}
              </section>
            </>
          )}
        </>
      ) : (
        <Skeleton height={100} width={320} />
      )}
    </main>
  )
}

export default Friends
