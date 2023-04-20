import { instance } from './axios'

export const sendMessage = async (userId, receiverId, text, roomId, token) => {
  try {
    const response = await instance.post(
      `chat/sendMessage`,
      {
        userId: userId,
        receiverId: receiverId,
        text: text,
        chatRoomId: roomId,
      },
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

export const getRooms = async (token) => {
  try {
    const response = await instance.get(`chat/getChatRooms`, {
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

export const createRoom = async (room, userId, token) => {
  try {
    const response = await instance.post(
      `chat/createChatRoom`,
      {
        name: room,
        userId: userId,
      },
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

export const joinRoom = async (userId, roomId, token) => {
  try {
    const response = await instance.post(
      `chat/joinChatRoom`,
      {
        userId: userId,
        chatRoomId: roomId,
      },
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
