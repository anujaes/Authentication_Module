const express   = require('express');
const router    = express.Router();
const user      = require('../controller/userController');

router.post('/auth',user.authorise)
router.post('/login',user.userLogin);
router.post('/register',user.createUser);

module.exports = router;