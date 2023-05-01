import { instance } from './axios'

export const getPostsByUser = async (token) => {
  try {
    const response = await instance.get(`post/getPosts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    if (error.response.data.Errors) {
      alert(error.response.data.Errors[0].Detail)
    } else {
      alert(error.message)
    }
  }
}

export const getLikesByPostId = async (postId) => {
  try {
    const response = await instance.post(`post/getLikes`, {
      postId,
    })
    console.log(response)
    return response
  } catch (error) {
    if (error.response.data.Errors) {
      alert(error.response.data.Errors[0].Detail)
    } else {
      alert(error.message)
    }
  }
}

export const createPost = async (
  creator,
  content,
  image,
  video,
  audio,
  token
) => {
  try {
    const response = await instance.post(
      `post/createPost`,
      {
        title: creator,
        content,
        imageUrl: image,
        videoUrl: video,
        audioUrl: audio,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response
  } catch (error) {
    if (error.response.data.Errors) {
      alert(error.response.data.Errors[0].Detail)
    } else {
      alert(error.message)
    }
  }
}
