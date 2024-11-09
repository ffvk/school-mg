import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  __v: { type: Number, select: false },

  name: {
    type: String,
    required: [true, 'MISSING_FIELD__name'],
  },

  description: {
    type: String,
  },

  price: {
    type: Number,
    required: [true, 'MISSING_FIELD__price'],
  },

  timestamp: {
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now },
  },
});
