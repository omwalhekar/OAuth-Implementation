const nodemailer = require("nodemailer");
const passport = require("passport");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

const sendEmail = email => {
  async function main() {
    await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        //credentials for nodemailer to send mail
        user: keys.authEmail,
        pass: keys.authPass,
      },
    });
    const msg = {
      from: "omwalhekar159@gmail.com", // sender address
      to: `${email}`, // list of receivers
      subject: "New Account created", // Subject line
      html: "<b>Thanks for signing up</b><p>Regards,<br/>Omkar Walhekar</p>", // html body
    };
    await transporter.sendMail(msg, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
    });
  }
  main().catch(console.error);
};

module.exports = app => {
  // GOOGLE AUTHENTICATE
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.post("/test", (req, res) => {
    res.send("Request to route received");
  });

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    async (req, res) => {
      const user = res.req.user;
      const existingUser = await User.findOne({ googleId: user.googleId });
      if (!existingUser) {
        //creates account for users that dont have one
        new User(user).save().then(user => {
          //send mail to the user
          sendEmail(user.email);
        });
      }

      res.redirect("/landing");
    }
  );

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
