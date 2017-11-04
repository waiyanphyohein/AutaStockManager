const router = require('express').Router();
const models = require('../models');
const Users = models.Users;

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/', (req, res) => {
  console.log(req.body);
  Users.create({
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    password: req.body.password,
  }).then((user) => {
    req.login(user, () =>
      res.redirect('/profile')
    );
  }).catch(() => {
    res.render('signup');
  });
});

module.exports = router;

