var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
        user: 'jairo85cd@gmail.com',
        pass: ''
    }
});

var template = `<strong>hola</strong>
<img src="data:image/png;base64,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" alt="">`;


router.get('/', function(req, res) {
    res.render('index.html');
});

router.post('/send-email', function(req, res) {
    var mailOpts = {
        from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
        to: 'jairo85cd@gmail.com',
        subject: req.body.subject,
        text: req.body.message,
        htnl: template
    }
    smtpTransport.sendMail(mailOpts, function(error, info) {
        if (error) {
            console.log(error);
            res.json({ yo: 'error' });
        } else {
            console.log('Message sent: ' + info);
            res.json({ yo: info.message });
        };
    });
});

module.exports = router;