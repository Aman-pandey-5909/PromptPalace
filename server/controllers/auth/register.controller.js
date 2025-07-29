const bcryptjs = require('bcryptjs')
const fs = require('fs')
const path = require('path')
const REGEXFORAUTH = require('../../utils/regexes')
const getDataFromRequest = require('../../utils/getDataFromRequest')

exports.register = async (req, res) => {
    try {

        const data = getDataFromRequest(req, {withId: true, withTimestamp: true})
        const { username, email, password, confirmPassword, id } = data

        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({message: 'All fields are required'})
        }

        if (!REGEXFORAUTH.email.test(email)) {
            return res.status(400).json({message: 'Invalid email'})
        }

        if (!REGEXFORAUTH.password.test(password)) {
            return res.status(400).json({message: 'Invalid password'})
        }

        if (password !== confirmPassword) {
            return res.status(400).json({message: 'Passwords do not match'})
        }

        const user = fs.readFileSync(path.join(__dirname, '../../tempJSONDATA/User.json'), 'utf-8')
        const users = JSON.parse(user)
        
        const existingUser = users.find(user => user.email === email)
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'})
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        const newUserData = {
            id,
            username,
            email,
            password: hashedPassword
        }


        const saveUser = fs.writeFileSync(path.join(__dirname, '../../tempJSONDATA/User.json'), JSON.stringify([...users, {...newUserData} ]), 'utf-8')


        return res.status(200).json({message: 'User registered successfully', data: saveUser})

    } catch (error) {
        console.log(error)
    }
}

