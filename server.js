var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    sessions = require('./routes/sessions'),
    speakers = require('./routes/speakers'),
    app = express();

app.use(bodyParser());          // pull information from html in POST
app.use(methodOverride());      // simulate DELETE and PUT

app.use(express.static('static'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/sessions', sessions.findAll);
app.get('/sessions/:id', sessions.findById);
app.get('/speakers', speakers.findAll);
app.get('/speakers/:id', speakers.findById);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
