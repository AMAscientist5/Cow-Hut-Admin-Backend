import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';
// import Cow from '../modules/cow/cow.model';
import Order from '../modules/order/order.model';
import Cow from '../modules/cow/cow.model';

const authSpecificBuyerAndSeller =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
      const orderId = req.params.id;
      const order = await Order.findOne({ _id: orderId });

      if (verifiedUser.role === 'buyer') {
        if (verifiedUser._id != order?.buyer.toString()) {
          throw new ApiError(httpStatus.UNAUTHORIZED, 'Forbidden test');
        }
      }

      const cow = await Cow.findOne({ _id: order?.cow?.toString() });

      if (verifiedUser.role === 'seller') {
        if (verifiedUser._id != cow?.seller.toString()) {
          throw new ApiError(httpStatus.UNAUTHORIZED, 'Forbidden test');
        }
      }

      if (!order) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Order not found!');
      }

      req.user = verifiedUser; // role , userid

      //   role diye guard korar jnno
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default authSpecificBuyerAndSeller;
