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

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
