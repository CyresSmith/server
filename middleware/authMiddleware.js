const jwt = require('jsonwebtoken');

const ErrorApi = require('../error/ErrorApi');

const { SECRET_KEY } = process.env;

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') next();

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Not authorized' });

    const userData = jwt.verify(token, SECRET_KEY);

    req.user = userData;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};
