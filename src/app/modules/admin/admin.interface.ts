/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IAdmin = {
  // toObject(): unknown;
  phoneNumber: string;
  role: 'admin';
  password: string;
  // needsPasswordChange?: true | false;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  _id: string;
};

export type AdminModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IAdmin, 'phoneNumber' | 'password' | 'role' | '_id'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;
