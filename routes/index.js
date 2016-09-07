exports.notfound = function(req, res) {
    res.status(404).format({
        html: function() {
            res.render('404');
        },
        json: function() {
            res.send({message: 'Resouce not found'});
        },
        xml: function() {
            res.write('<error>\n');
            res.write(' <message>Resouce not found</message>\n')
            res.end('</error>\n');
        },
        text: function() {
            res.send('Resouce not found\n');
        }
    })
}

exports.error = function(req, res, next) {
    console.error(err);
    var msg;

    switch(err.type) {
        case 'database':
            msg = 'Server Unavaliable';
            res.statusCode = 503;
            break;
        default:
            msg = 'Server Error';
            res.statusCode = 500;
    }
    res.format({
        html: function() {
            res.render('5xx', {msg: msg, status: res.statusCode});
        },
        json: function() {
            res.send({error: msg});
        },
        text: function() {
            res.send(msg +'\n');
        }
    });
}
