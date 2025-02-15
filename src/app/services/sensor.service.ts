import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../shared/data-access/base-http.service';
import { Observable } from 'rxjs';
import { ResponseSensorStats } from '../models/sensor.model';

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
}