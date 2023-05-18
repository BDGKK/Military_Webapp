const nodemailer = require('nodemailer');
const { WEBSITE_EMAIL, WEBSITE_PASSWORD } = require('../../config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: WEBSITE_EMAIL,
        pass: WEBSITE_PASSWORD
    }
});

const getMessageBody = (name, email, subject, comment) => {
    return `
    <h3>Name: ${name}</h3>
    <h3>Email: ${email}</h3>
    <h3>Subject: ${subject}</h3>
    <p style="font-size:1.2em;"><b>Feedback:</b> ${comment}</p>`;
}

const isFeedbackEmailSent = (username, useremail, subject, comment) => {
    const mailOptions = {
        from: WEBSITE_EMAIL,
        to: WEBSITE_EMAIL,
        subject: `Feedback From: ${username}`,
        html: getMessageBody(username, useremail, subject, comment)
    };

    try {
        transporter.sendMail(mailOptions);
        return true;

    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = isFeedbackEmailSent;