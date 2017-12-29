const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('table')
});

module.exports = router;
