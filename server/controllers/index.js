const express = require('express');
const router = express.Router();

const teams = require('./teams');
const teamAdmins = require('./team-admins');
const users = require('./users');

const middleware = require('./middleware');

router.use(middleware.setSessionUsers);

/* ME */
router.get('/me', users.me);
router.get('/logout', users.logout);
router.get('/logout/:id', users.logout);

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
router.post('/teams/:teamId/users/login', users.login);
// router.get('/teams/:teamId/users/:userId/request-confirmation', users.requestConfirmation);
router.get('/teams/:teamId/users/:userId/confirmation', users.confirmation);
router.put('/teams/:teamId/users/:userId', users.update);

router.use(middleware.handleServerError);

module.exports = router;
