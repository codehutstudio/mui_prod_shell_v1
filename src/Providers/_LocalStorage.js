export const saveLocal = (key, data) => window.localStorage.setItem(key, JSON.stringify(data))
export const saveProfileLocal = profile => saveLocal('profile', profile)
export const getLocal = key => JSON.parse(window.localStorage.getItem(key))
export const isAdmin = () => {
    const {isAdmin} = getLocal('profile')
    return isAdmin
}
export const getProfilePicture = () => getLocal('profile')?.photoURL
export const deleteLocalProfile = () => window.localStorage.removeItem('profile')