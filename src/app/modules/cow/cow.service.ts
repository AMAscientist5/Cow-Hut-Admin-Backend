import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICow, ICowFilters } from './cow.interface';
import Cow from './cow.model';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import { cowSearchableFields } from './cow.constant';

const createCow = (userData: ICow): Promise<ICow | null> => {
  const createdUser = Cow.create(userData);

  if (!createdUser) {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'failed to create User first'
    );
  }

  return createdUser;
};

const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters;
  console.log(searchTerm);
  console.log(filtersData);

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Cow.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findOne({ _id: id });

  return result;
};

const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteCow = async (id: string): Promise<ICow | null> => {
  const isExist = await Cow.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found!');
  }

  const cow = await Cow.findOneAndDelete({ _id: id });

  if (!cow) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to delete cow');
  }

  return cow;
};
export const CowService = {
  createCow,
  getSingleCow,
  getAllCows,
  updateCow,
  deleteCow,
};
