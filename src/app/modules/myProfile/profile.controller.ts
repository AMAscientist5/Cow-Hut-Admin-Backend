import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ProfileService } from './profile.service';
import { IUser } from '../user/user.interface';

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  const result = await ProfileService.getUserProfile(userId);

  sendResponse<Partial<IUser>>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User's information retrieved successfully",
    data: result,
  });
});

const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
  const updatedData = req.body;
  const user = req.user;

  const result = await ProfileService.updateUserProfile(user?._id, updatedData);

  sendResponse<Partial<IUser>>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User's information retrieved successfully",
    data: result,
  });
});

export const profileController = {
  getUserProfile,
  updateUserProfile,
};
