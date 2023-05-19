import axios from 'axios'

export const checkValidImage = (url, callback) => {
  const image = new Image()
  image.onload = function () {
    if (this.width > 0) {
      callback(true)
    }
  }
  image.onerror = function () {
    callback(false)
  }
  image.src = url
}

export const checkValidAudio = (url, callback) => {
  const audio = new Audio()
  audio.onloadedmetadata = function () {
    if (this.duration > 0) {
      callback(true)
    }
  }
  audio.onerror = function () {
    callback(false)
  }
  audio.src = url
}

export const checkValidVideo = (url, callback) => {
  const videoId = extractYouTubeVideoId(url)
  if (videoId) {
    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY // Replace with your YouTube Data API key
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`
    axios
      .get(apiUrl)
      .then((response) => {
        const isValid = response.data.items.length > 0
        callback(isValid)
      })
      .catch((error) => {
        console.error('Error validating YouTube video:', error)
        callback(false)
      })
  } else {
    callback(false)
  }
}

function extractYouTubeVideoId(url) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|(?:embed|v)\/))([\w-]{11})/
  )
  return match ? match[1] : null
}

export const checkValidMedia = (media, callback) => {
  console.log(media)
  media.imageUrl !== '' && checkValidImage(media.imageUrl, callback)
  media.audioUrl !== '' && checkValidAudio(media.audioUrl, callback)
  if (media.videoUrl !== '' || media.videoUrl)
    checkValidVideo(media.videoUrl, callback)
}
