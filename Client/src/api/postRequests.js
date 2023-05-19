import { instance } from './axios'

export const getPostsByUser = async (userName) => {
  try {
    const response = await instance.get(
      `blog/blogsByUser?getPostsByUser=${userName}`
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

export const getRepostsByUser = async (userName, token) => {
  try {
    const response = await instance.get(
      `blog/repostsByUser?userName=${userName}`,
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

export const getRandomPosts = async (count, token) => {
  try {
    const response = await instance.get(`blog/randomBlog?count=${count}`, {
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

export const getPostById = async (postId, token) => {
  try {
    const response = await instance.get(`blog/blog?getPost=${postId}`, {
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

export const getLikesByPostId = async (postId, token) => {
  try {
    const response = await instance.get(`blog/like?getLikes=${postId}`, {
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

export const getCommentsByPostId = async (postId, token) => {
  try {
    const response = await instance.get(`blog/comment?postId=${postId}`, {
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

export const getRepostsByPostId = async (postId, token) => {
  try {
    const response = await instance.get(`blog/reposts?postId=${postId}`, {
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

export const postPost = async (
  creator,
  content,
  image,
  video,
  audio,
  token
) => {
  try {
    const response = await instance.post(
      `blog/blog`,
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

export const postLike = async (postId, token) => {
  try {
    const response = await instance.post(
      `blog/like`,
      {
        postId,
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

export const postComment = async (postId, content, token) => {
  try {
    const response = await instance.post(
      `blog/comment`,
      {
        postId,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response
  } catch (error) {
    alert(error.message)
  }
}

export const postRepost = async (postId, token) => {
  try {
    const response = await instance.post(
      `blog/repost`,
      {
        postId,
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

export const putPost = async (
  postId,
  title,
  content,
  imageUrl,
  videoUrl,
  audioUrl,
  token
) => {
  try {
    const response = await instance.put(
      `blog/editBlog`,
      {
        postId,
        title,
        content,
        imageUrl,
        videoUrl,
        audioUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response
  } catch (error) {
    alert(error.message)
  }
}

export const putComment = async (commentId, content, token) => {
  try {
    const response = await instance.put(
      `blog/comment`,
      {
        commentId,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response
  } catch (error) {
    alert(error.message)
  }
}

export const deletePost = async (postId, token) => {
  try {
    const response = await instance.delete(`blog/blog?deletePost=${postId}`, {
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

export const deleteComment = async (commentId, token) => {
  try {
    const response = await instance.delete(
      `blog/comment?removeComment=${commentId}`,
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
