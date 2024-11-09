import { Schema } from 'mongoose';
import { PasswordSchema } from '../password.schema/password.schema';
import { EmailSchema } from '../email.schema/email.schema';
import { UserRoleEnum } from 'src/constants/enum';

export const UserSchema = new Schema({
  __v: { type: Number, select: false },

  name: {
    type: String,
    required: [true, 'MISSING_FIELD__name'],
  },

  email: {
    type: EmailSchema,
    required: [true, 'MISSING_FIELD__email'],
  },

  password: {
    type: PasswordSchema,
    required: [true, 'MISSING_FIELD__password'],
  },

  role: {
    type: String,
    enum: {
      values: Object.keys(UserRoleEnum),
      message: 'INVALID_FIELD__roles',
    },
    required: [true, 'MISSING_FIELD__role'],
  },

  timestamp: {
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now },
  },
});
