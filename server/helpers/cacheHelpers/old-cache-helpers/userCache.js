const { userDataCache } = require('../../../utils/tempCache')

const getUser = (token) => {
    const user = userDataCache.get(token)
    // console.log(user);
    return {
        status: "success",
        data: user
    } 
} 

const delUser = (token) => {
    userDataCache.delete(token)
    return {
        status: "success",
        message: "User Cache deleted successfully"
    }
}

const setUser = (token, data) => {
    userDataCache.set(token, data)
    return {
        status: "success",
        message: "User Cache set successfully",
        data: data
    }
}

const getAllUser = () => {
    return [...userDataCache.entries()]
}

module.exports = {
    getUser,
    delUser,
    setUser,
    getAllUser
}