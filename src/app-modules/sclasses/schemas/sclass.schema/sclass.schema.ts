import { Schema } from 'mongoose';

export const SclassSchema = new Schema({
  __v: { type: Number, select: false },

  className: {
    type: String,
    required: [true, 'MISSING_FIELD__className'],
  },
  tutorId: {
    type: Schema.Types.ObjectId,
    required: [true, 'MISSING_FIELD__tutorId'],
    ref: 'Users',
  },

  studentId: {
    type: Schema.Types.ObjectId,
    required: [true, 'MISSING_FIELD__studentId'],
    ref: 'Users',
  },

  timestamp: {
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now },
  },
});
