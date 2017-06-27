
export class UserFactory {

  constructor($http) {
    this.$http = $http;
    this.user = {
      id: null
    };
  }

  setUser (id) {
    this.user.id = id;
  }

  index () {
    return [
      { name: 'Joe' },
      { name: 'Fred' }
    ];
  }

  createTeam (user) {
    console.log(this);
    this.$http.post('/api/team-admins', user).then((response) => {


      console.log(response);
      console.log(user);

      this.user.id = response.data.userId;
      // setUser(response.data.userId);
    });
  }
}
