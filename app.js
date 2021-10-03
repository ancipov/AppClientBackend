const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
    allowedHeaders: ['Authorization', 'Content-Type'],
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(bodyParser.json({limit: '40mb'}));
app.use(bodyParser.urlencoded({extended: true}));

require('./routes')(app);

app.get("/", function(request, response) {
    response.send("<h2>App Client Backend</h2>");
});

var listener = app.listen(8080, function() {
    console.log("Listening on port " + listener.address().port);
});
