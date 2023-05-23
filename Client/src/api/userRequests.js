import { instance } from './axios'

export const registerUser = async (userData) => {
  try {
    const response = await instance.post('users/register', userData)
    return response
  } catch (error) {
    throw new Error(error.response.data.Errors[0].Detail)
  }
}

export const loginUser = async (user) => {
  try {
    const response = await instance.post('users/authenticate', user)
    return response
  } catch (error) {
    throw new Error(error.response.data.Errors[0].Detail)
  }
}

export const getUser = async (userName, token) => {
  try {
    return await instance.get(`users/getUser=${userName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    throw new Error(error.response.data.Errors[0].Detail)
  }
}

export const changeEmail = async (newEmail, token) => {
  try {
    return await instance.put(
      'users/change-email',
      {
        newEmail: newEmail,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch (error) {
    if (error.response.data.Errors) {
      throw new Error(error.response.data.Errors[0].Detail)
    } else {
      throw new Error(error.message)
    }
  }
}

export const changePassword = async (password, newPassword, email, token) => {
  try {
    return await instance.put(
      'users/change-password',
      {
        password: password,
        email: email,
        newPassword: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch (error) {
    throw new Error(error.response.data.Errors[0].Detail)
  }
}

export const changeUserData = async (firstName, lastName, token) => {
  try {
    return await instance.put(
      'users/change-user-data',
      {
        firstName: firstName,
        lastName: lastName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch (error) {
    throw new Error(error.response.data.Errors[0].Detail)
  }
}

export const searchUser = async (userName) => {
  try {
    return await instance.post('users/SearchUser', {
      userName: userName,
    })
  } catch (error) {
    throw new Error(error.response.data.Errors[0].Detail)
  }
}

export const changeImage = async (avatar, token) => {
  try {
    return await instance.post(
      'users/add-avatar',
      {
        avatar,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch (error) {
    throw new Error(error.response.data.Errors[0].Detail)
  }
}
