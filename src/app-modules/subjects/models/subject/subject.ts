import { Document } from 'mongoose';

export class Subject extends Document {
  sclassId: string;

  tutorId: string;

  subjectName: string;

  timestamp: { createdAt: number; updatedAt: number };
}
