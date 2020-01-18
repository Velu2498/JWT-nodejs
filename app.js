const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

//
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

//after token verification
app.post('/api/posts', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } 
    else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

//creating token when login
app.post('/api/login', (req, res) => {
  // Mock user
  const user = { //pay load
    id: 1, 
    username: 'brad',
    email: 'brad@gmail.com'
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '50s' }, (err, token) => {
    res.json({
      token
    });
  });

});

// FORMAT OF TOKEN
// Authorization: <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const mytoken = req.headers['authorization'];
  // Check if token is undefined
  if(typeof mytoken !== 'undefined') {
    req.token = mytoken;  // Set the token
    next(); // Next middleware
  } 
  else {
    // Forbidden
    res.sendStatus(403);
  }

}

app.listen(5000, () => console.log('Server started on port 5000'));