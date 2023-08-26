const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User, Cart } = require('../models/models');
const ErrorApi = require('../error/ErrorApi');

const { SECRET_KEY } = process.env;

const generateJwt = (id, email, role) =>
  jwt.sign(
    {
      id,
      email,
      role,
    },
    SECRET_KEY,
    {
      expiresIn: '23h',
    }
  );

class UserController {
  // ==================================================== register

  async register(req, res, next) {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return next(ErrorApi.badRequest('Email & password is required!'));
    }

    const existUser = await User.findOne({ where: { email } });

    if (existUser) {
      return next(
        ErrorApi.badRequest('User with this email is already exist!')
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email, role, password: hashPassword });

    const newCart = await Cart.create({ userId: newUser.id });

    const token = generateJwt(newUser.id, newUser.email, newUser.role);

    return res.status(200).json({ token });
  }

  // ==================================================== login

  async login(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(ErrorApi.badRequest('Email or password is wrong'));
    }

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return next(ErrorApi.badRequest('Email or password is wrong'));
    }

    const token = generateJwt(user.id, user.email, user.role);

    return res.status(200).json({ token });
  }

  // ==================================================== auth

  async authCheck(req, res, next) {
    res.status(200).json({ message: `Auth successful` });
  }
}

module.exports = new UserController();
