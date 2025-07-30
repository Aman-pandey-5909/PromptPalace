const bcryptjs = require('bcryptjs')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const { setUser, getAllUser } = require('../../helpers/cacheHelpers/userCache')
const { setLogin, getAllLogin } = require('../../helpers/cacheHelpers/loginCache')
const REGEXFORAUTH = require('../../utils/regexes')
const getDataFromRequest = require('../../utils/getDataFromRequest')
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

exports.login = async (req, res) => {
    try {
        const data = getDataFromRequest(req)
        const { email, password } = data

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        if (!REGEXFORAUTH.email.test(email)) {
            return res.status(400).json({ message: 'Invalid email' })
        }

        // read the user from database ( currently a json file ), reads and returns a buffer, if utf-8 is mentioned which is the encoding type so that it is read as text not buffer
        const user = fs.readFileSync(path.join(__dirname, '../../tempJSONDATA/User.json'), 'utf-8')
        const users = JSON.parse(user) // parse the text to json

        const existingUser = users.find(user => user.email === email) // Find the userData of the user trying to login by email
        if (!existingUser) {
            return res.status(400).json({ message: 'User does not exist' })
        }

        const passwordMatch = await bcryptjs.compare(password, existingUser.password)
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid password' })
        }

        const token = jwt.sign({ id: existingUser.id, email: existingUser.email, username: existingUser.username }, process.env.JWT_SECRET, { expiresIn: '1d' }) // create a token
        setLogin(token, Date.now() + 24 * 60 * 60 * 1000) // cache the token with its value as expiration time
        setUser(token, { id: existingUser.id, email: existingUser.email, username: existingUser.username })
        fs.writeFileSync(path.join(__dirname, '../../tempJSONDATA/User.json'), JSON.stringify([...users.map(user => user.id === existingUser.id ? { ...user, token } : user)]), 'utf-8') // update the user with the new token, adds token key and assigns the token value

        res.cookie('userData', token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 }) // sets a userData cookie on the response whose maxAge is 24hrs, used as main cookie
        res.cookie('tempUserData', token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 10 * 60 * 1000 }) // sets a tempUserData cookie on the response whose maxAge is 10min, used as backup cookie

        console.log("LoginTokens: ", getAllLogin());
        console.log("UserTokens: ", getAllUser());

        return res.status(200).json({ message: 'User logged in successfully' })

    } catch (error) {
        console.log(error)
    }
}
