const bcrypt = require('bcryptjs');
const users = [];

module.exports = {


  
  login: (req, res) => {
    console.log('Logging In User')


    const { username, password } = req.body

 
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username && bcrypt.compare(password, users[i].password)) {

        let team = users[i];
        delete team.password;
        res.status(200).send(team)
      }
    }

  
    res.status(400).send("User not found.");
  },







  register: (req, res) => {

      const { email, firstName, lastName, username, password } = req.body;

        console.log('Registering User');

        const salt = bcrypt.genSaltSync(10);
        const newHash = bcrypt.hashSync(password, salt);

        const newPassword = {
          password: newHash,
          email: email,
          firstName: firstName,
          lastName: lastName,
          username: username
        }
        

        users.push(newPassword);
        res.status(200).send(newPassword);
        
        
      }
    }