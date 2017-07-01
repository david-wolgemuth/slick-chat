export class MessageFactory
{
  constructor ($http)
  {
    this.$http = $http;
  }
  index ({ team, channel })
  {
    return this.$http.get(`/api/teams/${team._id}/channels/${channel._id}/messages`)
    .then(response => response.data);
  }
  create ({ team, channel, content })
  {
    return this.$http.post(`/api/teams/${team._id}/channels/${channel._id}/messages`, { content })
    .then(response => response.data);
  }
}