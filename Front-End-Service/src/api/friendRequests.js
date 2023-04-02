import axios from 'axios'

export const getFriends = async (id) => {
  try {
    const response = await axios.post(
      `https://localhost:7206/api/friends/getFriends`,
      { userId: id }
    )
    return response
  } catch (error) {
    console.error(error)
  }
}

export const addFriend = async (id, friendId, token) => {
  try {
    const response = await axios.post(
      `https://localhost:7206/api/friends/addFriend`,
      { userId: id, friendId: friendId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response
  } catch (error) {
    console.error(error)
  }
}
