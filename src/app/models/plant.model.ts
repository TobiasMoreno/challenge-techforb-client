import { ResponseSensor } from './sensor.model';

export interface ResponsePlant {
  id: string;
  name: string;
  country: string;
  ownerEmail: string;
  sensors: ResponseSensor[];
}

export interface RequestPlant {
  name: string;
  country: string;
}

export interface ResponseCountPlant {
  id: string;
  country: string;
  name: string;
  readingsOk: string;
  mediumAlerts: string;
  redAlerts: string;
}
