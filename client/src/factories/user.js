
export class UserFactory {

  constructor($http, $location) {
    this.$http = $http;
    this.$location = $location;
    this.user = {
      id: null
    };
  }

  index () {
    return [
      { name: 'Joe' },
      { name: 'Fred' }
    ];
  }

  createTeam (user, callback) {
    
    this.$http.post('/api/team-admins', user).then((response) => {
      const { userId, teamId } = response.data.data;
      
      this.$http.get(`/api/team-admins/${userId}/request-confirmation`).then((response2) => {
        this.user.id = userId;
        callback(teamId);
        
      })
      .then(() => {
        this.$location.path(`/edit-team/${teamId}`);
      });
    });
  }
}
