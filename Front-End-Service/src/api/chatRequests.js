import axios from 'axios'

export const sendMessage = async (userId, receiverId, text, roomId, token) => {
  try {
    const response = await axios.post(
      `https://localhost:7206/api/chat/sendMessage`,
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
    const response = await axios.get(
      `https://localhost:7206/api/chat/getChatRooms`,
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

export const createRoom = async (room, userId, token) => {
  try {
    const response = await axios.post(
      `https://localhost:7206/api/chat/createChatRoom`,
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
    const response = await axios.post(
      `https://localhost:7206/api/chat/joinChatRoom`,
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
