import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { cowController } from './cow.controller';
import { CowValidation } from './cow.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import authForSpecificSeller from '../../middlewares/authForSpecificSeller';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  cowController.getAllCows
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  cowController.getSingleCow
);

router.post(
  '/',
  validateRequest(CowValidation.createCowZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  cowController.createCow
);

router.patch(
  '/:id',
  validateRequest(CowValidation.updateCowZodSchema),
  authForSpecificSeller(ENUM_USER_ROLE.SELLER),
  cowController.updateCow
);

router.delete(
  '/:id',
  authForSpecificSeller(ENUM_USER_ROLE.SELLER),
  cowController.deleteCow
);

export const CowRoutes = router;
