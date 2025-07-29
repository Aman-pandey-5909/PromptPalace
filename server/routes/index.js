const express = require('express')
const router = express.Router()

//AUTH ROUTES
const loginRoute = require('./auth/login.route')
const registerRoute = require('./auth/register.route')
const logoutRoute = require('./auth/logout.route')
const verifySeshRoute = require('./auth/verifysesh.route')


//AUTH ROUTES
router.use('/auth', loginRoute)
router.use('/auth', registerRoute)
router.use('/auth', logoutRoute)

// Verify Session route for route restriction in client
router.use('/', verifySeshRoute)



module.exports = router