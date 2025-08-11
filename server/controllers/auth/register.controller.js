const bcryptjs = require('bcryptjs')
// const fs = require('fs')
// const path = require('path')
const REGEXFORAUTH = require('../../utils/regexes')
// const getDataFromRequest = require('../../utils/getDataFromRequest')
const checkUser = require('../../helpers/dbHelpers/checkUser')
const createUser = require('../../helpers/dbHelpers/createUser')
exports.register = async (req, res) => {
    try {

        // const data = getDataFromRequest(req, { withId: true })
        // const { username, email, password, confirmPassword, id } = data

        const { username, email, password, confirmPassword } = req.body   

        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        if (!REGEXFORAUTH.email.test(email)) {
            return res.status(400).json({ message: 'Invalid email' })
        }

        if (!REGEXFORAUTH.password.test(password)) {
            return res.status(400).json({ message: 'Invalid password' })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' })
        }

        const existingUser = await checkUser({ email })

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        const newUserData = {
            username,
            email,
            password: hashedPassword
        }

        const saveUser = await createUser(newUserData)
        if (!saveUser.success) {
            return res.status(400).json({ message: 'User registration failed', error: saveUser.error })
        }
        return res.status(200).json({ message: 'User registered successfully', data: saveUser })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', error: error.message })
    }
}

