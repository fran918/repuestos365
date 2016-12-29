//  OpenShift sample Node application
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

var mainRouter = require('./routes/index'),
    apiRouter = require('./routes/api');

var express = require('express'),
    bodyParser = require('body-parser'),
    _path = require('path'),
    _fs = require('fs'),
    eps = require('ejs'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    proxy = require('express-http-proxy'),
    cors = require('cors'),
    app = express();

Object.assign = require('object-assign')

/*getIP(function(err, ip) {
    if (err) {
        // every service in the list has failed 
        throw err;
    }
    console.log('ExTERNAL_IP: ' + ip);
});*/




//app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'));
app.use(bodyParser.json());
/*var originsWhitelist = [
    'http://localhost:4200', //this is my front-end url for development
    'http://www.informaciondetallada.com/placas/rest/placa/'
];
var corsOptions = {
        origin: function(origin, callback) {
            var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
            callback(null, isWhitelisted);
        },
        credentials: true
    }
//here is the magic
app.use(cors(corsOptions));*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', mainRouter);
app.use('/api', apiRouter);
app.use('/placa', proxy('http://www.informaciondetallada.com/busquedas/rest/placa/'));

// Config URL MongoDB
if (mongoURL == null && process.env.MLAB_SERVICE_NAME) {
    /*var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
        mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
        mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
        mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
        mongoPassword = process.env[mongoServiceName + '_PASSWORD'],
        mongoUser = process.env[mongoServiceName + '_USER'];*/
    var mongoServiceName = process.env.MLAB_SERVICE_NAME.toUpperCase(),
        mongoHost = process.env[mongoServiceName + '_HOST'],
        mongoPort = process.env[mongoServiceName + '_PORT'],
        mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
        mongoPassword = process.env[mongoServiceName + '_PASSWORD'],
        mongoUser = process.env[mongoServiceName + '_USER'];

    if (mongoHost && mongoPort && mongoDatabase) {
        mongoURLLabel = mongoURL = 'mongodb://';
        if (mongoUser && mongoPassword) {
            mongoURL += mongoUser + ':' + mongoPassword + '@';
        }
        // Provide UI label that excludes user id and pw
        mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
        mongoURL += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
        //console.log('2-mongoURL: ' + mongoURL);
    }
}
var db = null,
    dbDetails = new Object();

var initDb = function(callback) {
    if (mongoURL == null) return;

    var mongodb = require('mongodb');
    if (mongodb == null) return;

    /*mongodb.connect(mongoURL, function(err, conn) {
        if (err) {
            callback(err);
            return;
        }

        db = conn;
        dbDetails.databaseName = db.databaseName;
        dbDetails.url = mongoURLLabel;
        dbDetails.type = 'MongoDB';

        console.log('Connected to MongoDB at: %s', mongoURL);
    });*/
    mongoose.connect(mongoURL, function(err) {
        if (err) {
            return err;
        } else {
            console.log('Successfully connected to ' + mongoURL);
        }
    });
};

//app.set('views', __dirname + '/views');
app.set('views', __dirname + '/client/dist');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(_path.join(__dirname, 'client')));

/*app.get('/', function(req, res) {
    // try to initialize the db on every request if it's not already
    // initialized.
    if (!db) {
        initDb(function(err) {});
    }
    if (db) {
        var col = db.collection('counts');
        // Create a document with request IP and current time of request
        col.insert({ ip: req.ip, date: Date.now() });
        col.count(function(err, count) {
            res.render('index.html', { pageCountMessage: count, dbInfo: dbDetails });
        });
    } else {
        res.render('index.html', { pageCountMessage: null });
    }
});*/

app.get('/pagecount', function(req, res) {
    // try to initialize the db on every request if it's not already
    // initialized.
    if (!db) {
        initDb(function(err) {});
    }
    if (db) {
        db.collection('counts').count(function(err, count) {
            res.send('{ pageCount: ' + count + '}');
        });
    } else {
        res.send('{ pageCount: -1 }');
    }
});

//HEADERS
app.use(function(req, res, next){
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

// error handling
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something bad happened!');
});

initDb(function(err) {
    console.log('Error connecting to Mongo. Message:\n' + err);
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;