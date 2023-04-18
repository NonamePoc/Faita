import axios from 'axios'

export const getFriends = async (id) => {
  try {
    const response = await axios.post(
      `https://localhost:7206/api/friends/getFriends`,
      { userId: id }
    )
    return response
  } catch (error) {
    if (error.response.data.Errors) {
      alert(error.response.data.Errors[0].Detail)
    } else {
      alert(error.message)
    }
  }
}

export const addFriend = async (id, friendId, token) => {
  try {
    const response = await axios.post(
      `https://localhost:7206/api/friends/addFriend`,
      { userId: id, userFriendId: friendId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response
  } catch (error) {
    if (error.response.data.Errors) {
      alert(error.response.data.Errors[0].Detail)
    } else {
      alert(error.message)
    }
  }
}

export const removeFriend = async (id, friendId, token) => {
  try {
    const response = await axios.post(
      `https://localhost:7206/api/friends/removeFriend`,
      { userId: id, friendId: friendId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response
  } catch (error) {
    if (error.response.data.Errors) {
      alert(error.response.data.Errors[0].Detail)
    } else {
      alert(error.message)
    }
  }
}
