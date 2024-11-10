import { Schema } from 'mongoose';
import { FileSchema } from 'src/shared/schemas/file.schema/file.schema';

export const HomeworkSchema = new Schema({
  __v: { type: Number, select: false },

  title: {
    type: String,
    required: [true, 'MISSING_FIELD_title'],
  },

  description: {
    type: String,
  },

  file: {
    type: FileSchema,
  },

  tutorId: {
    type: Schema.Types.ObjectId,
    required: [true, 'MISSING_FIELD_creatorId'],
  },

  sclassId: {
    type: Schema.Types.ObjectId,
    required: [true, 'MISSING_FIELD_sclassId'],
  },

  subjectId: {
    type: Schema.Types.ObjectId,
    required: [true, 'MISSING_FIELD_subjectId'],
  },

  timestamp: {
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now },
  },
});
