const express = require('express');
const bodyParser = require('body-parser');
var http = require('http');
const https = require('https');
const fs = require('fs');
const utils = require('./utils');
const cors = require('cors');

// const options = {
//     key: fs.readFileSync('ssl/key.key'),
//     cert: fs.readFileSync('ssl/cert.pem')
// };

const app = express();

var corsOptions = {
    allowedHeaders: ['Authorization', 'Content-Type'],
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(bodyParser.json({limit: '40mb'}));
app.use(bodyParser.urlencoded({extended: true}));

require('./routes')(app);

// if (utils.prod) {
//     http.createServer(app).listen(80);
//     https.createServer(options, app).listen(443);
// } else {
    app.listen(process.env.PORT || 80, '0.0.0.0', () => {
        console.log(`Express server started`);
    });
//}
