import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFriends, fetchSentRequests } from '../redux/asyncThunks/friends'
import { FriendCard, SearchBar } from '../components'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Friends() {
  const friends = useSelector((state) => state.friends.friends)
  const loaded = useSelector((state) => state.friends.loaded)
  const sentReqs = useSelector((state) => state.friends.sentRequests)
  const sentReqsLoaded = useSelector((state) => state.friends.sentReqsLoaded)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchFriends())
    dispatch(fetchSentRequests())
  }, [dispatch])

  return (
    <main className='friendsMain'>
      <SearchBar />
      {loaded ? (
        <section className='friendPage'>
          {friends.length > 0 ? (
            friends.map((friend, index) => (
              <FriendCard key={index} friend={friend} type='friend' />
            ))
          ) : (
            <h3>You have no friends</h3>
          )}
          {sentReqsLoaded && sentReqs.length > 0 && (
            <>
              <h3>Your requests:</h3>
              {sentReqs.map((sentReq, index) => (
                <FriendCard key={index} friend={sentReq} type='req' />
              ))}
            </>
          )}
        </section>
      ) : (
        <Skeleton height={100} width={320} />
      )}
    </main>
  )
}

export default Friends
