const mongoose = require('mongoose');

const Team = mongoose.model('Team');
const teams = {};
module.exports = teams;

teams.index =  (request, response) => {
  const { url, name } = request.query;
  if (url) {
    return Team.findByUrl(url)
    .then(team => {
      if (!team) {
        return response.status(404).json({ message: `Team With URL "${url}" Not Found` });
      }
      response.json({
        message: 'Data For Team',
        data: { team }
      });
    });
  }
  if (name) {
    return Team.find({ name })
    .then(teams => {
      response.json({
        message: `Teams with name "${name}"`,
        data: { teams }
      });
    });
  }
  response.status(400).json({ message: 'Please search by `url` or by `name`' });
};

teams.show = (request, response) => {
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
  });
};

teams.update = (request, response) => {
  const { id } = request.params;
  Team.findById(id)  
  .then(team => {
    if (!team) {
      return response.status(404).json({ message: `Team with id: "${id}" not found.`});
    }
    if (!team.hasAdmin(request.session.users)) {
      return response.status(403).json({ message: 'Unauthorized To Edit Team' });
    }
    for (let key of request.body) {
      team[key] = request.body[key];
    }
    team.save()
    .then(() => response.json({
      message: 'Successfully Updated Team',
      data: { team }
    }));
  });
};
