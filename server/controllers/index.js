module.exports = {
    ...require('./auth/login.controller'),
    ...require('./auth/register.controller'),
    ...require('./auth/logout.controller'),
    ...require('./auth/verifysesh.controller')
}