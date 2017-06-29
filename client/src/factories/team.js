
export class TeamFactory {

  constructor($http, $location) {
    this.$http = $http;
    this.$location = $location;
    this.teams = [];
  }

  index (query) {
    return this.$http.get('/api/teams', { params: query })
    .then(response => response.data);
  }

  addTeamId (teamId) {
    this.teams.push({id: teamId});
  }

  inviteUser(user, teamId) {
    return this.$http.post(`/api/teams/${teamId}/users`, user)
    .then(response => response.data);
  }

  find (teamId) {
    return this.$http.get(`/api/teams/${teamId}?populate=true`)
    .then(response => response.data);
  }
  
}
