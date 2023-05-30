import { userService } from "../services/user.service.js"

export const SET_USER = 'SET_USER'
export const UPDATE_USER_PREFS = 'UPDATE_USER_PREFS'


const initialState = {
    loggedinUser: userService.getLoggedinUser(),
}


export function userReducer(state = initialState, action) {
    // console.log('action -> user.reducer.js', action)
    let loggedinUser

    switch (action.type) {
        case SET_USER:
            return { ...state, loggedinUser: action.user }
        case UPDATE_USER_PREFS:
            loggedinUser = { ...state.loggedinUser, prefs:action.prefs }
            return { ...state, loggedinUser }



        default:
            return state
    }
}