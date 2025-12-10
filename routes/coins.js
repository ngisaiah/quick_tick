const express = require('express')
const router = express.Router()
const coinController = require('../controllers/coins') 

router.get('/coin', coinController.getCoins)

module.exports = router