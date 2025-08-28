const express = require('express')
const router = express.Router()
const { userposts } = require('../../controllers/index')

router.get('/userposts', userposts)

module.exports = router