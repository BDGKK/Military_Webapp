const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'militarysaluteweb2023@gmail.com',
    pass: 'mptzmkfgdaqupgnm'
  }
});

const mailOptions = {
  from: 'Gayantha Kavindu <militarysaluteweb2023@gmail.com>',
  to: '<email>@gmail.com',
  subject: 'Thank You for joining us',
  html: "<h1>Thank you for joining Military Salute</h1><h2>We hope you have a great time with us!</h2>"
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Email sent: " + info.response);
  }
});