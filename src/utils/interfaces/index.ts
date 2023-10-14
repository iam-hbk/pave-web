export interface QRCodeOrigin {
  lat: number;
  long: number;
}
export interface Lecturer {
  _id: string;
  name: string;
}
export interface CreateClassSession {
  qrCodeOrigin: QRCodeOrigin;
  _id: string;
  module: ModuleInfo;
  classStartTime: Date;
  classEndTime: Date;
}

export interface ModuleInfo {
  _id: string;
  moduleName: string;
  moduleCode: string;
  lecturer: Lecturer;
}

export interface ClassSessionInfo {
  qrCodeOrigin: QRCodeOrigin;
  _id: string;
  module: ModuleInfo;
  classStartTime: string;
  classEndTime: string;
  isActive: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export type GeneratedQuestion = {
  questionText: string;
  options: string[];
  correctAnswer: number;
};
export interface IQuiz {
  _id?: string; // An optional _id field, as it's typically provided by MongoDB once a document is saved
  module: string; // ObjectId represented as a string
  questions: GeneratedQuestion[];
  title: string;
  isActive: boolean;
  expiresAt: Date;
  createdAt?: Date; // Marking some of these as optional since they may be set by the backend by default
  updatedAt?: Date;
}
