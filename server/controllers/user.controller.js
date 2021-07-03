const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports.registerUser = (req, res) => {
    console.log("🚀 ~ file: user.controller.js ~ line 5 ~ req.body", req.body)
    User.create(req.body)
    .then(newUser => res.send({user: newUser}))
    .catch(err => res.send({errors: err}));
};

module.exports.loginUser = (req, res) => {
    //Primero buscar usuario por email

    User.findOne({ email: req.body.email })
    .then(user => {
      if (user === null) {
        res.json({ msg: "Usuario no existe" });
      } else {
          //Bcrypt compara la contraseña que viene en el body del request con la de la base de datos
        bcrypt
          .compare(req.body.password, user.password)
          .then(passwordIsValid => {
          console.log("🚀 ~ file: user.controller.js ~ line 23 ~ passwordIsValid", passwordIsValid)
            if (passwordIsValid) {
                //Si la contraseña es válida genera el token
              const newJWT = jwt.sign({
                    _id: user._id
              })
              //envia el token a traves de la cookie del response
              res
                .cookie("usertoken", newJWT, process.env.SECRET_KEY, {
                  httpOnly: true
                })
                .json({ msg: "Se ha logueado correctamente!" });
            } else {
              res.json({ msg: "Ups! Algo ha fallado en el login" });
            }
          })
          .catch(err => res.json({ msg: "Ups! Algo ha fallado en el login" }));
          }
    })
    .catch(err => res.json(err));
}

module.exports.logout = (req, res) => {
  User.findOneAndUpdate({ email: req.body.email }, {isOnline: false}, {new: true})
  .then(response => {
    res.clearCookie('usertoken');
    res.sendStatus(200).json(response);
  })
  .catch(err => res.json(err))

}