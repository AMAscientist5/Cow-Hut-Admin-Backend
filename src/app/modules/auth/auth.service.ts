import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
// import { UserExistService } from '../../../helpers/isUserExistHelpers';
// import { User } from '../user/user.model';
import { Admin } from '../admin/admin.model';
import { User } from '../user/user.model';

const loginAdmin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;

  // const isUserExist = await UserExistService.isUserExist(phoneNumber);
  // const isUserExist = await Admin.findOne({ phoneNumber });
  const isUserExist = await Admin.isUserExist(phoneNumber);
  console.log(isUserExist, 'hi');

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');
  }

  if (
    isUserExist.password &&
    !(await Admin.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  // if (
  //   (isUserExist.password &&
  //     !(await User.isPasswordMatched(password, isUserExist.password))) ||
  //   !(await Admin.isPasswordMatched(password, isUserExist.password))
  // ) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  // }

  //create access token & refresh token

  // console.log(isUserExist._id.toString());
  const { _id, role } = isUserExist;
  console.log(_id);

  const accessToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    // needsPasswordChange,
  };
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;

  const isUserExist = await User.isUserExist(phoneNumber);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { _id, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    // needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous

  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { _id } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  // const isUserExist = await User.isUserExist(role);
  const isUserExist = await User.findById(_id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      _id: isUserExist?._id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginAdmin,
  loginUser,
  refreshToken,
};
