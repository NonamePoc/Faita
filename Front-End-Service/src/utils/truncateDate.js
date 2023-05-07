import moment from 'moment'

const truncateDate = (createdAt) => {
  const now = moment()
  const date = moment(createdAt)
  if (date.year() === now.year() && date.month() === now.month()) {
    if (date.date() === now.date()) {
      return date.format('HH:mm')
    } else {
      return date.format('MM/DD')
    }
  } else {
    return date.format('YYYY/MM/DD')
  }
}

export default truncateDate
