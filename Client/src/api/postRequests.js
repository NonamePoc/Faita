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

export const getPostsById = async (postId, token) => {
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

export const addComment = async (postId, content, token) => {
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

export const addLike = async (postId, token) => {
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

export const repost = async (postId, token) => {
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

export const removeLike = async (likeId, token) => {
  try {
    const response = await instance.delete(`post/removeLike=${likeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
