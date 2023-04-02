import axios from 'axios'

export const registerUser = async (user) => {
  try {
    return await axios.post('https://localhost:7206/api/users/register', user)
  } catch (error) {
    console.error(error)
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
    console.error(error)
  }
}

export const logoutUser = async (token) => {
  try {
    return await axios.post('https://localhost:7206/api/users/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error('Logout Failed', error)
  }
}

export const changeEmail = async (email, newEmail, token) => {
  try {
    return await axios.put(
      'https://localhost:7206/api/users/change-email',
      {
        Email: email,
        newEmail: newEmail,
        token: token,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch (error) {
    console.error('Changing Email Failed', error)
  }
}

export const changePassword = async (password, email, token) => {
  try {
    return await axios.put(
      'https://localhost:7206/api/users/change-password',
      {
        password: password,
        email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch (error) {
    console.error('Changing Password Failed', error)
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
    console.error('Changing User Data Failed', error)
  }
}
