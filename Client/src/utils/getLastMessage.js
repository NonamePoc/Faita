import moment from 'moment'

const getLastMessage = (messages) => {
  let [lastMessage = {}] = [...messages].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )
  const currentTime = moment()
  if (lastMessage.text) {
    const messageTime = moment(lastMessage.createdAt)
    const timeElapsed = moment.duration(currentTime.diff(messageTime))
    const timeElapsedInMinutes = timeElapsed.asMinutes()

    if (timeElapsedInMinutes >= 60) {
      const timeElapsedInHours = timeElapsed.asHours()
      if (timeElapsedInHours >= 24) {
        const timeElapsedInDays = timeElapsed.asDays()
        return [lastMessage.text, `${Math.floor(timeElapsedInDays)} days ago`]
      }
      return [lastMessage.text, `${Math.floor(timeElapsedInHours)} hours ago`]
    }
    return [lastMessage.text, `${Math.floor(timeElapsedInMinutes)} mins ago`]
  }
  return ['No messages yet']
}

export default getLastMessage
