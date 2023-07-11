import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';
import config from '../../../config';

const getUserProfile = async (
  payload: string
): Promise<Partial<IUser | null>> => {
  const userInfo = await User.findOne({ _id: payload });

  if (!userInfo) {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'failed to get Users info'
    );
  }

  const { name, phoneNumber, address } = userInfo;
  const profileData = {
    name,
    phoneNumber: phoneNumber,
    address: address,
  };

  return profileData;
};

const updateUserProfile = async (
  id: string,
  payload: Partial<IUser>
): Promise<Partial<IUser | null>> => {
  if (payload.password !== undefined) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(config.bcrypt_salt_rounds)
    );
  }

  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const { name, phoneNumber, address } = result;
  const profileData = {
    name,
    phoneNumber: phoneNumber,
    address: address,
  };
  return profileData;
};

export const ProfileService = {
  getUserProfile,
  updateUserProfile,
};
