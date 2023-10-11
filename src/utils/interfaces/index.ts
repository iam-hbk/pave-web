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
export interface Quiz {
  _id: string;
  module: string;
  questions: GeneratedQuestion[];
  title: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
