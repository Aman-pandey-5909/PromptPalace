const express = require('express')
const router = express.Router()
const { postprompt } = require('../../controllers/index')

router.post('/postprompt', postprompt)

module.exports = router