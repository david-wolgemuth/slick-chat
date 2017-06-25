const jwt = require('jsonwebtoken');

console.log("SECRET:", process.env.JWT_SECRET);

module.exports = (user, team) => (`
  <h3>Hello ${user.firstName} ${user.lastName}</h3>
  <p>Please click the link below to confirm your email address and create your team:</p>
  <p>
    <a href="http://localhost:3000/api/team-admins/${
      user._id
    }/confirmation?token=${
      jwt.sign({ user: user._id, team: team._id }, process.env.JWT_SECRET, { expiresIn: 60*60 })
    }" target="_blank">Confirmation Link (expires in 60 minutes)</a>
  </p>
`);
