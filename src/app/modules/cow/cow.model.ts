import mongoose, { Schema, model } from 'mongoose';
import { ICow } from './cow.interface';
import {
  ICattleBreeds,
  ICities,
  ICowCategory,
  ICowLebel,
} from './cow.constant';

export const cowSchema: Schema = new Schema<ICow>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: {
      type: String,
      enum: ICities,
      required: true,
    },
    breed: {
      type: String,
      enum: ICattleBreeds,
      required: true,
    },
    weight: { type: Number, required: true },
    label: {
      type: String,
      enum: ICowLebel,
      required: true,
    },
    category: {
      type: String,
      enum: ICowCategory,
      required: true,
    },
    // seller: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'seller',
    //   required: true,
    // },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'seller',
    },
  },
  {
    timestamps: true,
  }
);

const Cow = model<ICow>('Cow', cowSchema);

export default Cow;
