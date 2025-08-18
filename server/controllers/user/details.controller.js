const {getUser} = require('../../helpers/cacheHelpers/userCache2')
const {usercache} = require('../../utils/createCache')
 
exports.details = async (req, res) => {
    try {
        const usercookietoken = req.cookies.userData
        // console.log(usercookietoken);

        // const user = getUser(usercookietoken)
        // console.log(`req.user._id in details Controller before get: `, req.user._id);
        const user = usercache.get(req.user._id)
        // console.log(`usercache in deatils Controller: ${JSON.stringify(usercache.getAll(), null, 2)}`);

        // console.log(user);
        return res.status(200).json({message: 'User details fetched', data: user})
    } catch (error) {
        console.error(error);  
        return res.status(500).json({message: 'Internal server error'})
    }
} 