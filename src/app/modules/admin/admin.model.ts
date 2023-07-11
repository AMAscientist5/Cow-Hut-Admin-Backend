import { AdminModel } from './admin.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';
import { Schema, model } from 'mongoose';
import { IAdmin } from './admin.interface';

const AdminSchema = new Schema<IAdmin, AdminModel>({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['admin'],
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  // needsPasswordChange: {
  //   type: Boolean,
  //   default: true,
  // },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  address: {
    type: String,
    required: true,
  },
});

AdminSchema.statics.isUserExist = async function (
  phoneNumber: string
): Promise<Pick<IAdmin, 'phoneNumber' | 'password' | 'role' | '_id'> | null> {
  return await Admin.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1, needsPasswordChange: 1 }
  );
};

AdminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// User.create() / user.save()
AdminSchema.pre('save', async function (next) {
  // hashing user password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const admin = this;
  admin.password = await bcrypt.hash(
    admin.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
