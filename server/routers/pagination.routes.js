const { Router } = require('express')
const pagination = require('../controllers/pagination.controllers')
const router = Router()
router.get('/pagination/:id/:page', pagination)
module.exports = router
