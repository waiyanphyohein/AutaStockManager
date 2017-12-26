var express = require('express');
const expressSession = require('express-session');
const passport = require('./middlewares/authentication');
var app = express();
app.set('port', process.env.PORT || 3000);

//Encrypt URL
app.disable('x-powered-by');

//Load Views
const handlebars = require('express-handlebars');
app.engine('handlebars',handlebars({
  layoutsDir: './views/layouts',
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/`);

//ACCESS BODY DATA
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Enable sessions & passport
app.use(expressSession(({secret: 'SomeName',resave: false,saveUninitialized: true})));
app.use(passport.initialize());
app.use(passport.session());


var formidable = require('formidable');



app.use(express.static(__dirname + '/public'));

//Load Controllers
const controllers = require('./controllers');
app.use(controllers);

app.get('/controllers',function(req,res){
  var string = encodeURIComponent('something went wrong.');
  res.render(index);
})
const models = require('./models');

app.get('/login',function(req,res)
{
  res.render('login/index');
});


app.get('/', function(req, res){
  res.render('home');
});

app.use(function(req, res, next){
  console.log("Looking for URL : " + req.url);
  next();
});

app.get('/junk', function(req, res, next){
  console.log('Tried to access /junk');
  throw new Error('/junk doesn\'t exist');
});

app.use(function(err, req, res, next){
  console.log('Error : ' + err.message);
  next();
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/contact', function(req, res){
  res.render('contact', { csrf: 'CSRF token here'});
});

app.get('/thankyou', function(req, res){
  res.render('thankyou');
});

app.post('/process', function(req,res){
  console.log('Form : ' + req.query.form);
  console.log('CSRF token : ' + req.body._csrf);
  console.log('Email : ' + req.body.email);
  console.log('Question : ' + req.body.ques);
  res.redirect(303, '/thankyou');
});

// app.get('/file-upload', function(req, res){
//   var now = new Date();
//   res.render('file-upload',{
//     year: now.getFullYear(),
//     month: now.getMonth() });
//   });

app.post('/file-upload/:year/:month',
  function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, file){
      if(err)
        return res.redirect(303, '/error');
      console.log('Received File');

      console.log(file);
      res.redirect( 303, '/thankyou');
  });
});

app.use(function(req, res){
  res.type('text/html');
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


models.sequelize.sync({force: false})
.then(() => {
  app.listen(3000);
});


