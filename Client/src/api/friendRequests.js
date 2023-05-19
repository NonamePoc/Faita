import { instance } from './axios'

export const getFriends = async (token) => {
  try {
    const response = await instance.get(`friends/friend`, {
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
    const response = await instance.get(`friends/receiveRequest`, {
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
    const response = await instance.get(`friends/sendRequest`, {
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
      `friends/friend`,
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
      `friends/confirm`,
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

export const cancelFriendRequest = async (friendId, token) => {
  try {
    const response = await instance.post(
      `friends/cancelFriendRequestAsync`,
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

export const cancelMyRequest = async (friendId, token) => {
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

export const removeFriend = async (friendId, token) => {
  try {
    const response = await instance.delete(
      `friends/friend?friendId=${friendId}`,
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
