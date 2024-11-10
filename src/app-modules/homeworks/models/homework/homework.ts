import { File } from 'src/shared/models/file/file';

export class Homework extends Document {
  title: string;

  description?: string;

  file?: File;

  creatorId: string;

  sclassId: string;

  subjectId: string;

  timestamp: { createdAt: number; updatedAt: number };
}
