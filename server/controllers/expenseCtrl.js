let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

module.exports = {
  async getUserExpenses(req, res) {
    const db = req.app.get("db");
    const { id } = req.session.user;
    let expenses = await db.get_user_expenses(id);
    res.status(200).send(expenses);
  },

  async getMonthPropExpenses(req, res) {
    const db = req.app.get("db");
    const { id } = req.session.user;
    let { month, year, pId } = req.params;

    let d = new Date();
    let defaultMonth = month;
    let defaultYear = year;
    if (month === "todays") {
      defaultMonth = monthNames[d.getMonth()].slice(0, 3);
    }
    if (year === "date") {
      defaultYear = d.getFullYear();
    }

    const propertysUser = await db.get_propertys_user_id(+pId);
    if (propertysUser[0].id !== id)
      return res.status(404).send("this is not your property");

    let propertyExpenses = await db.get_property_expenses(+pId);
    propertyExpenses.forEach(ex => {
     
    });

    const filtered = propertyExpenses.filter(ex => {
        let newDate = ex.date
        .toString()
        .split("T")[0]
        .split(" ");
      ex.date = `${newDate[1]}-${newDate[3]}`
      return ex.date === `${defaultMonth}-${defaultYear}`
      }
    );
    res.status(200).send(filtered);
  }
};
