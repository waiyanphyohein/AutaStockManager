const router = require('express').Router();
const Redirect = require('../middlewares/redirect');
var mysql      = require('mysql');
var rows;
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'ken',
  password : '414268977ken',
  database : 'ctp'
});

router.get('/',Redirect.ifNotLoggedIn(), (req, res) => {

connection.query('SELECT * from USERS', function(err, rows, fields) {
	
   	console.log(Object.values(rows));

    	//console.log(rows[0].firstName);
	res.render('./profile',{ Nutshell : rows});

  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

  connection.end();
});

module.exports = router;
