import { RequestAlert, ResponseAlert } from "./alert.model";

export interface ResponseReading {
  id: string;
  readingValue: number;
  timestamp: string;
  sensor: string;
  alerts: ResponseAlert[];
}

export interface RequestReading {
  readingValue: number;
  timestamp: string;
  sensor: string;
  alerts: RequestAlert[];
}
