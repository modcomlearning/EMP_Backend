const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];

  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');

    // Get token from array
    const bearerToken = bearer[1];

    // Verify Token
    jwt.verify(bearerToken, "long-is-always-better", (err, decoded) => {
      if (err) {
        res.status(403).json({ message: 'Unauthorized' });
      } else {
        // Token is valid, set the user in the request object
        req.user = decoded.user; // Assuming you've stored user information in JWT payload
        next();
      }
    });
  } else {
    // Forbidden
    res.status(403).json({ message: 'Unauthorized' });
  }
}

module.exports = verifyToken;
