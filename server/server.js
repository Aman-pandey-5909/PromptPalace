const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const cp = require('cookie-parser')
const connectDb = require('./services/connectDb')
const morgan = require('morgan')
// const tokenValidate = require('./middlewares/tokenValidation')
const tokenvalidation = require('./middlewares/tokenvalidate')
const loadPostInCache = require('./middlewares/loadPostInCache')
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
    tokenvalidation(req, res, next) 
    // loadPostInCache(req, res, next)
} 

app.use('/api', authRoutes, require('./routes/index'))
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Main error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    connectDb(process.env.MONGO_URI)
    console.log(`Server running on port ${PORT}`) 
})  