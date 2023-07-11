import { IUser } from '../user/user.interface';
import { ICow } from './../cow/cow.interface';
// import { Types } from 'mongoose';

// export type IOrder = {
//   // cow: Types.ObjectId;
//   // cow: Types.ObjectId | null;
//   cow?: Types.ObjectId | null;
//   buyer?: Types.ObjectId;
// };
export type IOrder = {
  cow: ICow;
  buyer: IUser;
};
