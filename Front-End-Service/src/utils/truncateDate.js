import moment from 'moment'

const truncateDate = (createdAt) => {
  const now = moment()
  const date = moment(createdAt)
  if (date.year() === now.year() && date.month() === now.month()) {
    if (date.date() === now.date()) {
      return date.format('H:mm')
    } else {
      return date.format('M/D')
    }
  } else {
    return date.format('YYYY/M/D')
  }
}

export default truncateDate
