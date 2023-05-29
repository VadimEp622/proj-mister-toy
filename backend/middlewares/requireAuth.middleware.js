const logger = require('../services/logger.service')
const authService = require('../api/auth/auth.service')

module.exports = {
    requireAuth,
    requireAdmin,
}

async function requireAuth(req, res, next) {
    if (!req?.cookies?.loginToken) {
        return res.status(401).send('Not Authenticated')
    }
    const loggedinUser = authService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Not Authenticated')

    req.loggedinUser = loggedinUser
    next()
}

async function requireAdmin(req, res, next) {
    if (!req.loggedinUser) return res.status(401).send('Not Authenticated')
    console.log('req.loggedinUser', req.loggedinUser)
    if (!req.loggedinUser.isAdmin) {
        logger.warn(`${req.loggedinUser.fullname} attempted to perform admin action`)
        return res.status(403).end('Not Authorized')
    }
    next()
}