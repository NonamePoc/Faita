import { instance } from './axios'

export const getRooms = async (token) => {
  try {
    const response = await instance.get(`chat/chatRooms`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    if (error.response.data.Errors) {
      throw new Error(error.response.data.Errors[0].Detail)
    } else {
      throw new Error(error.message)
    }
  }
}

export const createRoom = async (roomName, friendId, token) => {
  try {
    const response = await instance.post(
      `chat/chatRoom`,
      {
        name: roomName,
        friendId,
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
      throw new Error(error.response.data.Errors[0].Detail)
    } else {
      throw new Error(error.message)
    }
  }
}

export const sendMessage = async (receiverId, text, roomId, token) => {
  try {
    const response = await instance.post(
      `chat/sendMessage`,
      {
        receiverId,
        text,
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
      throw new Error(error.response.data.Errors[0].Detail)
    } else {
      throw new Error(error.message)
    }
  }
}
