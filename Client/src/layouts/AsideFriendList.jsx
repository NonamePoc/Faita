import React from 'react'
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
      {receivedReqsLoaded && receivedRequests.length > 0 && (
        <>
          <h1 className='title'>Friend Requests ({receivedRequests.length})</h1>
          <ul className='card friends'>
            {receivedRequests.map((request) => (
              <Request key={request.id} user={request} />
            ))}
          </ul>
        </>
      )}
    </aside>
  )
})

export default AsideFriendList
