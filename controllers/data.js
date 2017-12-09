const router = require('express').Router();
var express    = require("express");
var mysql      = require('mysql');
var rows;
router.get('/', (req, res) => {
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'ken',
  password : '414268977ken',
  database : 'podcast_database'
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


module.exports = router;