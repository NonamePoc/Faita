export const setAvatar = (avatar) => {
  return avatar === null || !avatar ? process.env.REACT_APP_AVATAR_URL : avatar
}
