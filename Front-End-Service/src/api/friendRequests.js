import { instance } from './axios'

export const getFriends = async (id) => {
  try {
    const response = await instance.post(`friends/getFriends`, { userId: id })
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
    const response = await instance.post(
      `friends/addFriend`,
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
    const response = await instance.post(
      `friends/removeFriend`,
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
