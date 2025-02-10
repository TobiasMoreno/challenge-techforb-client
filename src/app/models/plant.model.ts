import { ResponseSensor } from './sensor.model';

export interface ResponsePlant {
  id: string;
  country: string;
  name: string;
  country: string;
  ownerEmail: string;
  sensors: ResponseSensor[];
}

export interface RequestPlant {
  name: string;
  country: string;
}

export interface ResponseCountPlant{
  id: string;
  country: string;
  name: string;
  readingsOk: number;
  mediumAlerts: number;
  redAlerts: number;
  sensors: ResponseSensor[];
}