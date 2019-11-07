module.exports = {
     async getUsersProperties(req, res){
         console.log(req.session.user);
         let {id}= req.session.user
        let db = req.app.get('db')
        let data = await db.get_properties(id)
        res.status(200).send(data)
    }
}