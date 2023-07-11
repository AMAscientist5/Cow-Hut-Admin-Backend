import { Schema, model } from 'mongoose';
import { IOrder } from './order.interface';

export const orderSchema: Schema = new Schema<IOrder>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      ref: 'cow',
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'buyer',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model<IOrder>('Order', orderSchema);

export default Order;
