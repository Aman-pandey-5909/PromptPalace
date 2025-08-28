const express = require('express')
const router = express.Router()

//ROUTE IMPORTS
const loginRoute = require('./auth/login.route')
const registerRoute = require('./auth/register.route')
const logoutRoute = require('./auth/logout.route')
const verifySeshRoute = require('./auth/verifysesh.route')
const feedRoute = require('./feed/feed.route')
const detailsRoute = require('./user/details.route')
const updateDetailRoute = require('./user/updatedetails.route')
const postPromptRoute = require('./posts/postprompt.route')
const userPost = require('./user/userposts.route')

//AUTH ROUTES
router.use('/auth', loginRoute)
router.use('/auth', registerRoute)
router.use('/auth', logoutRoute) // temporarily removed /auth

// Verify Session route for route restriction in client
router.use(verifySeshRoute)

// Other Routes
router.use(feedRoute)
router.use(detailsRoute)
router.use(updateDetailRoute)
router.use(postPromptRoute)
router.use(userPost)


module.exports = router