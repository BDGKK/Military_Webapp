const nodemailer = require('nodemailer');
const { WEBSITE_EMAIL, WEBSITE_PASSWORD } = require('../../config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: WEBSITE_EMAIL,
        pass: WEBSITE_PASSWORD
    }
});

const getMessageBody = (verificationCode) => {
    return `<h2>Here is your verification code for changing your password</h2>
        <p>Verification Code: ${verificationCode}</p>`;
}

const isVerificationEmailSent = (userEmail, verificationCode) => {
    const mailOptions = {
        from: WEBSITE_EMAIL,
        to: userEmail,
        subject: 'Military Salute Verification Code',
        html: getMessageBody(verificationCode)
    };

    try {
        transporter.sendMail(mailOptions);
        return true;
        
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = isVerificationEmailSent;