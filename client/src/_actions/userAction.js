import axios from 'axios'
import {
    LOGIN_USER
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