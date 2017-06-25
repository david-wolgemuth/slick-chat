const request = require('request');
const { HOST } = require('./info');

module.exports = (adminData, teamData) => {

  request.post(HOST + '/api/users', {
    email: adminData.email
  }, (error, response, body) => {
    console.log('ERROR:', error);
    console.log('RESPONSE:', response);
    console.log('BODY:', body);
  });

};
