module.exports = {
  async getUserExpenses(req, res) {
    const db = req.app.get("db");
    const { id } = req.session.user;
    let expenses = await db.get_user_expenses(id);
    res.status(200).send(expenses);
  },

  async getMonthPropExpenses(req, res) {
    const db = req.app.get("db");
    const { pId } = req.params;
    const { month, year } = req.body;
    const { id } = req.session.user;
    const now = now()
    const propertysUser = await db.get_propertys_user_id(pId);
    if (propertysUser[0] !== id){
      return res.status(404).send("this is not your property")
    }
    const propertyExpenses = await db.get_property_expenses(pId)
     console.log(now)
     console.log(propertyExpenses[0].date);
     
     

  }
};
