module.exports = {
    ...require('./auth/login.controller'),
    ...require('./auth/register.controller'),
    ...require('./auth/logout.controller'),
    ...require('./auth/verifysesh.controller'),
    ...require('./feed/feed.controller'),
    ...require('./user/details.controller'),
    ...require('./user/updatedetails.controller'),
    ...require('./posts/postprompt.controller'),
    ...require('./user/userposts.controller') 
}