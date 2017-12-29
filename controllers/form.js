const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('form')
});

module.exports = router;
