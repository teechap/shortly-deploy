var app = require('./server-config.js');

//var mongoport = process.env.MONGO_PORT || 1234
var port = process.env.PORT || 4568;



app.listen(port);

console.log('Server now listening on port ' + port);
