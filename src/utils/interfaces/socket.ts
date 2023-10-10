// Base Change Event
export interface BaseChangeEvent {
  txnNumber: number;
  lsid: {
    id: string;
    uid: string;
  };
  _id: {
    _data: string;
  };
  operationType: string;
  clusterTime: {
    $timestamp: string;
  };
  wallTime: string;
  ns: {
    db: string;
    coll: string;
  };
  documentKey: {
    _id: string;
  };
}

// Insert Event
export interface InsertChangeEvent extends BaseChangeEvent {
  operationType: "insert";
  fullDocument: FullDocument;
  isNew: boolean;
  id: string;
}

// Update Event
export interface UpdateChangeEvent extends BaseChangeEvent {
  operationType: "update";
  updateDescription: {
    updatedFields: Record<string, any>;
    removedFields: string[];
  };
  wasUpdated: boolean;
  id: string;
}

// Delete Event
export interface DeleteChangeEvent extends BaseChangeEvent {
  operationType: "delete";
}

// Full Document
export interface FullDocument {
  _id: string;
  module: string;
  qrCodeOrigin: QRCodeOrigin;
  classStartTime: string;
  classEndTime: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// QR Code Origin
export interface QRCodeOrigin {
  lat: number;
  long: number;
}

// Type Guards
export function isInsertChangeEvent(event: any): event is InsertChangeEvent {
  return event.operationType === "insert";
}

export function isUpdateChangeEvent(event: any): event is UpdateChangeEvent {
  return event.operationType === "update";
}

export function isDeleteChangeEvent(event: any): event is DeleteChangeEvent {
  return event.operationType === "delete";
}

// Usage
export const handleChangeEvent = (event: BaseChangeEvent) => {
  if (isInsertChangeEvent(event)) {
    // Handle insert event
  } else if (isUpdateChangeEvent(event)) {
    // Handle update event
  } else if (isDeleteChangeEvent(event)) {
    // Handle delete event
  }
};
