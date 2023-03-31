const nodemailer = require('nodemailer');
const { WEBSITE_EMAIL, WEBSITE_PASSWORD } = require('../../config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: WEBSITE_EMAIL,
    pass: WEBSITE_PASSWORD
  }
});

const messageBody = "<h1>Thank you for joining Military Salute</h1>\
  <h2>We hope you have a great time with us!</h2>";

const isRegistryEmailSent = (userEmail) => {
  const mailOptions = {
    from: WEBSITE_EMAIL,
    to: userEmail,
    subject: 'Thank You for joining us',
    html: messageBody
  };

  try {
    transporter.sendMail(mailOptions);
    return true;
    
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = isRegistryEmailSent;