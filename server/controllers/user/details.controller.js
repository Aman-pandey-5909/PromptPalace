const {getUser} = require('../../helpers/cacheHelpers/userCache2')
const {usercache} = require('../../utils/createCache')
const asyncHandler = require('../../utils/asyncHandler')

exports.details = asyncHandler(async (req, res) => {
        const usercookietoken = req.cookies.userData
        const user = usercache.get(req.user._id)
        return res.status(200).json({message: 'User details fetched', data: user})
} )