  const router = require('express').Router();
  const Redirect = require('../middlewares/redirect');
  var mysql      = require('mysql');
  var rows;
  router.get('/', (req, res) => {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'waiyan123',
    database : 'auth-demo'
  });
  connection.connect();
  connection.query('SELECT * from transactions', function(err, rows, fields) {
    res.render('./profile/index.handlebars',{ Nutshell : rows});
    if (!err)
    {
      console.log('The solution is: ', rows);
    }
    
    else
      console.log('Error while performing Query.');
  });
  
    connection.end();
  });
  

  router.get('/',Redirect.ifNotLoggedIn(), (req, res) => {
    res.render('profile', { user: req.user });
  });

  module.exports = router;
