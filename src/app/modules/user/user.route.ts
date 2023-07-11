import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), userController.getSingleUser);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), userController.getAllUsers);

router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  userController.createUser
);

router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  userController.updateUser
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), userController.deleteUser);

export const UserRoutes = router;
