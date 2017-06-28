const jwt = require('jsonwebtoken');

module.exports = (user, team, tempPassword) => (`
  <h3>Hello ${user.email}</h3>
  <p>You have been invited to join a Slick Team "${team.name}"</p>
  <p>Your temporary password is "${tempPassword}", we suggest you reset it soon.</p>
  <p>
    <a href="http://localhost:3000/api/teams/${team._id}/users/${user._id}/confirmation?token=${
      jwt.sign({ user: user._id, team: team._id }, process.env.JWT_SECRET, { expiresIn: 60*60*24*7 })
    }" target="_blank">Confirmation Link (expires in 7 days)</a>
  </p>
`);
