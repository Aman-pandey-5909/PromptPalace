const express = require('express')
const router = express.Router()
const { searchuser } = require('../../controllers/index')

router.get('/searchuser', searchuser)

module.exports = router