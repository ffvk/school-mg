import { Document } from 'mongoose';

export class Sclass extends Document {
  tutorId: string;

  studentId: string;

  className: string;

  timestamp: { createdAt: number; updatedAt: number };
}
