import React from 'react'
import Friend from '../components/friend/Aside'
import Request from '../components/friend/Request'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchFriends,
  fetchReceivedRequests,
} from '../redux/asyncThunks/friends'

const AsideFriendList = React.memo(function AsideFriendList() {
  const dispatch = useDispatch()
  const receivedRequests = useSelector(
    (state) => state.friends.receivedRequests
  )
  const receivedReqsLoaded = useSelector(
    (state) => state.friends.receivedReqsLoaded
  )

  React.useEffect(() => {
    dispatch(fetchFriends())
    dispatch(fetchReceivedRequests())
  }, [dispatch])

  return (
    <aside>
      {receivedReqsLoaded && (
        <>
          <h1 className='friendsTitle'>
            There are users would like to be your friend
          </h1>
          <ul className='card friends'>
            {receivedRequests.map((request) => (
              <Request key={request.id} user={request} />
            ))}
          </ul>
        </>
      )}

      <h1 className='friendsTitle'>Offline Friends</h1>
      <ul className='card friends'>
        <Friend />
        <Friend />
      </ul>
    </aside>
  )
})

export default AsideFriendList
