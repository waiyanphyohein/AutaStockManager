const router = require('express').Router();
var express    = require("express");
var mysql      = require('mysql');
var rows;
router.get('/', (req, res) => {
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'Your UserName',
  
  password : 'Your Password',
  database : 'ctp'
});
connection.connect();
connection.query('SELECT * from user', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});
connection.query('SELECT * from USERS', function(err, rows, fields) {
	 for(var i = 0;i < rows.length;i++)
    {
/*    	console.log("here");
    	console.log(rows[0].firstName);*/
	res.render('./Dataview/index.handlebars',{ Nutshell : rows[1]});

    }
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

  connection.end();
});


module.exports = router;