module.exports = {
    userInit(req, res , next){
        if(!req.session.user){
            req.session.user = {
                email: '',
                id: '',
                loggedIn: false
            }
        }
        next()
    }
}