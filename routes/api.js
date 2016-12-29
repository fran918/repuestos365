var express = require('express'),
    router = express.Router(),
    nodemailer = require('nodemailer'),
    _http = require('http'),
    request = require("request");

var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
        user: '@gmail.com',
        pass: ''
    }
});

var template = `<strong>template</strong><br><img src="https://www.enterprise.com/content/dam/global-vehicle-images/cars/FORD_FOCU_2012-1.png" alt="">`;

router.get('/', function(req, res) {
    res.render('index.html');
});

/*router.get('/placa', function(req, res) {
    return _http.get({
        host: 'http://www.informaciondetallada.com',
        path: '/placas/rest/placa/'
    }, function(res) {
        var body = '';
        res.on('data', function(d) {
            body += d;
        });
        res.on('end', function() {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            callback(body);
        });
    })
});*/

router.post('/send-email-contactus', function(req, res) {
    console.log('"' + req.body.name + '"' + ' <' + req.body.email + '>,')
    var mailOpts = {
        from: '<' + req.body.email + '>', //grab form data
        to: 'jairo85cd@gmail@gmail.com',
        subject: req.body.subject + ' - ' + req.body.email,
        text: req.body.message + " Info de contacto:" + req.body.email + " - " + req.body.phone
    }
    smtpTransport.sendMail(mailOpts, function(error, info) {
        if (error) {
            console.log(error);
            res.json({ yo: 'error' });
        } else {
            console.log('Message sent: ' + info);
            res.json({ yoo: info.message });
        };
    });
});


router.post('/auth-signup', function(req, res) {
    //res.json(req.body);
    var options = {
        method: 'POST',
        url: 'https://rep365.auth0.com/dbconnections/signup',
        headers: { 'content-type': 'application/json' },
        body: {
            client_id: 'daZBFFiuav04WCkiJ872hgcR4JZzF',
            connection: 'rep365DB',
            email: req.body.email,
            password: req.body.password,
            user_metadata: { name: req.body.name }
        },
        json: true
    };
    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        res.json(body);
    });
});

module.exports = router;