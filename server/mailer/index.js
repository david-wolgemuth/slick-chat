const nodemailer = require('nodemailer');
const { MAILER_EMAIL, MAILER_PASSWORD } = process.env;
const teamAdminConfirmation = require('./team-admin-confirmation');

const mailer = {};

console.log(MAILER_EMAIL, MAILER_PASSWORD);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: MAILER_EMAIL, pass: MAILER_PASSWORD }
});

mailer.send = ({ to, subject, html }) => {
  return transporter.sendMail({
    from: MAILER_EMAIL, to, subject, html
  });
};

mailer.sendTeamAdminConfirmation = (user, team) => {
  return mailer.send({ 
    subject: 'SlickChat -- Confirm Sign Up',
    to: user.email, html: teamAdminConfirmation(user, team)
  });
};

module.exports = mailer;