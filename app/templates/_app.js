var express = require('express');
var path = require('path');
<% if (templateOption === 'dust' || templateOption === 'ejs') { %>
var cons = require('consolidate');
<% } %>
var <%= templateOption %> = require('<%= templateOptionList[templateOption] %>');

var app = express();

var localport = '3333';
var localhost = 'http://localhost';

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
<% if (templateOption === 'dust' || templateOption === 'ejs') { %>
app.engine('<%= templateOption %>', cons.<%= templateOption %>);
app.set('view engine', '<%= templateOption %>');
<% } else if (templateOption === 'hbs') { %>
app.engine('hbs', handlebars({ extname: 'hbs', defaultLayout: 'layout.hbs' }));
app.set('view engine', 'hbs');
<% } %>

app.host = app.set('host', process.env.HOST || localhost);
app.port = app.set('port', process.env.PORT || localport);

app.get('/', function(req, res) {
	res.render('index', { data: 'test data' });
});

var server = app.listen(app.get('port'), function() {
  app.address = app.get('host') + ':' + server.address().port;
  console.log('Listening at ' + app.address);
});
