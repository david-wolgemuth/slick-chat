const express = require('express');
const router = express.Router();

const teams = require('./teams');
const users = require('./users');
const teamAdmins = require('./team-admins');

router.use('/teams', teams);
router.use('/team-admins', teamAdmins);
router.use('/users', users);

module.exports = router;
