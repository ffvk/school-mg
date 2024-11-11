import { Schema } from 'mongoose';

export const FileSchema = new Schema({
  url: {
    type: String,
    // required: [true, 'MISSING_FIELD__url'],
    validate: {
      validator: function (val: any) {
        return /^(?:(?:https?|ftp):\/\/)?(?:www\.)?([^\s.]+\.[^\s]{2,}|localhost)(?:\/[^\s]*)?$/i.test(
          val,
        );
      },
      message: 'INVALID_FIELD__url',
    },
  },

  size: {
    type: Number,
    select: false,
    min: 0,
  },

  type: {
    type: String,
  },
});
