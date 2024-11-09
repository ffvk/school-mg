import { Schema } from 'mongoose';

export const OrderSchema = new Schema({
  __v: { type: Number, select: false },

  name: {
    type: String,
    required: [true, 'MISSING_FIELD__name'],
  },

  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'MISSING_FIELD__userId'],
  },

  productId: {
    type: Schema.Types.ObjectId,
    required: [true, 'MISSING_FIELD__productId'],
  },

  timestamp: {
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now },
  },
});
