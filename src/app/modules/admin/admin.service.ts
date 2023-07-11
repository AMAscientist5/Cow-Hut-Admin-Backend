import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const createAdmin = async (data: IAdmin): Promise<Partial<IAdmin> | null> => {
  const createdAdmin = await Admin.create(data);

  if (!createdAdmin) {
    throw new ApiError(httpStatus.EXPECTATION_FAILED, 'failed to create Admin');
  }

  const plainObject = createdAdmin.toObject();
  const { password, ...adminData } = plainObject;
  console.log(password);

  return adminData;
};

export const AdminService = {
  createAdmin,
};
