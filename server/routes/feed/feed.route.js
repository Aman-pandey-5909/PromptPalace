const express = require('express')
const router = express.Router()
const { feed } = require('../../controllers/index')

router.get('/feed', feed)

module.exports = router