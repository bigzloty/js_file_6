const express = require('express');
const app = express();
const port = 5000;

// Middleware to check if the request is during working hours
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('<h1>Sorry, we are only available during working hours (Monday to Friday, 9 AM to 5 PM)</h1>');
  }
};

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files (CSS)
app.use(express.static('public'));

// Apply the working hours middleware to all routes
app.use(checkWorkingHours);

// Routes
app.get('/home.html', (req, res) => {
  res.render('home');
});

app.get('/service.html', (req, res) => {
  res.render('services');
});

app.get('/contact.html', (req, res) => {
  res.render('contact');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});