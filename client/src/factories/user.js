
export class UserFactory {

  constructor($http, $location) {
    this.$http = $http;
    this.$location = $location;
    this.user = {
      id: null
    };
  }

  index ({ teamId }) {
    return this.$http.get(`/api/teams/${teamId}/users`)
    .then(response => response.data);
  }

  createTeam (user) {
    return this.$http.post('/api/team-admins', user)
    .then(response => response.data);
  }

  login (user, team) {
    return this.$http.post(`/api/teams/${team._id}/users/login`, user)
    .then(response => {
      // ADD USER TO FACTORY?
      return response.data;
    });
  }

  logout (query) {
    return this.$http.get(`/api/logout`, { params: query })
    .then(response => (
      // REMOVE USER FROM FACTORY?
      response.data
    ));
  }
}
