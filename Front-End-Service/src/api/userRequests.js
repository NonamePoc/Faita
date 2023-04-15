import axios from 'axios'

export const registerUser = async (user) => {
  try {
    return await axios.post('https://localhost:7206/api/users/register', user)
  } catch (error) {
    alert(error.response.data.Errors[0].Detail)
  }
}

export const loginUser = async (user) => {
  try {
    const response = await axios.post(
      'https://localhost:7206/api/users/authenticate',
      user
    )
    return response
  } catch (error) {
    alert(error.response.data.Errors[0].Detail)
  }
}

export const logoutUser = async (token) => {
  try {
    return await axios.get('https://localhost:7206/api/users/logout', {
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
    return await axios.put(
      'https://localhost:7206/api/users/change-email',
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
    return await axios.put(
      'https://localhost:7206/api/users/change-password',
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
    return await axios.put(
      'https://localhost:7206/api/users/change-user-data',
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
