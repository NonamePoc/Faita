const sortByDate = (items) =>
  [...items].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

export default sortByDate
