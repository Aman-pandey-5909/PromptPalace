const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const cp = require('cookie-parser')
const morgan = require('morgan')
const tokenValidate = require('./middlewares/tokenValidation')
const app = express()
 
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
))
app.use(morgan('dev'))
app.use(express.json())
app.use(cp())

const authRoutes = (req, res, next) => {
    if(req.path.startsWith('/auth')) {
        return next()
    }
    tokenValidate(req, res, next) 
} 

app.use('/api', authRoutes, require('./routes/index'))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})