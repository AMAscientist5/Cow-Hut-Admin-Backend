import express from 'express';
import { profileController } from './profile.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.patch(
  '/',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  profileController.updateUserProfile
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  profileController.getUserProfile
);

export const ProfileRoutes = router;
