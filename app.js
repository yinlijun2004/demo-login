var express = require('express');
var register = require('./routes/register');
var messages = require('./lib/messages');
var login = require('./routes/login');
var user = require('./lib/middleware/user');
var entries = require('./routes/entries');
var page = require('./lib/middleware/page');
var Entry = require('./lib/entry');
var api = require('./routes/api');
var app = express();
var methodOverride = require('method-override');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var router = express.Router();
var basicAuth = require('basic-auth')
var User = require('./lib/user');
var routes = require('./routes');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(methodOverride());
app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({extended: true, limit: "1mb"}));
app.use(cookieParser('x-server Johnny'));
app.use(session({
  secret: 'x-server Johnny',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(__dirname + '/public'));
app.use('/api', function(req, res, next) {
  var credentials = basicAuth(req) || {};
  User.authenticate(credentials.name, credentials.pass, next);
});
app.use(user);

app.use(messages);
router.get('/register', register.form);
router.post('/register', register.submit);
router.get('/login', login.form);
router.post('/login', login.submit);
router.get('/logout', login.logout);
router.get('/post', entries.form);
router.post('/post', entries.submit);
router.get('/:page?', page(Entry.count, 5), entries.list);
router.get('/api/user/:id', api.user);
router.post('/api/entry', entries.submit);
router.get('/api/entries/:page?', page(Entry.count), api.entries);
app.use('/', router);
app.use(routes.notfound);
app.use(routes.error);


app.listen(3000, function(err){
  if(err) throw err;
  console.log('listening 3000');
});
