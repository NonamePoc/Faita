import axios from 'axios'

export const sendMessage = async (userId, receiverId, text, token) => {
  try {
    const response = await axios.post(
      `https://localhost:7206/api/chat/sendMessage`,
      {
        userId: userId,
        receiverId: receiverId,
        text: text,
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
