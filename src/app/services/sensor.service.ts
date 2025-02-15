import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../shared/data-access/base-http.service';
import { Observable } from 'rxjs';
import { ResponseSensor, ResponseSensorStats } from '../models/sensor.model';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  baseService = inject(BaseHttpService);

  getSensorStatsByPlantId(plantId: string): Observable<ResponseSensorStats[]> {
    return this.baseService.http.get<ResponseSensorStats[]>(
      `${this.baseService.API_URL}/sensors/${plantId}/stats`
    )
  }
  getDisabledSensors(): Observable<ResponseSensor[]>{
    return this.baseService.http.get<ResponseSensor[]>(
      `${this.baseService.API_URL}/sensors/disabled`
    )
  }
}