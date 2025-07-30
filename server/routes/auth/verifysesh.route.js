const express = require('express')
const router = express.Router()
const { verifysesh } = require('../../controllers/index')

router.post('/verifysesh', verifysesh)

module.exports = router