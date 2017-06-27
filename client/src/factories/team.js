
export class TeamFactory {

  constructor($http, $location) {
    this.$http = $http;
    this.$location = $location;
    this.teams = [];
  }

  index (query) {
    console.log(query);
    return this.$http.get('/api/teams', { params: query })
    .then(response => { console.log(response); return response; })
    .then(response => response.data);
  }

  addTeamId (teamId) {
    this.teams.push({id: teamId});
  }

  inviteUser(user, teamId) {
    this.$http.post(`/api/teams/${teamId}/users`, user).then((response) => {
       this.$location.path(`/edit-user/${response.data.data.userId}`);
    });

  }

  
}
