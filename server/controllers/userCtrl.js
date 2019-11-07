const bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports = {
  async register(req, res) {
    const db = req.app.get("db");
    let { first_name, last_name, phone_number, email, password } = req.body;
    let sessionsUser = await db.get_user_by_email(email);
    if (sessionsUser.email === email) return res.sendStatus(404);
     const salt = bcrypt.genSaltSync(saltRounds)
     const hash = bcrypt.hashSync(password, salt)
     sessionsUser = await db.add_user([
       first_name,
       last_name,
       phone_number,
       email,
       hash
     ]);
    res.sendStatus(200);
  },

  async login(req, res) {      
      const db = req.app.get("db");
      let { email, password } = req.body;
      let sessionsUser = await db.get_user_by_email(email);
      if (!sessionsUser[0]) return res.sendStatus(404);
    const match = await bcrypt.compare(password, sessionsUser[0].password);
    if (match) {
      req.session.user = {
        email: email,
        id: sessionsUser[0].id,
        loggedIn: true
      };
    }
    res.status(200).send(req.session.user);
  },

  async logout(req, res) {
    await req.session.destroy();
    res.sendStatus(200)
  }
};
