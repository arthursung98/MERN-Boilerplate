// What is combineReducers? There can be many reducers, for user, subscribe, comment, or number.
// The combineReducer puts everything together.
import { combineReducers } from 'redux'
// import user from './user-reducer'

const rootReducer = combineReducers({
    // user
})

export default rootReducer