const bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports = {
  async register(req, res) {
    const db = req.app.get("db");
    let { first_name, last_name, phone_number, email, password, passCheck } = req.body;
    if(password !== passCheck) return res.status(400).send('passwords do not match')
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
      if (!sessionsUser[0]) return res.status(400).send('username not found');
    const match = await bcrypt.compare(password, sessionsUser[0].password);
    if (match) {
      req.session.user = {
        email: email,
        id: sessionsUser[0].id,
        loggedIn: true
      };
    }else{
      res.status(401).send('invalid password')
    }
    res.status(200).send(req.session.user);
  },

  async logout(req, res) {
    await req.session.destroy();
    res.sendStatus(200)
  },

  async getUser(req, res){
    res.status(200).send(req.session.user)
  }
};
