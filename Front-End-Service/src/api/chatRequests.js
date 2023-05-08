import { instance } from './axios'

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

export const createRoom = async (roomName, friendId, token) => {
  try {
    const response = await instance.post(
      `chat/createChatRoom`,
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
      alert(error.response.data.Errors[0].Detail)
    } else {
      alert(error.message)
    }
  }
}
