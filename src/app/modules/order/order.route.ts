import express from 'express';
import { orderController } from './order.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import authSpecificBuyerAndSeller from '../../middlewares/authSpecificBuyerAndSeller';

const router = express.Router();

router.get(
  '/:id',
  authSpecificBuyerAndSeller(
    ENUM_USER_ROLE.SELLER,
    ENUM_USER_ROLE.BUYER,
    ENUM_USER_ROLE.ADMIN
  ),
  orderController.getSingleOrder
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), orderController.getAllOrders);
router.post('/', auth(ENUM_USER_ROLE.BUYER), orderController.createOrder);

export const OrderRoutes = router;
