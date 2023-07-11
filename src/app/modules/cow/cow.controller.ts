import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ICow } from './cow.interface';
import { CowService } from './cow.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constant.ts/pagination';
import { cowFilterableFields } from './cow.constant';

const createCow = catchAsync(async (req: Request, res: Response) => {
  // console.log('testing getting api create cow');
  const cow = req.body;
  const result = await CowService.createCow(cow);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow created successfully!',
    data: result,
  });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CowService.getSingleCow(id);

  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow retrieved successfully',
    data: result,
  });
});

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await CowService.getAllCows(filters, paginationOptions);

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cows retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
  // console.log('tessing');
  const id = req.params.id;
  const updatedData = req.body;

  const result = await CowService.updateCow(id, updatedData);
  // console.log(result);
  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow updated successfully',
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CowService.deleteCow(id);

  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow deleted successfully',
    data: result,
  });
});

export const cowController = {
  createCow,
  getSingleCow,
  getAllCows,
  updateCow,
  deleteCow,
};
