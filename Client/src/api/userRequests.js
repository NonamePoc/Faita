import { instance } from './axios'

export const registerUser = async (user, callback) => {
  try {
    const response = await instance.post('users/register', user).then(callback)
    return response
  } catch (error) {
    alert(error.response.data.Errors[0].Detail)
  }
}

export const loginUser = async (user) => {
  try {
    const response = await instance.post('users/authenticate', user)
    return response
  } catch (error) {
    alert(error.response.data.Errors[0].Detail)
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
    alert(error.response.data.Errors[0].Detail)
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
      alert(error.response.data.Errors[0].Detail)
    } else {
      alert(error.message)
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
    alert(error.response.data.Errors[0].Detail)
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
    alert(error.response.data.Errors[0].Detail)
  }
}

export const searchUser = async (userName) => {
  try {
    return await instance.post('users/SearchUser', {
      userName: userName,
    })
  } catch (error) {
    alert(error.response.data.Errors[0].Detail)
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
    alert(error.response.data.Errors[0].Detail)
  }
}
