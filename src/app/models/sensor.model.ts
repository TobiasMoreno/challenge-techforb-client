import { ResponsePlant } from "./plant.model";
import { ResponseReading } from "./reading.model";

export interface ResponseSensor {
    id: string;
    type: string;
    isAvailable: boolean;
    plant: ResponsePlant;
    readings: ResponseReading[];
}