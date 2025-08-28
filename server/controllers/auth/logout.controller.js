const asyncHandler = require('../../utils/asyncHandler')
const { logincache } = require('../../utils/createCache')
const jwt = require('jsonwebtoken')

exports.logout = asyncHandler(async (req, res) => {
    const getCookie = req.cookies.userData // cookie unavailbale when in /auth
    console.log(getCookie);
    const getIdFromCookie = jwt.verify(getCookie, process.env.JWT_SECRET)
    console.log(getIdFromCookie);
    logincache.delete(getIdFromCookie._id)
    // logincache.delete(req.user._id)
    return res.status(200).json({message: 'Logout successful'})
}
)