const nodemailer = require('nodemailer');
const teamAdminConfirmation = require('./team-admin-confirmation');
const userInvitation = require('./user-invitation');

const { MAILER_EMAIL, MAILER_PASSWORD } = process.env;

const mailer = {};

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

mailer.sendUserInvitation = (user, team, tempPassword) => {
  console.log("TEMP PASSWORD", tempPassword);
  return mailer.send({
    subject: 'SlickChat -- You\'ve been added to a Team!',
    to: user.email, html: userInvitation(user, team, tempPassword)
  });
};

module.exports = mailer;