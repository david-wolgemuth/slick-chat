
export class TeamFactory {

  constructor($http, $location) {
    this.$http = $http;
    this.$location = $location;
    this.teams = [];
  }

  index () {

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
