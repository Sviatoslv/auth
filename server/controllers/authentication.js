const jwt = require("jwt-simple");
const User = require("../models/user");
const { secret } = require("../config");

const createToken = (id) => {
  const timeStamp = new Date().getTime();
  const payload = { iat: timeStamp, sub: id };
  const token = jwt.encode(payload, secret);

  return token;
};

exports.signin = function(req, res, next) {
  res.send({token: createToken(req.user)});
}

exports.signup = function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide both email and password" });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: "Email already is in use" });
    }

    const user = new User({
      email,
      password,
    });

    user.save((err) => {
      if (err) {
        return next(err);
      }

      res.send({ token: createToken(user.id) });
    });
  });
};
