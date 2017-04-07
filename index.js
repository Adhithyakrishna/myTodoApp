var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var routes = require('./routes/index');
// var tasks = require('./routes/tasks');

var app = express();

app.set('views', path.join(__dirname, 'views'));/*we want folder views to handle our views*/

var hbs = exphbs.create({
    helpers: {
        addone: function(value, options)
        { return parseInt(value) + 1; }
    },
      defaultLayout:'layout'
});

app.engine('handlebars', hbs.engine);/*default handle bars file name is layout*/
app.set('view engine', 'handlebars');

// BodyParser Middleware [certin modules have middlewares]
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


app.use('/', routes);/*This line does the connection to routes folder and users folder see line 17*/
// app.use('/tasks', tasks); /*Understand the connection, we store them above like a variable carrying all the functions and ask node js to use em */


var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var mongodbUri = "mongodb://taskFordbtest:testdb99*@ds147777.mlab.com:47777/testdbfortasklist";

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;
	conn.on('error', console.error.bind(console, 'connection error:'));
	conn.once('open', function() {
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});