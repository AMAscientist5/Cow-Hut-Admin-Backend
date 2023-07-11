import { Model } from 'mongoose';

/* eslint-disable no-unused-vars */
export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  phoneNumber: string;
  role: 'seller' | 'buyer';
  password: string;
  // needsPasswordChange?: true | false;
  name: UserName;
  address: string;
  budget: number;
  income: number;
  _id: string;
};
export type ISeller = {
  phoneNumber: string;
  role: 'seller';
  password: string;
  // needsPasswordChange?: true | false;
  name: UserName;
  address: string;
  budget: number;
  income: number;
  _id: string;
};

export type UserModel = {
  isUserExist(
    phoneNumber: string
    // _id?: string
  ): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role' | '_id'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
