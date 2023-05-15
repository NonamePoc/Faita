import React from 'react'

function useToShow(initial, itemRef) {
  const [itemsToShow, setItemsToShow] = React.useState(initial)
  const [scrollPosition, setScrollPosition] = React.useState(0)

  const handleScroll = () => {
    const { scrollTop, scrollHeight } = itemRef.current
    if (scrollTop === 0) {
      setScrollPosition(scrollHeight)
      setItemsToShow((prev) => prev + initial)
    }
  }

  React.useEffect(() => {
    if (scrollPosition === 0) {
      itemRef.current.scrollTop = itemRef.current.scrollHeight
    } else {
      itemRef.current.scrollTop = itemRef.current.scrollHeight - scrollPosition
    }
  }, [itemRef, scrollPosition])

  return {
    itemsToShow,
    handleScroll,
  }
}

export default useToShow
