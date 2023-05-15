const extractTime = (time) => {
  if (!time) return 0
  const matches = time.match(/(\d+)\s+(\w+)/)
  const value = parseInt(matches[1])
  const unit = matches[2]
  switch (unit) {
    case 'hours':
      return value * 60
    case 'mins':
      return value
    case 'days':
      return value * 24 * 60
    default:
      return 0
  }
}

export default extractTime
