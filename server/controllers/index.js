module.exports = {
    ...require('./auth/login.controller'),
    ...require('./auth/register.controller'),
    ...require('./auth/logout.controller'),
    ...require('./auth/verifysesh.controller'),
    ...require('./feed/posts.controller'),
    ...require('./user/details.controller'),
    ...require('./user/updatedetails.controller'),
    ...require('./posts/postprompt.controller')
}