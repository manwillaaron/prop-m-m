// import React from 'react'


module.exports = {
     async getUsersProperties(req, res){
        let db = req.app.get('db')
        let data = await db.get_properties()
        console.log(data)
        res.status(200).send(data)
    }
}