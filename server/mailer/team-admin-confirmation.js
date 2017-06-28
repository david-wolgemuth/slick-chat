const jwt = require('jsonwebtoken');

module.exports = (user, team, password) => (`
  <h3>Hello ${user.email}</h3>
  <p>Your account and team have been created.  Your default password is "${password}", we recommend you change it soon.</p>
  <p>Click the link below to edit your team and invite users:</p>
  <p><a href="http://localhost:3000/#!/edit-team/${team._id}">Edit Team / Invite Members</a></p>


  <!-- DELETE BELOW ? 
    <p>
      <a href="http://localhost:3000/api/team-admins/${
        user._id
      }/confirmation?token=${
        jwt.sign({ user: user._id, team: team._id }, process.env.JWT_SECRET, { expiresIn: 60*60 })
      }" target="_blank">Confirmation Link (expires in 60 minutes)</a>
    </p>
  -->
`);
