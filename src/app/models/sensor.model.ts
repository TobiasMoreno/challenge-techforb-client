import { ResponseReading } from './reading.model';

export interface ResponseSensor {
  id: string;
  type: string;
  isAvailable: boolean;
  readings: ResponseReading[];
}

export interface ResponseSensorStats {
  id: string;
  sensorType: string;
  readingsOk: number;
  mediumAlerts: number;
  redAlerts: number;
}
