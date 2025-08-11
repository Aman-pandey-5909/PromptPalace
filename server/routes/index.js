const express = require('express')
const router = express.Router()

//ROUTE IMPORTS
const loginRoute = require('./auth/login.route')
const registerRoute = require('./auth/register.route')
const logoutRoute = require('./auth/logout.route')
const verifySeshRoute = require('./auth/verifysesh.route')
const postsRoute = require('./feed/posts.route')
const detailsRoute = require('./user/details.route')
const updateDetailRoute = require('./user/updatedetails.route')
const postPromptRoute = require('./posts/postprompt.route')

//AUTH ROUTES
router.use('/auth', loginRoute)
router.use('/auth', registerRoute)
router.use('/auth', logoutRoute)

// Verify Session route for route restriction in client
router.use(verifySeshRoute)

// Other Routes
router.use(postsRoute)
router.use(detailsRoute)
router.use(updateDetailRoute)
router.use(postPromptRoute)


module.exports = router