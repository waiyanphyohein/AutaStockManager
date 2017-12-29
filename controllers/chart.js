const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('chart')
});

module.exports = router;
