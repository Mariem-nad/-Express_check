const express = require('express');
const moment = require('moment');

const app = express();
const PORT = 3000;

// Middleware to check if the current time is within working hours
const checkWorkingHours = (req, res, next) => {
  const currentTime = moment();
  const day = currentTime.isoWeekday();
  const hour = currentTime.hour();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('The web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

app.use(checkWorkingHours);

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});

app.get('/our-services', (req, res) => {
  res.sendFile(__dirname + '/public/our-services.html');
});

app.get('/contact-us', (req, res) => {
  res.sendFile(__dirname + '/public/contact-us.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});