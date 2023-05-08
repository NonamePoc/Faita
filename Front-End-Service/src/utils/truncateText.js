const truncateText = (text, lenght) =>
  text.length > lenght ? text.substring(0, lenght) + '...' : text

export default truncateText
