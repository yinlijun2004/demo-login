var User = require('../user');

module.exports = function(req, res, next) {
    if(req.removetUser) {
        console.log('get remote user:', JSON.stringify(req.removetUser));
        res.locals.user = req.removetUser;
    }
    var uid = req.session.uid;
    if(!uid) return next();
    User.get(uid, function(err, user) {
        if(err) return next(err);
        req.user = res.locals.user = user;
        next();
    })
}

