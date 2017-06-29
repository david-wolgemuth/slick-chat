export class ChannelFactory
{
  constructor ($http)
  {
    this.$http = $http;
  }
  index ({ team })
  {
    return this.$http.get(`/api/teams/${team._id}/channels`, {
      params: { query: 'public' } 
    })
    .then(response => response.data);
  }
  create ({ team, name, isPrivate })
  {
    const type = (isPrivate) ? 'PRIVATE' : 'PUBLIC';
    return this.$http.post(`/api/teams/${team._id}/channels`, { name, type });
  }
}