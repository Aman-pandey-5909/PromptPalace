function setCookie (res, name, value, options) {
    res.cookie(name, value, options);
}

module.exports = setCookie