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
    return await axios.post(
      'https://localhost:7206/api/users/authenticate',
      user
    )
  } catch (error) {
    console.log(JSON.stringify(user))
    console.error(error)
  }
}

export const getUserId = async () => {
  try {
    return await axios.get(`https://localhost:7206/api/get-user-id`)
  } catch (error) {
    console.error(error)
  }
}
