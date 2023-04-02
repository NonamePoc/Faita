export const sendMessage = async (
  connection,
  userId,
  receiverId,
  text,
  token
) => {
  try {
    connection
      .invoke('SendMessage', userId, receiverId, text)
      .catch((error) => console.log(error))
  } catch (error) {
    console.error(error)
  }
}
