const express = require('express')
const router = express.Router()

const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')

const { getToys,
    getToyById, addToy, updateToy, removeToy, addToyMsg, removeToyMsg
} = require('./toy.controller')

// If we want a specific middleware (i.e. requireAuth) 
// to be activated on all end points of this router:
// router.use(requireAuth)

router.get('/', log, getToys)
router.get('/:id', getToyById)
router.post('/', log, requireAuth, requireAdmin, addToy)
router.put('/:id', requireAuth, requireAdmin, updateToy)
router.delete('/:id', requireAuth, requireAdmin, removeToy)

router.post('/:id/msg', requireAuth, addToyMsg)
router.delete('/:id/msg/:msgId', requireAuth, requireAdmin, removeToyMsg)

module.exports = router