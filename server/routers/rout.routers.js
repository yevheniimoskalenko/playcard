const { Router } = require('express')
const exchange = require('../controllers/exchange.controllers')
const payCoin = require('../controllers/pay.controllers')

const router = Router()
router.post('/exchange/', exchange)
router.post('/pay/', payCoin)

module.exports = router
