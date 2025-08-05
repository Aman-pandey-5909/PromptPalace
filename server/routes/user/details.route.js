const express = require('express')
const router = express.Router()
const { details } = require('../../controllers/index')

router.get('/details', details)

module.exports = router