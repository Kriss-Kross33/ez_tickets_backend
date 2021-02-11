const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const userController = require('../controllers/user.controller');
const UserRole = require('../utils/userRoles.utils');
const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(userController.getAllUsers)); // localhost:3000/api/v1/users
router.get('/:id', auth(), awaitHandlerFactory(userController.getUserById)); // localhost:3000/api/v1/users/1
router.patch('/:id', auth(UserRole.Admin,UserRole.SuperUser), updateUserSchema, awaitHandlerFactory(userController.updateUser)); // localhost:3000/api/v1/users/id/1
router.delete('/:id', auth(UserRole.Admin,UserRole.SuperUser), awaitHandlerFactory(userController.deleteUser)); // localhost:3000/api/v1/users/id/1

module.exports = router;