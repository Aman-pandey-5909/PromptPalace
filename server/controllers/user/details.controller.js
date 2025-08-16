const {getUser} = require('../../helpers/cacheHelpers/userCache2')

exports.details = async (req, res) => {
    try {
        const usercookietoken = req.cookies.userData
        // console.log(usercookietoken);
        const user = getUser(usercookietoken)
        // console.log(user);
        return res.status(200).json({message: 'User details fetched', data: user})
    } catch (error) {
        console.error(error);  
        return res.status(500).json({message: 'Internal server error'})
    }
} 