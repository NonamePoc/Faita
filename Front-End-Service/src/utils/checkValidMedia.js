const checkValidMedia = (url, callback) => {
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
export default checkValidMedia
