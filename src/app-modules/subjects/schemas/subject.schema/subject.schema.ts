import { Schema } from 'mongoose';

export const SubjectSchema = new Schema({
  __v: { type: Number, select: false },

  subjectName: {
    type: String,
    required: [true, 'MISSING_FIELD__subjectName'],
  },

  sclassId: {
    type: Schema.Types.ObjectId,
    required: [true, 'MISSING_FIELD__sclassId'],
    ref: 'Sclasses',
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
