const { loginCache } = require("../../utils/tempCache");

const delLogin = (token) => {
    loginCache.delete(token);
    return {
        status: "success",
        message: "Login Cache deleted successfully"
    };
};

const getLogin = (token) => {
    const dataFromLoginCache = loginCache.get(token);
    return {
        status: "success",
        data: dataFromLoginCache
    };
};

const setLogin = (token, data) => {
    loginCache.set(token, data);
    return {
        status: "success",
        message: "Login Cache set successfully",
        data: data
    };
};

const hasLogin = (token) => {
    return loginCache.has(token);
};

const getAllLogin = () => {
    return [...loginCache.entries()]
}

module.exports = {
    setLogin,
    getLogin,
    delLogin,
    hasLogin,
    getAllLogin
}