const logger = require('../../services/logger.service')
const authService = require('./auth.service')

module.exports = {
    login,
    signup,
    logout
}

async function login(req, res) {
    const { username, password } = req.body
    console.log('username, password in BACKEND', username, password)

    try {
        const user = await authService.login(username, password)
        console.log('user --> auth.controller.js', user)
        const loginToken = authService.getLoginToken(user)

        logger.info('User login: ', user)

        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        logger.error('Failed to Login ' + err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

async function signup(req, res) {
    try {
        const { username, password, fullname } = req.body
        console.log('username, password,fullname in BACKEND', username, password, fullname)
        // Never log passwords!!!
        // logger.debug(fullname + ', ' + username + ', ' + password)

        const account = await authService.signup(username, password, fullname)
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))

        const user = await authService.login(username, password)
        const loginToken = authService.getLoginToken(user)

        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        logger.error('Failed to signup ' + err)
        res.status(500).send({ err: 'Failed to signup' })
    }
}

async function logout(req, res) {
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
        logger.info('User logout')
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}