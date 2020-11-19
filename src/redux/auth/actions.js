import API from '../../api';

export const LOGIN = (token) => {
    return {
        type: 'LOGIN',
        token
    }
}

export const LOGOUT = () => {
    return {
        type: 'LOGOUT',
    }
}

export const handleLogin = (data) => {
    return (dispatch) => {
        return API.post('accounts/login/', data);
    }
}