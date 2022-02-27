const db = require("../database/models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  formLogin: (req, res) => {
    res.render("users/userLogin");
  },
  login: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let { email } = req.body;

      db.Users.findOne({
        where: {
          email,
        },
      }).then((userToLogin) => {
        const user = {
          email: email,
        };
        jwt.sign(
          user,
          process.env.SECRET,
          { expiresIn: "1800s" },
          (er, token) => {
            res.json(token);
          }
        );
      });
    } else {
      res.render("users/userLogin", {
        errors: errors.mapped(),
      });
    }
  },
  formRegister: (req, res) => {
    res.render("users/userRegister");
  },
  register: (req, res, next) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let { email, password } = req.body;

      db.Users.create({
        email,
        contraseña: bcrypt.hashSync(password, 10),
      }).then(() => {
        const msg = {
          to: email,
          from: "testing_sendgrid@hotmail.com",
          subject: "Registro exitoso",
          text: "Te has registrado correctamente",
          html: "<strong>Te has registrado correctamente</strong>",
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
        res.redirect("/auth/login");
      });
    } else {
      res.render("users/userRegister", {
        errors: errors.mapped(),
      });
    }
  },
};
