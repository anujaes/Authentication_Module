const express   = require('express');
const router    = express.Router();
const user      = require('../controller/userController');

router.post('/login',user.userLogin);
router.post('/register',user.createUser);

module.exports = router;