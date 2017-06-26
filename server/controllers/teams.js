const mongoose = require('mongoose');

const Team = mongoose.model('Team');
const User = mongoose.model('User');
const teams = {};
module.exports = teams;

/**
 * Search for teams
 * query: { url, name (team name), email (find all teams for users) }
 * response: {
 *   message: String,
 *   data: { teams }
 * }
 */
teams.index = (request, response, next) => {
  const { url, name, email } = request.query;
  if (url) {
    return indexSearchByUrl(response, url).catch(next);
  } else if (name) {
    return indexSearchByTeamName(response, name).catch(next);
  } else if (email) {
    return indexSearchByEmail(response, email).catch(next);
  } else {
    return indexSearchLoggedInUsers(response, request.session.users).catch(next);
  }
};

/**
 * Get data for team
 * params: { id (team id) }
 * response: {
 *   message,
 *   data: { team }
 * }
 */
teams.show = (request, response, next) => {
  const { id } = request.params;
  Team.findById(id)
  .then(team => {
    if (!team) {
      return response.status(404).json({ message: `Team With Id "${id}" Not Found` });
    }
    response.json({
      message: 'Data For Team',
      data: { team }
    });
  }).catch(next);
};

/**
 * Update team
 * params: { id (team id) }
 * body: {
 *  name, description
 * }
 * response: {
 *   message,
 *   data: { team }
 * }
 */
teams.update = (request, response, next) => {
  const { id } = request.params;
  const { name, description } = request.params;
  Team.findById(id)  
  .then(team => {
    if (!team) {
      return response.status(404).json({ message: `Team with id: "${id}" not found.`});
    }
    if (!team.hasAdmin(request.session.users)) {
      return response.status(403).json({ message: 'Unauthorized To Edit Team' });
    }
    if (name) {
      team.name = name;
    }
    if (description) {
      team.description = description;
    }
    team.save()
    .then(() => response.json({
      message: 'Successfully Updated Team',
      data: { team }
    }));
  }).catch(next);
};

const indexSearchByEmail = (response, email) => {
  return User.findTeamsBelongingToUserWithEmail(email)
  .then(teams => {
    response.json({ message: `Teams belonging to user "${email}"`, data: { teams }});
  }); 
};

const indexSearchByTeamName = (response, name) => {
  return Team.find({ name })
  .then(teams => {
    response.json({
      message: `Teams with name "${name}"`,
      data: { teams }
    });
  });
};

const indexSearchByUrl = (response, url) => {
  return Team.findByUrl(url)
  .then(team => {
    response.json({
      message: `Teams with url "${url}"`,
      data: { teams: [team] }
    });
  });
};

const indexSearchLoggedInUsers = (response, userIds) => {
  return User.findTeamsBelongingToUserIds(userIds)
  .then(teams => {
    response.json({ message: 'Logged In Teams', data: { teams }});
  });
};