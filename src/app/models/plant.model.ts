import { ResponseSensor } from "./sensor.model";

export interface ResponsePlant {
  id: string;
  name: string;
  ownerEmail: string;
  sensors: ResponseSensor[];
}

export interface RequestPlant {
  name: string;
}
