// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;

  const response = (date) => res.json({ unix: date.getTime(), utc: date.toUTCString() });
  
  // If no date parameter, return current time
  if (!dateParam) {
    return response(new Date());
  }

  // Milliseconds parameter (e.g. "1451001600000", "-123456789")
  if (/^-?\d+$/.test(dateParam)) {
    const ms = Number(dateParam);
    const date = new Date(ms);
    return response(date);
  }

  // Otherwise parse as date string
  const date = new Date(dateParam);
  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  } else {
    return response(date);
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});