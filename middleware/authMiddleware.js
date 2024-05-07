
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader= req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)
  jwt.verify(token, 'secretkey', (err, user) => {
    if (err) {
      console.log(token)
   
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
 
    req.user = user;
    next();
  });
};

module.exports = verifyToken;

