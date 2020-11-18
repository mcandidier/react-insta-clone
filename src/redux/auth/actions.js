export const userLogin = (token) => {
    return {
        type: 'LOGIN',
        token
    }
}

export const userLogout = () => {
    return {
        type: 'LOGOUT',
    }
}