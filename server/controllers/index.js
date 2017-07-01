const express = require('express');
const router = express.Router();

const teams = require('./teams');
const teamAdmins = require('./team-admins');
const users = require('./users');
const channels = require('./channels');
const messages = require('./messages');

const middleware = require('./middleware');

router.use(middleware.setSessionUsers);

/* ME */
router.get('/me', users.me);
router.get('/logout', users.logout);

/* TEAM ADMINS */
router.post('/team-admins', teamAdmins.create);
router.get('/team-admins/:adminId/request-confirmation', teamAdmins.requestConfirmation);
router.get('/team-admins/:adminId/confirmation', teamAdmins.confirmation);

/* TEAM */
router.get('/teams', teams.index);
router.get('/teams/:id', teams.show);
router.put('/teams/:id', teams.update);

/* TEAM USERS */
router.post('/teams/:teamId/users', users.create);
router.get('/teams/:teamId/users', users.index);
router.post('/teams/:teamId/users/login', users.login);
// router.get('/teams/:teamId/users/:userId/request-confirmation', users.requestConfirmation);
router.get('/teams/:teamId/users/:userId/confirmation', users.confirmation);
router.put('/teams/:teamId/users/:userId', users.update);

/* TEAM CHANNELS */
router.post('/teams/:teamId/channels', channels.create);
router.get('/teams/:teamId/channels', channels.index);
router.get('/teams/:teamId/channels/:channelId', channels.show);

/* MESSAGES */
router.post('/teams/:teamId/channels/:channelId/messages', messages.create);
router.get('/teams/:teamId/channels/:channelId/messages', messages.index);

router.use(middleware.handleServerError);

module.exports = router;
