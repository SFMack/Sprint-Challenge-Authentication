const router = require('express').Router();

const bcrypt = require('bcryptjs');

const Users = require('../auth/auth-model.js');


// create new user
router.post('/register', async (req, res) => {
  const newUser = req.body;
  const hashedPassword = bcrypt.hashSync(newUser.password, 12);
  newUser.password = hashedPassword;

  try {
    const saved = await Users.addUser(newUser);
    res.status(201).json({ message: `User ${newUser.username} created`})
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }

});

router.post('/login', async (req, res) => {
  let { username, password } = req.body;

  try {
    const foundUser = await Users.findUser({username}).first();
    if(foundUser && bcrypt.compareSync(password, foundUser.password)) {
      // req.session.user = foundUser;
      res.status(200).json({ message: `Welcome, ${foundUser.username}...`})
    } else {
      res.status(401).json({ message: 'Invalid credentials' })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
