const bcryptjs = require('bcryptjs')
const REGEXFORAUTH = require('../../utils/regexes')
const { checkUser, createUser } = require('../../helpers/dbHelpers/user-related/userHelper')
const asyncHandler = require('../../utils/asyncHandler')

exports.register = asyncHandler(async (req, res) => {

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
    if (!saveUser) {
        return res.status(400).json({ message: 'User registration failed' })
    }
    return res.status(200).json({ message: 'User registered successfully', data: saveUser })

}
)
