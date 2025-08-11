const { setUser } = require('../../helpers/cacheHelpers/userCache')
const editUser = require('../../helpers/dbHelpers/editUser')
const jwt = require('jsonwebtoken')
const checkUser = require('../../helpers/dbHelpers/checkUser')

exports.updatedetails = async (req, res) => {
    try {
        const mobileno = req.body.mobileno
        const token = req.cookies.userData
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const mobileExists = await checkUser({ mobile: mobileno })
        if (mobileExists) {
            return res.status(400).json({ message: 'Mobile number already exists' })
        }
        // console.log("mobileno: ", mobileno);
        // console.log("token: ", token);
        // console.log("decodedToken: ", decodedToken);

        // problem faced: problem in token validation, cuz we matching data from cache and data from cookie together, so gotta update it but we keep mobile here in cache userdata, so it becomes unequal hence throws error and logs out user in frontend or do something about it

        const user = await editUser(decodedToken._id, { mobile: mobileno })
        // const updatedData = {
        //     id: user.data.id,
        //     email: user.data.email,
        //     username: user.data.username,
        //     mobile: user.data.mobile 
        // } 
        // console.log(updatedData);
        setUser(token, user.data)
        return res.status(200).json({ message: 'User details updated' })
    } catch (error) {
        console.error(error);  
        return res.status(500).json({ message: 'Internal server error' })
    }
}