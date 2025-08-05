const express = require('express')
const router = express.Router()
const { posts } = require('../../controllers/index')

router.get('/posts', posts)

module.exports = router