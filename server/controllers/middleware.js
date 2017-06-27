
module.exports.handleServerError = (error, request, response, next) => {
  console.log('HANDLING ERROR', error);
  if (response.headersSent) {
    return next(error);
  }
  return response.status(500).json({
    message: 'Internal Server Error',
    data: { error: error.stack }
  });
};

module.exports.setSessionUsers = (request, response, next) => {
  if (!request.session.users) {
    request.session.users = [];
  }
  next();
};
