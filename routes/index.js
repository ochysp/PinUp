const express = require('express');
const router = express.Router();
const controller = require('../controller/controller.js')

router.get('/', controller.showIndex);
/*router.get('/myAccount', controller.showMyAccount);
router.get('/registration', controller.showRegistration);
router.get('/login', controller.showLogin);*/

module.exports = router;
