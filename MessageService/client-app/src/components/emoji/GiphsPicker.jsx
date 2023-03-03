import React from 'react'
import ReactGiphySearchbox from 'react-giphy-searchbox'

function GiphsPicker() {
  return (
    <ReactGiphySearchbox
      apiKey='cwoInt0vXZ7t3VboAuk7Th1pYeciyjII'
      onSelect={(item) => console.log(item)}
      masonryConfig={[{ columns: 2, imageWidth: 175, gutter: 5 }]}
      gifListHeight='350px'
    />
  )
}

export default GiphsPicker
