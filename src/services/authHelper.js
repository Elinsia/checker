
export const setUID = (uid) => {
    localStorage.setItem('uid', uid)
}

export const getUID = () => {
    return localStorage.getItem('uid');
}

export const removeUID = () => {
    return localStorage.removeItem('uid');
}