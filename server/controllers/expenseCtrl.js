module.exports={
    async getUserExpenses(req, res){
        const db = req.app.get('db')
        const {id} = req.session.user
        let expenses = await db.get_user_expenses(id)
        res.status(200).send(expenses) 
    }
}