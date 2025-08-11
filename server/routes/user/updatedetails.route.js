const express = require('express')
const router = express.Router()
const { updatedetails } = require('../../controllers/index')

router.post('/updatedetails', updatedetails)

module.exports = router