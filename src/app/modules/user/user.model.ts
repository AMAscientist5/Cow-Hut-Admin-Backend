import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';
// import { IUser } from './user.interface';

export const UserSchema = new Schema<IUser, UserModel>(
  // export const UserSchema = new Schema<IUser>(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const SellerSchema = new Schema<IUser, UserModel>(
  // export const UserSchema = new Schema<IUser>(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.isUserExist = async function (
  phoneNumber: string
  // _id?: string
): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role' | '_id'> | null> {
  return await User.findOne(
    // { $or: [{ phoneNumber }, { _id }] },
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1, _id: 1 }
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// User.create() / user.save()
UserSchema.pre('save', async function (next) {
  // hashing user password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
export const Seller = model<IUser, UserModel>('Seller', SellerSchema);

// export const User = model<IUser>('User', UserSchema);
