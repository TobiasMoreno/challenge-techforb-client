import { ResponseReading } from "./reading.model";

export interface ResponseAlert {
    id: string;
    alertType: AlertType;
    message: string;
    reading: ResponseReading;
}

export interface RequestAlert {
    alertType: AlertType;
    message: string;
    readingId: string;
}


enum AlertType {
    ALERTA_MEDIA = 'ALERTA_MEDIA',
    ALERTA_ROJA = 'ALERTA_ROJA',
    OK = 'OK'
}