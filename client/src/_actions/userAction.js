import axios from 'axios'
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types'

export function loginUser(dataToSubmit) {
    // Request actually gets the data from the response and saves it
    const responseData = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    // Then, add the request to the reducer so the reducer can create
    // the next state
    return {
        type: LOGIN_USER,
        payload : responseData
    }
}

export function registerUser(dataToSubmit) {
    const responseData = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload : responseData
    }
}

export function userAuth() {
    const responseData = axios.get('/api/users/auth')
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload : responseData
    }
}