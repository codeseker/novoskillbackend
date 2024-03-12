const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (req, res) => {
  let transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });

  const { body, subject, from } = req.body;

  let mailDetails = {
    from,
    to: process.env.MAIL,
    subject,
    text: body,
  };

  transport.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Email was not sent", success: false });
    } else {
      receiveMail(from);
      return res
        .status(200)
        .json({ message: "Email sent successfully", success: true });
    }
  });
};

const receiveMail = async (receiver) => {
  let transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });

  let mailDetails = {
    from: process.env.MAIL,
    to: receiver,
    subject: "Thank you for Contacting Us",
    text: "Thank you for contacting NovoSkill. Our Team will reach you soon.",
  };

  transport.sendMail(mailDetails, function (err, data) {
    if (err) {
      return;
    } else {
      return;
    }
  });
};

module.exports = {
  sendMail,
};
