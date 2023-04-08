import axios from 'axios'

export const getFriends = async (id) => {
  try {
    const response = await axios.post(`/api/friends/getFriends`, { userId: id })
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
      `/api/friends/addFriend`,
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
