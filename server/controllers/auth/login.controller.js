const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken') 
const {logincache, usercache} = require('../../utils/createCache')
const REGEXFORAUTH = require('../../utils/regexes') 
const {readUser, editUser} = require('../../helpers/dbHelpers/user-related/userHelper')
const asyncHandler = require('../../utils/asyncHandler')

/**
 * Handles user login.
 * Validates user credentials, generates a JWT token on successful authentication,
 * and sets cookies for user session management.
 * 
 * @param {object} req - The express request object containing user credentials in the body.
 * @param {object} res - The express response object used to send responses to the client.
 * @returns {object} - A JSON response with a success message and status code 200 on successful login,
 * or an error message with status code 400 if authentication fails.
 */

exports.login = asyncHandler(async (req, res) => {

        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        if (!REGEXFORAUTH.email.test(email)) {
            return res.status(400).json({ message: 'Invalid email' })
        }

        const existingUser = await readUser({ email })

        if (!existingUser) {
            return res.status(400).json({ message: 'User does not exist' })
        }
        const passwordMatch = await bcryptjs.compare(password, existingUser.password)
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid password' })
        }
        const token = jwt.sign({ _id: existingUser._id, email: existingUser.email, username: existingUser.username }, process.env.JWT_SECRET, { expiresIn: '1d' }) // create a token

        logincache.set(existingUser._id, { value: token, ttl: 24 * 60 * 60 * 1000 })
        await editUser("_id", existingUser._id, { token }) 
        usercache.set(existingUser._id, {value: existingUser, ttl: 24 * 60 * 60 * 1000})
       
        res.cookie('userData', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 }) 

        return res.status(200).json({ message: 'User logged in successfully' })

    }
)

 