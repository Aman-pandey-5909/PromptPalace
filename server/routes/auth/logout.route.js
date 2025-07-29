const express = require('express')
const router = express.Router()
const { logout } = require('../../controllers/index')

router.post('/register', logout)

module.exports = router