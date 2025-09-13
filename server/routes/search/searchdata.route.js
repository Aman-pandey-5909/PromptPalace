const express = require('express')
const router = express.Router()
const { searchdata } = require('../../controllers/index')

router.get('/searchdata', searchdata)

module.exports = router