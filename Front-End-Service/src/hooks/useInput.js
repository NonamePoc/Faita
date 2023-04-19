import React from 'react'

function useInput(initialValue) {
  const [value, setValue] = React.useState(initialValue)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleEmojiSelect = (emoji) => {
    setValue((prevValue) => prevValue + emoji.native)
  }

  const resetValue = () => {
    setValue('')
  }

  return {
    value,
    handleChange,
    handleEmojiSelect,
    resetValue,
  }
}

export default useInput
