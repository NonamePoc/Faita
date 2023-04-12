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

export const joinRoom = async (userId, room, token) => {
  try {
    const response = await axios.post(
      `https://localhost:7206/api/chat/joinChatRoom`,
      {
        userId: userId,
        chatRoomId: room,
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
