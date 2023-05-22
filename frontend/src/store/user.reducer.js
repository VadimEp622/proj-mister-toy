import { userService } from "../services/user.service.js"

export const SET_USER = 'SET_USER'
export const UPDATE_USER_PREFS = 'UPDATE_USER_PREFS'


const initialState = {
    loggedInUser: userService.getLoggedInUser(),
}


export function userReducer(state = initialState, action) {
    console.log('action -> user.reducer.js', action)
    let loggedInUser

    switch (action.type) {
        case SET_USER:
            return { ...state, loggedInUser: action.user }
        case UPDATE_USER_PREFS:
            loggedInUser = { ...state.loggedInUser, prefs:action.prefs }
            return { ...state, loggedInUser }



        default:
            return state
    }
}