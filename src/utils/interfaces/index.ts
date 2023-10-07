export interface QRCodeOrigin {
  lat: number;
  long: number;
}
export interface CreateClassSession {
  moduleId: string;
  coords: QRCodeOrigin;
  startDateTime: Date;
  endDateTime: Date;
}

export interface ModuleInfo {
  _id: string;
  moduleName: string;
  moduleCode: string;
}

export interface ClassSessionInfo {
  qrCodeOrigin: QRCodeOrigin;
  _id: string;
  module: ModuleInfo;
  classStartTime: string;
  classEndTime: string;
  isActive: boolean;
  __v: number;
}
