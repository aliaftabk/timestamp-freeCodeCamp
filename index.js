// index.js

// Import necessary modules
const express = require('express');
const cors = require('cors');

// Initialize the app
const app = express();

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files (e.g., HTML, CSS, JavaScript)
app.use(express.static('public'));

// Serve the main page
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint for timestamp microservice
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  let dateObj;

  if (!date) {
    // Handle empty parameter: return current time
    dateObj = new Date();
  } else if (/^\d{5,}$/.test(date)) {
    // Handle Unix timestamp input
    dateObj = new Date(parseInt(date));
  } else {
    // Handle date string input
    dateObj = new Date(date);
  }

  // Check if the date is invalid
  if (isNaN(dateObj.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    // Format the response
    res.json({
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString()
    });
  }
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

