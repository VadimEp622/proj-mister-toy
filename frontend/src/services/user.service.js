import { asyncStorageService } from './async-storage.service.js'
import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGED_IN = 'loggedInUser'

_createUsers()

export const userService = {
    logIn,
    logOut,
    signUp,
    getLoggedInUser,
    getUserById,
    // addActivity,
    getEmptyCredentials,
    editUser,
}


function logIn({ username, password }) {
    return asyncStorageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedInUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signUp({ username, password, fullname }) {
    const user = { username, password, fullname, balance: 10000 }
    return asyncStorageService.post(STORAGE_KEY, user)
        .then(_setLoggedInUser)
}

function logOut() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGED_IN)
    return Promise.resolve()
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_IN))
}

function getUserById(userId) {
    return asyncStorageService.get(STORAGE_KEY, userId)
}

function editUser(newUser) {
    return userService.getUserById(getLoggedInUser()._id)
        .then(user => {
            if (!user._id) return Promise.reject('Not logged in')
            // user.fullname = newUser.fullname
            user = { ...user, ...newUser }
            return asyncStorageService.put(STORAGE_KEY, user)
                .then((user) => {
                    _setLoggedInUser(user)
                    return user
                })
                .catch(err => console.log('Could not save user -> user.service.js', err))
            // .catch(err => {throw err})
        })
        .catch(err => console.log('Could not get user -> user.service.js', err))

}


function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}

//-------------------------------PRIVATE FUNCTIONS-------------------------------//

function _setLoggedInUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, balance: user.balance, prefs: user.prefs }
    sessionStorage.setItem(STORAGE_KEY_LOGGED_IN, JSON.stringify(userToSave))
    return userToSave
}

function _createUsers() {
    const users = storageService.loadFromStorage(STORAGE_KEY) || []
    if (!users || users.length < 1) {
        users.push(
            _createUser('puki', 'puki1', 'Puki Ja'),
            _createUser('muki', 'muki1', 'Muki pa'),
        )

        storageService.saveToStorage(STORAGE_KEY, users)
    }
}

function _createUser(username, password, fullname, balance = 10000) {
    return {
        _id: utilService.makeId(),
        username,
        password,
        fullname,
        balance,
        prefs: {
            color: 'black',
            bgColor: 'white'
        }
    }
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})