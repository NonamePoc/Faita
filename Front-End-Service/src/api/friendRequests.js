import { instance } from './axios'

export const getFriends = async (token) => {
  try {
    const response = await instance.get(`friends/getFriends`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    if (error.response.data.Errors) {
      alert(error.response.data.Errors[0].Detail)
    } else {
      alert(error.message)
    }
  }
}

export const getReceivedRequests = async (token) => {
  try {
    const response = await instance.get(`friends/GetReceiveRequest`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    if (error.response.data.Errors) {
      alert(error.response.data.Errors[0].Detail)
    } else {
      alert(error.message)
    }
  }
}

export const getSentRequests = async (token) => {
  try {
    const response = await instance.get(`friends/GetSendRequest`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    if (error.response.data.Errors) {
      alert(error.response.data.Errors[0].Detail)
    } else {
      alert(error.message)
    }
  }
}

export const addFriend = async (friendId, token) => {
  try {
    const response = await instance.post(
      `friends/addFriend`,
      { userFriendId: friendId },
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

export const confirmFriendRequest = async (friendId, token) => {
  try {
    const response = await instance.post(
      `friends/confirmFriendRequest`,
      { userFriendId: friendId },
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

export const removeFriend = async (friendId, token) => {
  try {
    const response = await instance.post(
      `friends/removeFriend`,
      { friendId: friendId },
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

export const cancelFriendRequest = async (friendId, token) => {
  try {
    const response = await instance.post(
      `friends/cancelUserFriendRequest`,
      { userFriendId: friendId },
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
